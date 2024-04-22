import { JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import type { Pixel } from "./types";

export interface State {
  pixels: Pixel[];
  colors: string[];
  currentColor: number;
}

interface ContextProps {
  state: State;
  setPixel: (index: number, { painted, colorIndex }: Pixel) => void;
  isColorFinished: (index: number) => boolean;
  setCurrentColor: (index: number) => void;
}

const PixelsContext = createContext<ContextProps>();

interface AppProviderProps {
  children: JSX.Element;
  state: State;
}

export function AppProvider(props: AppProviderProps) {
  const [state, setState] = createStore(props.state);

  function setPixel(index: number, { painted, colorIndex }: Pixel) {
    setState("pixels", (prevPixels) => {
      const newPixels = [...prevPixels];
      newPixels[index] = { painted, colorIndex };
      return newPixels;
    });
  }

  function isColorFinished(index: number) {
    return state.pixels.every(
      (pixel) => pixel.colorIndex === index && pixel.painted,
    );
  }

  function setCurrentColor(index: number) {
    setState("currentColor", index);
  }

  return (
    <PixelsContext.Provider
      value={{ state, setPixel, isColorFinished, setCurrentColor }}
    >
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
