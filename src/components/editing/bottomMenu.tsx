import { useAppProvider } from "../../provider";
import { ColorPalette } from "../colorPalette";
import type { Pixel } from "../../types";

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

  return (
    <div class="absolute bottom-0 right-0 flex w-full items-end justify-between p-4">
      <span class="m-4 text-lg">
        {countPaintedPixels(state.pixels)} /{" "}
        {state.pixels.length * state.pixels[0].length}
      </span>
      <div class="m-4 text-center text-xl">Export</div>
      <ColorPalette label={(index: number) => index} />
    </div>
  );
}
