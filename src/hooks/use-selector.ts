import { useEffect, useMutable, useReducer } from "@rbxts/roact-hooked";
import { useStore } from "./use-store";

/**
 * This interface allows you to easily create a hook that is properly typed for your store's root state.
 *
 * @example
 * interface RootState {
 *   property: string;
 * }
 *
 * const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 */
export interface TypedUseSelectorHook<State> {
	<Selected>(
		selector: (state: State) => Selected,
		equalityFn?: (selectedState: Selected | undefined, oldSelectedState: Selected | undefined) => boolean,
	): Selected;
}

/**
 * A hook to access the Rodux Store's state. This hook takes a selector function as an argument. The selector is called
 * with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter that allows you to customize the
 * way the selected state is compared to determine whether the component needs to be re-rendered.
 *
 * @param selector - The selector function
 * @param equalityFn - The function that will be used to determine equality
 *
 * @returns The selected portion of the state
 *
 * @example
 * import Roact from "@rbxts/roact";
 * import { hooked } from "@rbxts/roact-hooked";
 * import { useSelector } from "@rbxts/roact-rodux-hooked";
 * import type { RootState } from "./store";
 *
 * export const CounterComponent = hooked(() => {
 *   const count = useSelector((state: RootState) => state.counter);
 *   return <textlabel Text={`Counter: ${count}`} />;
 * });
 */
export function useSelector<State = {}, Selected = unknown>(
	selector: (state: State) => Selected,
	equalityFn: (selectedState: Selected | undefined, oldSelectedState: Selected | undefined) => boolean = (a, b) =>
		a === b,
): Selected {
	const [, forceRender] = useReducer((s: number) => s + 1, 0);
	const store = useStore<State>();

	const latestSubscriptionCallbackError = useMutable<string>();
	const latestSelector = useMutable<(state: State) => Selected>();
	const latestStoreState = useMutable<State>();
	const latestSelectedState = useMutable<Selected>();

	const storeState = store.getState();
	let selectedState: Selected | undefined;

	try {
		if (
			selector !== latestSelector.current ||
			storeState !== latestStoreState.current ||
			latestSubscriptionCallbackError.current
		) {
			const newSelectedState = selector(storeState);
			// ensure latest selected state is reused so that a custom equality function can result in identical references
			if (
				latestSelectedState.current === undefined ||
				!equalityFn(newSelectedState, latestSelectedState.current)
			) {
				selectedState = newSelectedState;
			} else {
				selectedState = latestSelectedState.current;
			}
		} else {
			selectedState = latestSelectedState.current;
		}
	} catch (err) {
		if (latestSubscriptionCallbackError.current !== undefined) {
			err += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current}\n\n`;
		}

		throw err;
	}

	useEffect(() => {
		latestSelector.current = selector;
		latestStoreState.current = storeState;
		latestSelectedState.current = selectedState;
		latestSubscriptionCallbackError.current = undefined;
	});

	useEffect(() => {
		function checkForUpdates(newStoreState: State) {
			try {
				// Avoid calling selector multiple times if the store's state has not changed
				if (newStoreState === latestStoreState.current) {
					return;
				}

				const newSelectedState = latestSelector.current!(newStoreState);

				if (equalityFn(newSelectedState, latestSelectedState.current)) {
					return;
				}

				latestSelectedState.current = newSelectedState;
				latestStoreState.current = newStoreState;
			} catch (err) {
				// we ignore all errors here, since when the component
				// is re-rendered, the selectors are called again, and
				// will throw again, if neither props nor store state
				// changed
				latestSubscriptionCallbackError.current = err as string;
			}

			forceRender();
		}

		const subscription = store.changed.connect(checkForUpdates);

		checkForUpdates(store.getState());

		return () => subscription.disconnect();
	}, [store]);

	return selectedState as Selected;
}
