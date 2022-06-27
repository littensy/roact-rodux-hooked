# [@rbxts/roact-rodux-hooked](https://www.npmjs.com/package/@rbxts/roact-rodux-hooked)

Useful hooks for Rodux with [roact-hooked](https://www.npmjs.com/package/@rbxts/roact-hooked)

⚙️ This library only exists for use with roact-hooked

🔌 Compatible with [roselect](https://www.npmjs.com/package/@rbxts/roselect)

📚 Based on [@types/react-redux](https://www.npmjs.com/package/@types/react-redux)

## Usage

```tsx
import Roact from "@rbxts/roact";
import { useDispatch, useSelector } from "@rbxts/roact-rodux-hooked";
import { withHooks } from "@rbxts/roact-hooked";
import { Store, StoreState, increment } from "client/store";

function Counter() {
	const count = useSelector((state: StoreState) => state.count);
	const dispatch = useDispatch<Store>();

	return (
		<textbutton
			Text={`Counter: ${count}`}
			BackgroundColor3={Color3.fromRGB(80, 120, 200)}
			Size={new UDim2(0.5, 0, 1, 0)}
			Event={{
				Activated: () => dispatch(increment()),
			}}
		/>
	);
}

export default withHooks(Counter);
```

```tsx
import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "./store";

export default function App() {
	return <StoreProvider store={configureStore()}>...</StoreProvider>;
}
```

```ts
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "@rbxts/roact-rodux-hooked";
import { RootDispatch, RootState, RootStore } from "./store";

export const useRootStore = useStore as () => RootStore;
export const useRootDispatch = useDispatch as () => RootDispatch;
export const useRootSelector = useSelector as TypedUseSelectorHook<RootState>;
```
