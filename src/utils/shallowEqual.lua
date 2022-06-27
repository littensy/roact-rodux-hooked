local function shallowEqual(left, right)
	if left == right then
		return true
	end

	if type(left) ~= "table" or type(right) ~= "table" then
		return false
	end

	if #left ~= #right then
		return false
	end

	for key, value in pairs(left) do
		if right[key] ~= value then
			return false
		end
	end

	return true
end

return shallowEqual
