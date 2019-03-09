import React from "react";
import { AnyAction, Dispatch } from "redux";
export declare const DispatchContext: React.Context<any>;
export declare function useDispatch<A extends AnyAction = AnyAction>(): Dispatch<A>;
export declare function Provider(props: {
    scope: Scope;
    children: any;
}): JSX.Element;
export declare class Scope<S = any, A extends AnyAction = AnyAction> {
    connectorMap: Map<React.Context<any>, any>;
    lastStateMap: Map<React.Context<any>, any>;
    createContext<Mapped>(mapState: (state: S, dispatch: Dispatch<A>) => Mapped): React.Context<Mapped>;
    destroy(): void;
}
export declare function useBindAction<F extends Function>(action: F, keys?: any[]): F;
export declare function useBindActions<FM extends {
    [key: string]: Function;
}, K extends keyof FM>(actionMap: FM, keysMap?: {
    [key in K]: Array<any>;
}): FM;
