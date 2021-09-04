function objectKeys<T extends object>(obj: T): LuaTuple<[keys: Array<keyof T>, count: number]> {
	const keys = new Array<keyof T>();
	let count = 0;
	for (const [key] of pairs(obj)) {
		keys.push(key as never);
		count++;
	}
	return [keys, count] as LuaTuple<[Array<keyof T>, number]>;
}

/**
 * Compares two arbitrary values for shallow equality. Object values are compared based on their keys, i.e. they must
 * have the same keys and for each key the value must be equal according to the `Object.is()` algorithm. Non-object
 * values are also compared with the same algorithm as `Object.is()`.
 */
export function shallowEqual<T>(left: T, right: unknown): boolean {
	if (left === right) return true;

	if (!typeIs(left, "table") || !typeIs(right, "table")) return false;

	const [keysLeft, keysLeftSize] = objectKeys(left);
	const [keysRight, keysRightSize] = objectKeys(right);

	if (keysLeftSize !== keysRightSize) return false;

	for (let i = 0; i < keysLeftSize; i++) {
		if (left[keysLeft[i]] !== right[keysRight[i]]) {
			return false;
		}
	}

	return true;
}
