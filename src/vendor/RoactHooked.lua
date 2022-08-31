local modules = script:FindFirstAncestor("node_modules")

if modules:FindFirstChild("roact-hooked") then
	return require(modules["roact-hooked"].src)
elseif modules:FindFirstChild("@rbxts") then
	return require(modules["@rbxts"]["roact-hooked"].src)
elseif script.Parent.Parent.Parent:FindFirstChild("roact-hooked") then
	return require(script.Parent.Parent.Parent["roact-hooked"])
else
	error("Could not find @rbxts/roact-hooked in the parent hierarchy.")
end