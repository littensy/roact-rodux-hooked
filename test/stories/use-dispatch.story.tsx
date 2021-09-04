import { Provider, useDispatch, useSelector } from "@rbxts/roact-rodux-hooked";
import { Store } from "@rbxts/rodux";
import { hooked } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };
type GlobalStore = typeof store;

function reducer(state: State = { count: 0 }, action: Action): State {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		case "decrement":
			return { count: state.count - 1 };
		default:
			return state;
	}
}

const store = new Store<State, Action>(reducer);

const Counter = hooked(() => {
	const count = useSelector((state: State) => state.count);
	const dispatch = useDispatch<GlobalStore>();

	return (
		<>
			<textbutton
				Text="Increment"
				BackgroundColor3={Color3.fromRGB(80, 120, 200)}
				Size={new UDim2(0.5, 0, 1, 0)}
				Event={{
					Activated: () => dispatch({ type: "increment" }),
				}}
			/>
			<textbutton
				Text="Decrement"
				BackgroundColor3={Color3.fromRGB(200, 80, 120)}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(0.5, 0, 1, 0)}
				Event={{
					Activated: () => dispatch({ type: "decrement" }),
				}}
			/>
			<textlabel
				Text={`Counter: ${count}`}
				TextSize={32}
				Size={new UDim2(0, 250, 0, 80)}
				Position={new UDim2(0.5, 0, 0.1, 0)}
				AnchorPoint={new Vector2(0.5, 0)}
			/>
		</>
	);
});

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={store}>
			<Counter />
		</Provider>,
		target,
		"Counter",
	);
	return () => Roact.unmount(handle);
};
