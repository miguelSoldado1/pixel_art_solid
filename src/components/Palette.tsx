import { Index } from "solid-js";
import { State, useAppProvider } from "../provider";

function getPaintedRatio(state: State) {
  let currentPixels = 0;
  let paintedPixels = 0;

  state.pixels.forEach((pixel) => {
    if (pixel.colorIndex === state.currentColor) {
      currentPixels++;
      if (pixel.painted) {
        paintedPixels++;
      }
    }
  });

  return `${paintedPixels} | ${currentPixels}`;
}

export function Palette() {
  const { state, setCurrentColor } = useAppProvider();

  return (
    <div class="absolute bottom-0 right-0 m-4 flex flex-col gap-2">
      <span class="mx-4 border-b-2 border-white p-1 text-center text-lg">
        {getPaintedRatio(state)}
      </span>
      <div class="grid grid-cols-10">
        <Index each={state.colors}>
          {(color, index) => (
            <button
              class={`text-outline-color flex aspect-square w-12 cursor-pointer items-center justify-center border ${state.currentColor === index ? "border-white" : "border-black"}`}
              style={{ background: color() }}
              onClick={() => setCurrentColor(index)}
            >
              {index}
            </button>
          )}
        </Index>
      </div>
    </div>
  );
}
