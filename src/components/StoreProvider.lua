local Roact = require(script.Parent.Parent.Roact)
local RoactRoduxContext = require(script.Parent.Context)

local function StoreProvider(props)
	return (
		Roact.createElement(RoactRoduxContext.Provider, {
			value = props.store,
		}, props[Roact.Children])
	)
end

return StoreProvider
