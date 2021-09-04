import { RoactRoduxContext } from "./context";
import { hooked, useMemo } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";
import type { Action, AnyAction, Store } from "@rbxts/rodux";

export interface ProviderProps<A extends Action = AnyAction> {
	/**
	 * The single Rodux store in your application.
	 */
	store: Store<any, A>;
}

/**
 * Makes the Rodux store available to the `useStore()` calls in the component hierarchy below.
 */
export const Provider = hooked<ProviderProps>(({ store, [Roact.Children]: children }) => {
	const contextValue = useMemo(() => ({ store }), [store]);

	return <RoactRoduxContext.Provider value={contextValue}>{children}</RoactRoduxContext.Provider>;
});
