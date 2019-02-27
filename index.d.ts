import React from "react";
import { Store, AnyAction, Dispatch } from "redux";
export declare const DispatchContext: React.Context<any>;
export declare function useDipatch<A extends AnyAction = AnyAction>(): Dispatch<A>;
export declare function Provider<T>(props: {
    store: Store<T>;
    scope: Scope;
    children: any;
}): JSX.Element;
export declare class Scope<S = any, A extends AnyAction = AnyAction> {
    connectorMap: Map<React.Context<any>, any>;
    lastStateMap: Map<React.Context<any>, any>;
    createContext<Mapped>(mapState: (state: S, dispatch: Dispatch<A>) => Mapped): React.Context<Mapped>;
    destroy(): void;
}
