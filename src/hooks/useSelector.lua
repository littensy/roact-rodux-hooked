-- https://github.com/reduxjs/react-redux/blob/7.x/src/hooks/useSelector.js

local Hooks = require(script.Parent.Parent.RoactHooked)
local useStore = require(script.Parent.useStore)

local function refEquality(a, b)
	return a == b
end

local function useSelector(selector, isEqual)
	if isEqual == nil then
		isEqual = refEquality
	end

	local _, forceRender = Hooks.useReducer(function(n)
		return n + 1
	end, 0)

	local store = useStore()

	local latestSubscriptionCallbackError = Hooks.useMutable()
	local latestSelector = Hooks.useMutable()
	local latestStoreState = Hooks.useMutable()
	local latestSelectedState = Hooks.useMutable()

	local storeState = store:getState()
	local selectedState

	local success, err = pcall(function()
		if 
			selector ~= latestSelector.current or
			storeState ~= latestStoreState.current or
			latestSubscriptionCallbackError.current
		then
			local newSelectedState = selector(storeState)

			-- ensure latest selected state is reused so that a custom equality
			-- function can result in identical references
			if
				latestSelectedState.current == nil or
				not isEqual(newSelectedState, latestSelectedState.current)
			then
				selectedState = newSelectedState
			else
				selectedState = latestSelectedState.current
			end
		else
			selectedState = latestSelectedState.current
		end
	end)

	if not success then
		if latestSubscriptionCallbackError.current then
			err ..= (
				"\nThe error may be correlated with this previous error:\n" ..
				latestSubscriptionCallbackError.current ..
				"\n\n"
			)

			error(err)
		end
	end

	Hooks.useEffect(function()
		latestSelector.current = selector
		latestStoreState.current = storeState
		latestSelectedState.current = selectedState
		latestSubscriptionCallbackError.current = nil
	end)

	Hooks.useEffect(function()
		local function checkForUpdates(newStoreState)
			local success, err = pcall(function()
				-- Avoid calling selector multiple times if the store's state has not changed
				if newStoreState == latestStoreState.current then
					return
				end

				local newSelectedState = latestSelector.current(newStoreState)

				if isEqual(newSelectedState, latestSelectedState.current) then
					return
				end

				latestSelectedState.current = newSelectedState
				latestStoreState.current = newStoreState
			end)

			if not success then
				-- we ignore all errors here, since when the component
				-- is re-rendered, the selectors are called again, and
				-- will throw again, if neither props nor store state
				-- changed
				latestSubscriptionCallbackError.current = err
			end

			forceRender()
		end

		local subscription = store.changed:connect(checkForUpdates)

		checkForUpdates(storeState)

		return function()
			subscription:disconnect()
		end
	end, { store })

	return selectedState
end

return useSelector
