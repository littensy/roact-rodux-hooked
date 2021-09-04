import { Provider, useDispatch, useSelector } from "@rbxts/roact-rodux-hooked";
import { Store, createReducer } from "@rbxts/rodux";
import { createSelector } from "@rbxts/roselect";
import { hooked } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";

type Todo = { completed: boolean; id: number };
type TodosState = { todos: Array<Todo> };
type TodosAction = { type: "create" } | { type: "complete" } | { type: "remove"; id: number };
type TodosStore = Store<TodosState, TodosAction>;

let todoId = 0;

const reducer = createReducer<TodosState, TodosAction>(
	{ todos: [] },
	{
		create: ({ todos }) => ({
			todos: [...todos, { id: todoId++, completed: false }],
		}),
		complete: ({ todos }) => ({
			todos: todos.map(({ id }) => ({ id, completed: true })),
		}),
		remove: ({ todos }, { id }) => ({
			todos: todos.filter((todo) => todo.id !== id),
		}),
	},
);

const store: TodosStore = new Store<TodosState, TodosAction>(reducer);

const selectNumCompletedTodos = createSelector(
	(state: TodosState) => state.todos,
	(todos) => todos.filter((todo) => todo.completed).size(),
);

const selectNumTodos = createSelector(
	(state: TodosState) => state.todos,
	(todos) => todos.size(),
);

const selectLowestTodosId = createSelector(
	(state: TodosState) => state.todos,
	(todos) => todos.reduce((lowestId, { id }) => math.min(lowestId, id), math.huge),
);

const Counter = hooked(() => {
	const dispatch = useDispatch<TodosStore>();

	const numCompletedTodos = useSelector(selectNumCompletedTodos);
	const numTodos = useSelector(selectNumTodos);
	const lowestTodosId = useSelector(selectLowestTodosId);

	return (
		<>
			<textbutton
				Text="New Todo"
				BackgroundColor3={Color3.fromRGB(80, 120, 200)}
				Size={new UDim2(0.3333, 0, 1, 0)}
				Event={{
					Activated: () => dispatch({ type: "create" }),
				}}
			/>
			<textbutton
				Text="Mark As Complete"
				BackgroundColor3={Color3.fromRGB(80, 200, 120)}
				Position={new UDim2(0.3333, 0, 0, 0)}
				Size={new UDim2(0.3333, 0, 1, 0)}
				Event={{
					Activated: () => dispatch({ type: "complete" }),
				}}
			/>
			<textbutton
				Text="Remove Oldest"
				BackgroundColor3={Color3.fromRGB(200, 80, 120)}
				Position={new UDim2(0.6666, 0, 0, 0)}
				Size={new UDim2(0.3333, 0, 1, 0)}
				Event={{
					Activated: () => dispatch({ type: "remove", id: lowestTodosId }),
				}}
			/>
			<textlabel
				Text={`Completed: ${numCompletedTodos}\nTotal: ${numTodos}`}
				TextSize={32}
				Size={new UDim2(0, 350, 0, 120)}
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
