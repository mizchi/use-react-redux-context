# use-react-redux-context

Alternative `ReactRedux.connect()` by `useContext()` for performance.

```bash
# peer deps
$ yarn add react react-dom redux react-redux
$ yarn add use-react-redux-context
# or npm install --save use-react-redux-context
yarn add @types/react @types/redux @types/react-redux -D # for typescript
```

## Concept

- Pre-defined connected React.Context with mapState (no own props)
- Create bound actions by useCallback
- Emit render by shallow equal comparation
- TypeScript friendly

## Why not `useContext(ReactReduxContext)` of `react-redux@6`

Just `React.useContext(ReactReduxContext)` emits rendering by all state update. Pre-defined contexts and reducers are good for performance.

And I don't know good `ownProps` usages on `ReactRedux.connect`.

## How to use

Minimum conceptual code

```tsx
import { Provider as ContextProvider, Scope } from "use-react-redux-context";
import { Provider as ReactReduxProvider } from "react-redux";

const scope = new Scope();
const RootStateContext = scope.createContext(s => s);
const All = () => {
  const all = useContext(RootStateContext);
  return <pre>{JSON.stringify(all)}</pre>;
};

const store = createStore(reducer); // create your reducer
const el = (
  <ReactReduxProvider store={store}>
    <ContextProvider scope={scope}>
      <All />
    </ContextProvider>
  </ReactReduxProvider>
);
```

Working code

```tsx
import React, { useContext, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, Reducer } from "redux";
import { Provider as ReactReduxProvider } from "react-redux";
import { Provider as ContextProvider, Scope } from "use-react-redux-context";

// Write your own reducer

type Foo = {
  value: number;
};

type RootState = {
  foo: Foo;
};

type IncrementAction = { type: "increment" };
type Action = IncrementAction;

function foo(state: Foo = { value: 0 }, action: Action): Foo {
  switch (action.type) {
    case "increment": {
      return { value: state.value + 1 };
    }
    default: {
      return state;
    }
  }
}

function increment(): IncrementAction {
  return { type: "increment" };
}

// Build connected React.Context

const scope = new Scope<RootState>(); // scope expand all contexts
const FooContext = scope.createContext((state, dispatch) => {
  // this useCallback is under NewContext rendering hook context
  const inc = useCallback(() => dispatch(increment()), []);
  // emit render by shallow equal comparation
  return { ...state.foo, inc };
});

function Counter() {
  // This is React.useContext, not library function
  const foo = useContext(FooContext);
  return (
    <div>
      value: {foo.value}
      <button onClick={foo.inc}>+1</button>
    </div>
  );
}

const rootReducer: Reducer<RootState> = combineReducers({ foo });
const store = createStore(rootReducer);

function App() {
  return (
    // Provider expand all scope's context
    <ReactReduxProvider store={store}>
      <ContextProvider scope={scope}>
        <Counter />
      </ContextProvider>
    </ReactReduxProvider>
  );
}

// @ts-ignore
ReactDOM.render(<App />, document.querySelector(".root") as HTMLDivElement);
```

## API

### `useDispatch`

Get `store.dispatch` Function

```tsx
import { useDispatch } from "use-react-redux-context";
function X() {
  const dispatch = useDispatch();
  return (
    <button onClick={() => disptach({ type: "my-action" })}>my action</button>
  );
}
```

### `useBindAction`, `useBindActions`

Create function by action and actionMap (with `useCallback` and its `memoizedKeys`)

```tsx
import { useBindAction, useBindActions } from "use-react-redux-context";

const A = scope.createContext(state => {
  const inc = useBindAction(increment, []);
  return { ...state.a, inc };
});

const B = scope.createContext(_state => {
  const actions = useBindActions({ increment, decrement });
  // alternative: with memoized keys map
  // const actions = useBindActions({ increment, decrement }, { increment: [state.value] });

  // recommend spreading for shallow equal
  return { ...actions };
});
```

## How to dev

- `yarn build`: Build `index.js`
- `yarn test`: Run jest
- `yarn demo`: Start application server on `http://localhost:1234`
- `yarn demo:deploy`: Deploy to netlify (need netlify account)

## TODO

- Remove all mapped state after unmount

## LICENSE

MIT
