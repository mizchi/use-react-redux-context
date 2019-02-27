import assert from "assert";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Provider as ReactReduxProvider } from "react-redux";
import { combineReducers, createStore, Reducer } from "redux";
import {
  Provider as ContextProvider,
  Scope,
  useBindAction,
  useBindActions
} from "../index";

// --- test counter
let fooReducerCallCount = 0;
let barReducerCallCount = 0;

let fooRenderCallCount = 0;
let barRenderCallCount = 0;
let bazRenderCallCount = 0;

// --- app

type Foo = {
  value: number;
};

type Bar = {
  mes: string;
};

export type RootState = {
  foo: Foo;
  bar: Bar;
};

const initialFoo: Foo = { value: 0 };

type IncrementAction = { type: "increment" };
type DecrementAction = { type: "decrement" };

type FooAction = IncrementAction | DecrementAction;
function foo(state: Foo = initialFoo, action: FooAction): Foo {
  fooReducerCallCount += 1;
  switch (action.type) {
    case "increment": {
      return { value: state.value + 1 };
    }
    case "decrement": {
      return { value: state.value - 1 };
    }
    default: {
      return state;
    }
  }
}

function increment(): IncrementAction {
  return { type: "increment" };
}

function decrement(): DecrementAction {
  return { type: "decrement" };
}

const initialBar: Bar = { mes: "hello" };
function bar(state: Bar = initialBar, action: any): Bar {
  barReducerCallCount += 1;
  switch (action.type) {
    default: {
      return state;
    }
  }
}

const scope = new Scope<RootState>();

const FooContext = scope.createContext(state => {
  return state.foo;
});

const BarContext = scope.createContext((state, dispatch) => {
  const inc = useBindAction(increment, []);
  return { ...state.bar, inc };
});

const BazContext = scope.createContext(_state => {
  const actions = useBindActions({ increment, decrement });
  // alternative: with memoized keys map
  // const actions = useBindActions({ increment, decrement }, { increment: [state.value] });
  return { ...actions };
});

function Foo() {
  fooRenderCallCount += 1;
  const foo = useContext(FooContext);
  return <div>value: {foo.value}</div>;
}

function Bar() {
  barRenderCallCount += 1;
  const bar = useContext(BarContext);
  return (
    <div>
      mes: {bar.mes}
      <button onClick={() => bar.inc()}>incerment:foo</button>
    </div>
  );
}

function Baz() {
  bazRenderCallCount += 1;
  const baz = useContext(BazContext);
  return (
    <>
      <button onClick={baz.increment} data-testid="baz-inc">
        incerment from baz
      </button>
      <button onClick={baz.decrement} data-testid="baz-dec">
        decrement from baz
      </button>
    </>
  );
}

const rootReducer: Reducer<RootState> = combineReducers({ foo, bar });
const store = createStore(rootReducer);

function App() {
  return (
    <ReactReduxProvider store={store}>
      <ContextProvider scope={scope}>
        <Foo />
        <Bar />
        <Baz />
      </ContextProvider>
    </ReactReduxProvider>
  );
}

test("supress render", () => {
  const root = document.createElement("div");
  document.body.appendChild(root);

  ReactDOM.render(<App />, root);
  assert.equal(fooReducerCallCount, 3);
  assert.equal(barReducerCallCount, 3);

  assert.equal(fooRenderCallCount, 1);
  assert.equal(barRenderCallCount, 1);
  assert.equal(bazRenderCallCount, 1);

  // emit increment
  store.dispatch({ type: "increment" });

  // call all counter
  assert.equal(fooReducerCallCount, 4);
  assert.equal(barReducerCallCount, 4);

  // update only foo component
  assert.equal(fooRenderCallCount, 2);
  assert.equal(barRenderCallCount, 1);
  assert.equal(bazRenderCallCount, 1);
});
