import { useMutable } from "@rbxts/roact-hooked";
import { useStore } from "./use-store";
import type { InferStoreAction } from "../types";
import type Rodux from "@rbxts/rodux";

/**
 * A hook to access the Rodux Store's `dispatch` method.
 *
 * @returns Rodux store's `dispatch` method
 *
 * @example
 * import Roact from "@rbxts/roact";
 * import { hooked } from "@rbxts/roact-hooked";
 * import { useDispatch } from "@rbxts/roact-rodux-hooked";
 * import type { RootStore } from "./store";
 *
 * export const CounterComponent = hooked(() => {
 *   const dispatch = useDispatch<RootStore>();
 *   return (
 *     <textlabel
 *       Text={"Increase counter"}
 *       Event={{
 *         Activated: () => dispatch({ type: "increase-counter" }),
 *       }}
 *     />
 *   );
 * });
 */
export function useDispatch<A extends Rodux.Action = Rodux.AnyAction>(): Rodux.Dispatch<A>;
export function useDispatch<S extends Rodux.Store<any>>(): Rodux.Dispatch<InferStoreAction<S>>;
export function useDispatch<Dispatch = Rodux.Dispatch<any>>(): Dispatch;
export function useDispatch() {
	const store = useStore();
	return useMutable((action: Rodux.AnyAction) => store.dispatch(action)).current;
}
