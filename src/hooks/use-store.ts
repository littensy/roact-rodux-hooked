import { RoactRoduxContext } from "../components/context";
import { useContext } from "@rbxts/roact-hooked";
import type Rodux from "@rbxts/rodux";

/**
 * A hook to access the Rodux Store.
 *
 * @returns The Rodux store
 *
 * @example
 * import Roact from "@rbxts/roact";
 * import { hooked } from "@rbxts/roact-hooked";
 * import { useStore } from "@rbxts/roact-rodux-hooked";
 * import type { RootStore } from "./store";
 *
 * export const CounterComponent = hooked(() => {
 *   const store = useStore<RootStore>();
 *   return <textlabel Text={store.getState()} />;
 * });
 */
export function useStore<S extends Rodux.Store<any>>(): S;
export function useStore<S, A extends Rodux.Action = Rodux.AnyAction>(): Rodux.Store<S, A>;
export function useStore() {
	return useContext(RoactRoduxContext).store;
}
