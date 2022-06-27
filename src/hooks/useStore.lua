local Hooks = require(script.Parent.Parent.vendor.RoactHooked)
local RoactRoduxContext = require(script.Parent.Parent.components.Context)

local function useStore()
	return Hooks.useContext(RoactRoduxContext)
end

return useStore
