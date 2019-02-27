import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, Reducer } from "redux";
import { Provider, Scope, useDipatch } from "./react-redux-context-provider";

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

type FooAction = { type: "increment" };
function foo(state: Foo = initialFoo, action: FooAction): Foo {
  console.log("update foo", state);
  switch (action.type) {
    case "increment": {
      return { value: state.value + 1 };
    }
    default: {
      return state;
    }
  }
}

const initialBar: Bar = { mes: "hello" };
function bar(state: Bar = initialBar, action: any): Bar {
  console.log("update bar", state);
  switch (action.type) {
    default: {
      return state;
    }
  }
}

const scope = new Scope<RootState>();
const FooContext = scope.createContext<Foo>(s => s.foo);
const BarContext = scope.createContext<Bar>(s => s.bar);

function Foo() {
  console.log("render foo");
  const foo = useContext(FooContext);
  return <div>value: {foo.value}</div>;
}

function Bar() {
  console.log("render bar");
  const bar = useContext(BarContext);
  const dispatch = useDipatch();
  return (
    <div>
      mes: {bar.mes}
      <button onClick={() => dispatch({ type: "increment" })}>
        incerment:foo
      </button>
    </div>
  );
}

const rootReducer: Reducer<RootState> = combineReducers({ foo, bar });
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store} scope={scope}>
      <Foo />
      <Bar />
    </Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root") as HTMLDivElement);
