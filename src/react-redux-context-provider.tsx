import React, { useContext } from "react";
import { Store, AnyAction, Dispatch } from "redux";
import { ReactReduxContext, Provider as ReactReduxProvider } from "react-redux";

export const DispatchContext = React.createContext(null as any);
export function useDipatch<A extends AnyAction = AnyAction>(): Dispatch<A> {
  return useContext(DispatchContext);
}

export function Provider<T>(props: {
  store: Store<T>;
  scope: Scope;
  children: any;
}) {
  const mapped = Array.from(props.scope.connectorMap.values()).reduce(
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

export class Scope<S = any> {
  public connectorMap: Map<React.Context<any>, any> = new Map();
  public createContext<Mapped>(
    mapState: (state: S) => Mapped
  ): React.Context<Mapped> {
    const NewContext = React.createContext<Mapped>(null as any);
    function ConnectedProvider(props: { children: any }) {
      const { storeState } = useContext(ReactReduxContext);
      return (
        <NewContext.Provider value={mapState(storeState)}>
          {props.children}
        </NewContext.Provider>
      );
    }
    this.connectorMap.set(NewContext, ConnectedProvider);
    return NewContext;
  }
}
