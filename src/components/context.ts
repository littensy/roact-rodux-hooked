import { Action, AnyAction } from "@rbxts/rodux";
import Roact from "@rbxts/roact";
import type { RoactContext } from "../types";
import type { Store } from "@rbxts/rodux";

export interface RoactRoduxContextValue<A extends Action = AnyAction> {
	/**
	 * The single Rodux store in your application.
	 */
	store: Store<any, A>;
}

export type RoactRoduxContext<A extends Action = AnyAction> = RoactContext<RoactRoduxContextValue<A>>;

export const RoactRoduxContext: RoactRoduxContext = Roact.createContext<RoactRoduxContextValue>(undefined!);
