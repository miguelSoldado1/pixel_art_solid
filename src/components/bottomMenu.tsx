import { Index, createMemo } from "solid-js";
import { useAppProvider } from "../provider";
import { ColorButton } from "./colorButton";
import { getPaintedRatio } from "../../helpers";
import type { Pixel } from "../types";

function getPaintedRatioStr(pixels: Pixel[][], currentIdx: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(pixels, currentIdx);

  return `${paintedPixels} | ${currentPixels}`;
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
  const paintedPixelsCount = createMemo(() => countPaintedPixels(state.pixels));

  return (
    <div class="absolute bottom-0 right-0 flex w-full items-end justify-between p-4">
      <span class="m-4 text-lg">
        {paintedPixelsCount()} / {state.pixels.flatMap((x) => x).length}
      </span>
      <div class="flex flex-col gap-2">
        <span class="mx-4 border-b-2 border-white p-1 text-center text-lg">
          {getPaintedRatioStr(state.pixels, state.currentColor)}
        </span>
        <div class="grid grid-cols-10">
          <Index each={state.colors}>
            {(color, index) => <ColorButton color={color()} index={index} />}
          </Index>
        </div>
      </div>
    </div>
  );
}
