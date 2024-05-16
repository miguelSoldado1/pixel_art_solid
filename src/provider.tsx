import { JSX, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import type { Pixel } from "./types";

export interface State {
  pixels: Pixel[][];
  colors: string[];
  currentColor: number;
  paintTool: "paintBucket" | "pencil" | "eraser";
  toggleIndices: boolean;
}

interface ContextProps {
  state: State;
  setState: SetStoreFunction<State>;
}

const PixelsContext = createContext<ContextProps>();

interface AppProviderProps {
  children: JSX.Element;
  state: Partial<State>;
}

const defaultProps: State = {
  pixels: [],
  colors: [],
  currentColor: 0,
  paintTool: "pencil",
  toggleIndices: false,
};

export function AppProvider(props: AppProviderProps) {
  const [state, setState] = createStore({ ...defaultProps, ...props.state });

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
