import { JSX, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import type { Pixel } from "./types";

export interface State {
  pixels: Pixel[];
  colors: string[];
  currentColor: number;
  paintTool: "paintBucket" | "pencil";
}

interface ContextProps {
  state: State;
  setState: SetStoreFunction<State>;
}

const PixelsContext = createContext<ContextProps>();

interface AppProviderProps {
  children: JSX.Element;
  state: State;
}

export function AppProvider(props: AppProviderProps) {
  const [state, setState] = createStore(props.state);

  return (
    <PixelsContext.Provider value={{ state, setState }}>
      {props.children}
    </PixelsContext.Provider>
  );
}

export function useAppProvider() {
  const context = useContext(PixelsContext);

  if (context === undefined) {
    throw new Error(`useAppProvider must be used within a AppProvider`);
  }

  return context;
}
