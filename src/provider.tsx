import {
  Accessor,
  JSX,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import type { Pixel } from "./types";

interface ContextProps {
  pixels: Accessor<Pixel[]>;
  setPixel: (index: number, { painted, colorIndex }: Pixel) => Pixel[];
  isColorFinished: (index: number) => boolean;
}

const PixelsContext = createContext<ContextProps>();

interface AppProviderProps {
  children: JSX.Element;
  pixels: Pixel[];
}

export function AppProvider(props: AppProviderProps) {
  const [pixels, setPixels] = createSignal(props.pixels);

  function setPixel(index: number, { painted, colorIndex }: Pixel) {
    return setPixels((prevPixels) => {
      const newPixels = [...prevPixels];
      newPixels[index] = { painted, colorIndex };
      return newPixels;
    });
  }

  function isColorFinished(index: number) {
    return pixels().every(
      (pixel) => pixel.colorIndex === index && pixel.painted,
    );
  }

  return (
    <PixelsContext.Provider value={{ pixels, setPixel, isColorFinished }}>
      {props.children}
    </PixelsContext.Provider>
  );
}

export function useAppProvider() {
  const context = useContext(PixelsContext);

  if (context === undefined) {
    throw new Error(`usePixels must be used within a PixelsProvider`);
  }

  return context;
}
