import Object from "@rbxts/object-utils";

/**
 * Compares two arbitrary values for shallow equality. Object values are compared based on their keys, i.e. they must
 * have the same keys and for each key the value must be equal.
 */
export function shallowEqual<T>(left: T, right: unknown): boolean {
	if (left === right) return true;

	if (!typeIs(left, "table") || !typeIs(right, "table")) return false;

	const keysLeft = Object.keys(left) as (keyof T)[];
	const keysRight = Object.keys(right) as (keyof typeof right)[];

	if (keysLeft.size() !== keysRight.size()) return false;

	return keysLeft.every((value, index) => value === right[index as never]);
}
