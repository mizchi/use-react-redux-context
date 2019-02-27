import React, { useContext, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  createStore,
  combineReducers,
  Reducer,
  bindActionCreators
} from "redux";
import { Provider, Scope, useDipatch } from "../index";

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
type FooAction = IncrementAction;
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

function increment(): IncrementAction {
  return { type: "increment" };
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

const FooContext = scope.createContext(state => {
  return state.foo;
});

const BarContext = scope.createContext((state, dispatch) => {
  const inc = useCallback(() => dispatch(increment()), []);
  return { ...state.bar, inc };
});

const BazContext = scope.createContext((_state, dispatch) => {
  const inc = useCallback(() => dispatch(increment()), []);
  return { inc };
});

function Foo() {
  console.log("render foo");
  const foo = useContext(FooContext);
  return <div>value: {foo.value}</div>;
}

function Bar() {
  console.log("render bar");
  const bar = useContext(BarContext);
  return (
    <div>
      mes: {bar.mes}
      <button onClick={() => bar.inc()}>incerment:foo</button>
    </div>
  );
}

function Baz() {
  console.log("render baz");
  const baz = useContext(BazContext);
  return <button onClick={() => baz.inc()}>incerment:foo from baz</button>;
}

const rootReducer: Reducer<RootState> = combineReducers({ foo, bar });
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store} scope={scope}>
      <Foo />
      <Bar />
      <Baz />
    </Provider>
  );
}

declare var document: any;
ReactDOM.render(<App />, document.querySelector(".root") as HTMLDivElement);
