import type Roact from "@rbxts/roact";
import type Rodux from "@rbxts/rodux";

/**
 * A Roact Context
 */
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
