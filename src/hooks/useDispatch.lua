local Hooks = require(script.Parent.Parent.RoactHooked)
local useStore = require(script.Parent.useStore)

local function useDispatch()
	local store = useStore()

	local dispatch = Hooks.useCallback(function(action)
		store:dispatch(action)
	end, { store })

	return dispatch
end

return useDispatch
