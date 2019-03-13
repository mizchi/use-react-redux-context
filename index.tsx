import React, { useContext, useCallback, useEffect } from "react";
import { AnyAction, Dispatch } from "redux";
import { ReactReduxContext } from "react-redux";
import shallow from "shallow-equal/objects";

export const DispatchContext = React.createContext(null as any);
export function useDispatch<A extends AnyAction = AnyAction>(): Dispatch<A> {
  return useContext(DispatchContext);
}

export function Provider(props: { scope: Scope; children: any }) {
  const wrappedChildren = [...props.scope.connectorMap.values()].reduce(
    (el, ConnectedProvider) => {
      return <ConnectedProvider>{el}</ConnectedProvider>;
    },
    props.children
  );

  useEffect(() => {
    return () => props.scope.destroy();
  }, []);

  const { store } = useContext(ReactReduxContext);
  return (
    <DispatchContext.Provider value={store.dispatch}>
      {wrappedChildren}
    </DispatchContext.Provider>
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

export function useBindAction<F extends Function>(
  action: F,
  keys: any[] = []
): F {
  const dispatch = useDispatch();
  const fn = (...args: any) => dispatch(action(...args) as any);
  return useCallback(fn, keys) as any;
}

export function useBindActions<
  FM extends { [key: string]: Function },
  K extends keyof FM
>(actionMap: FM, keysMap: { [key in K]: Array<any> } = {} as any): FM {
  const dispatch = useDispatch();
  return Object.entries(actionMap).reduce(
    (acc, [key, action]) => {
      return {
        ...acc,
        [key]: useCallback(
          (...args: any) => dispatch(action(...args) as any),
          keysMap[key as K] || []
        )
      };
    },
    {} as FM
  );
}
