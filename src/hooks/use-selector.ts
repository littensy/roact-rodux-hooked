import { useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { useStore } from "./use-store";
import type Rodux from "@rbxts/rodux";

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
		equalityFn?: (selectedState: Selected, oldSelectedState: Selected) => boolean,
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
	equalityFn: (selectedState: Selected, oldSelectedState: Selected) => boolean = (a: Selected, b: Selected) =>
		a === b,
): Selected {
	const store = useStore<Rodux.Store<State>>();
	const [selectedState, setSelectedState] = useState<Selected>(() => selector(store.getState()));

	const latestSelectedState = useMutable<Selected>(selectedState);
	useEffect(() => {
		latestSelectedState.current = selectedState;
	});

	useEffect(() => {
		const signal = store.changed.connect((newState) => {
			const oldSelectedState = latestSelectedState.current;
			const newSelectedState = selector(newState);

			if (oldSelectedState === undefined || !equalityFn(newSelectedState, oldSelectedState)) {
				setSelectedState(newSelectedState);
			}
		});
		return () => signal.disconnect();
	}, []);

	return selectedState;
}
