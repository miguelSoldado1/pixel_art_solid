import CheckMark from "../../assets/check.svg";
import { useAppProvider } from "../../provider";
import { getPaintedRatio } from "../../../helpers";
import type { Pixel } from "../../types";
import { ColorPalette } from "../colorPalette";

function getPaintedRatioStr(pixels: Pixel[][], currentIdx: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(pixels, currentIdx);
  return `${paintedPixels} | ${currentPixels}`;
}

function isColorFinished(pixels: Pixel[][], index: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(pixels, index);
  return paintedPixels === currentPixels;
}

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
      <div class="flex flex-col gap-2">
        <span class="mx-4 border-b-2 border-white p-1 text-center text-lg">
          {getPaintedRatioStr(state.pixels, state.currentColor)}
        </span>
        <ColorPalette
          label={(index: number) =>
            isColorFinished(state.pixels, index) ? <CheckMark /> : index
          }
        />
      </div>
    </div>
  );
}
