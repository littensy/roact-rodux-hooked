import type Roact from "@rbxts/roact";
import type Rodux from "@rbxts/rodux";

/**
 * The Context that provides the store.
 */
export declare const RoactRoduxContext: RoactContext<Rodux.Store<any>>;

/**
 * A Function Component that provides the store.
 */
export declare const StoreProvider: Roact.FunctionComponent<{ store: Rodux.Store<any> }>;

/**
 * A hook to access the Rodux Store's `dispatch` method.
 *
 * @returns Rodux store's `dispatch` method
 *
 * @example
 * function CounterComponent() {
 *   const dispatch = useDispatch<RootStore>();
 *   return (
 *     <textlabel
 *       Text={"Increase counter"}
 *       Event={{
 *         Activated: () => dispatch({ type: "increase-counter" }),
 *       }}
 *     />
 *   );
 * }
 */
export declare function useDispatch<A extends Rodux.Action = Rodux.AnyAction>(): Rodux.Dispatch<A>;
export declare function useDispatch<S extends Rodux.Store<any>>(): Rodux.Dispatch<InferStoreAction<S>>;
export declare function useDispatch<Dispatch = Rodux.Dispatch<any>>(): Dispatch;

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
 * function CounterComponent() {
 *   const count = useSelector((state: RootState) => state.counter);
 *   return <textlabel Text={`Counter: ${count}`} />;
 * }
 */
export declare function useSelector<State = {}, Selected = unknown>(
	selector: (state: State) => Selected,
	isEqual?: (selectedState: Selected | undefined, oldSelectedState: Selected | undefined) => boolean,
): Selected;

/**
 * A hook to access the Rodux Store.
 *
 * @returns The Rodux store
 *
 * @example
 * function CounterComponent() {
 *   const store = useStore<RootStore>();
 *   return <textlabel Text={store.getState()} />;
 * }
 */
export declare function useStore<S extends Rodux.Store<any>>(): S;
export declare function useStore<S, A extends Rodux.Action = Rodux.AnyAction>(): Rodux.Store<S, A>;

/**
 * This interface allows you to easily create a hook that is properly typed for your store's root state.
 *
 * @example
 * const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 */
export interface TypedUseSelectorHook<State> {
	<Selected>(
		selector: (state: State) => Selected,
		equalityFn?: (selectedState: Selected | undefined, oldSelectedState: Selected | undefined) => boolean,
	): Selected;
}

export interface RoactContext<T> {
	Provider: Roact.ComponentConstructor<{
		value: T;
	}>;
	Consumer: Roact.ComponentConstructor<{
		render: (value: T) => Roact.Element | undefined;
	}>;
}

export type InferStoreState<T> = T extends Rodux.Store<infer S> ? S : never;

export type InferStoreAction<T> = T extends Rodux.Store<any, infer A> ? A : never;
