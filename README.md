# [@rbxts/roact-rodux-hooked](https://www.npmjs.com/package/@rbxts/roact-rodux-hooked)

Useful hooks for Rodux with [roact-hooked](https://www.npmjs.com/package/@rbxts/roact-hooked)

🔌 This library only exists for use with roact-hooked

⚡ Compatible with [roselect](https://www.npmjs.com/package/@rbxts/roselect)

📚 Types from [@types/react-redux](https://www.npmjs.com/package/@types/react-redux)

```
✋🏾 This is a work in progress!
```

## Usage

```tsx
import { useDispatch, useSelector } from "@rbxts/roact-rodux-hooked";
import { hooked } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";
import { Store, StoreState, increment } from "./store";

const Counter = hooked(() => {
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
});
```

```tsx
import Roact from "@rbxts/roact";
import { Provider, store } from "./store";

function App() {
  return (
    <Provider store={store}>
      ...
    </Provider>
  )
}
```
