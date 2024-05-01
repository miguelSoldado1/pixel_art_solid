import { useAppProvider } from "../../provider";
import { ColorPalette } from "../colorPalette";
import type { Pixel } from "../../types";
import { createMemo } from "solid-js";
import { unwrap } from "solid-js/store";

function countPaintedPixels(pixels: Pixel[][]) {
  let count = 0;
  for (const row of pixels) {
    for (const column of row) {
      if (column.painted) {
        count++;
      }
    }
  }
  return count;
}

export function BottomMenu() {
  const { state } = useAppProvider();
  const paintedPixelsCount = createMemo(() => countPaintedPixels(state.pixels));

  function logToConsole() {
    if (paintedPixelsCount() < state.pixels.length * state.pixels[0].length) {
      return console.log("Not all pixels are painted");
    }

    const data = unwrap(state);

    console.log({
      colors: data.colors,
      pixels: data.pixels.map((x) => x.map((y) => (y.painted = false))),
    });
  }

  return (
    <div class="absolute bottom-0 right-0 flex w-full items-end justify-between p-4">
      <span class="m-4 text-lg">
        {paintedPixelsCount()} / {state.pixels.length * state.pixels[0].length}
      </span>
      <button class="m-4 text-center text-xl" onClick={logToConsole}>
        Export
      </button>
      <ColorPalette label={(index: number) => index} />
    </div>
  );
}
