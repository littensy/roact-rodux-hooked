if script:FindFirstAncestor("node_modules") then
	return require(script:FindFirstAncestor("node_modules")["roact-hooked"].src)
elseif script.Parent.Parent.Parent:FindFirstChild("roact-hooked") then
	return require(script.Parent.Parent.Parent["roact-hooked"])
else
	error("Could not find @rbxts/roact-hooked in the parent hierarchy.")
end
