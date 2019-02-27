import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, Reducer } from "redux";
import { ReactReduxContext, Provider } from "react-redux";

type Counter = {
  value: number;
};
type RootState = {
  counter: Counter;
};

function counter(): Counter {
  return { value: 0 };
}

const rootReducer: Reducer<RootState> = combineReducers({ counter });

const store = createStore(rootReducer);

function Counter() {
  const { storeState } = useContext(ReactReduxContext);
  return <div>value: {storeState.counter.value}</div>;
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root") as HTMLDivElement);
