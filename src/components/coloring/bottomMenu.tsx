import CheckMark from "@/assets/check.svg";
import { useAppProvider } from "@/provider";
import { getPaintedRatio } from "@/helpers";
import { ColorPalette } from "../colorPalette";
import type { Pixel } from "@/types";

function getPaintedRatioStr(pixels: Pixel[][], currentIdx: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(pixels, currentIdx);
  return `${paintedPixels} | ${currentPixels}`;
}

function isColorFinished(pixels: Pixel[][], index: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(pixels, index);
  return paintedPixels === currentPixels;
}

function countPaintedPixelsStr(pixels: Pixel[][]) {
  let count = 0;
  for (const row of pixels) {
    for (const column of row) {
      if (column.painted) {
        count++;
      }
    }
  }

  return `${count} / ${pixels.length * pixels[0].length}`;
}

export function BottomMenu() {
  const { state } = useAppProvider();

  return (
    <div class="flex h-1/6 items-center justify-between">
      <span class="m-4 text-lg">{countPaintedPixelsStr(state.pixels)}</span>
      <div class="flex flex-col gap-2">
        <span class="p- mx-4 border-b-2 border-white text-center text-lg">
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
