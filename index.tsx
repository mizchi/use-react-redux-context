import React, { useContext } from "react";
import { Store, AnyAction, Dispatch } from "redux";
import { ReactReduxContext, Provider as ReactReduxProvider } from "react-redux";
import shallow from "shallow-equal/objects";

export const DispatchContext = React.createContext(null as any);
export function useDipatch<A extends AnyAction = AnyAction>(): Dispatch<A> {
  return useContext(DispatchContext);
}

export function Provider<T>(props: {
  store: Store<T>;
  scope: Scope;
  children: any;
}) {
  const mapped = [...props.scope.connectorMap.values()].reduce(
    (el, ConnectedProvider) => {
      return <ConnectedProvider>{el}</ConnectedProvider>;
    },
    props.children
  );
  return (
    <ReactReduxProvider store={props.store}>
      <DispatchContext.Provider value={props.store.dispatch}>
        {mapped}
      </DispatchContext.Provider>
    </ReactReduxProvider>
  );
}

export class Scope<S = any, A extends AnyAction = AnyAction> {
  public connectorMap: Map<React.Context<any>, any> = new Map();
  public lastStateMap: Map<React.Context<any>, any> = new Map();

  public createContext<Mapped>(
    mapState: (state: S, dispatch: Dispatch<A>) => Mapped
  ): React.Context<Mapped> {
    const NewContext = React.createContext<Mapped>(null as any);

    const self = this;
    function ConnectedProvider(props: { children: any }) {
      const { storeState, store } = useContext(ReactReduxContext);
      const newProps: Mapped = mapState(storeState, store.dispatch);

      let nextProps: Mapped = newProps;

      const lastProps = self.lastStateMap.get(NewContext);
      const isSameProps =
        newProps === lastProps || shallow(newProps, lastProps);

      if (isSameProps) {
        nextProps = lastProps;
      } else {
        self.lastStateMap.set(NewContext, nextProps);
      }
      return (
        <NewContext.Provider value={nextProps}>
          {props.children}
        </NewContext.Provider>
      );
    }
    this.connectorMap.set(NewContext, ConnectedProvider);
    return NewContext;
  }

  destroy() {
    this.lastStateMap.clear();
  }
}
