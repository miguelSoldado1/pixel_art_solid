import { Index } from "solid-js";
import { useAppProvider } from "../provider";
import { ColorButton } from "./colorButton";
import { getPaintedRatio } from "../../helpers";
import type { Pixel } from "../types";

function getPaintedRatioStr(pixels: Pixel[][], currentIdx: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(pixels, currentIdx);

  return `${paintedPixels} | ${currentPixels}`;
}

export function Palette() {
  const { state } = useAppProvider();

  return (
    <div class="absolute bottom-0 right-0 m-4 flex flex-col gap-2">
      <span class="mx-4 border-b-2 border-white p-1 text-center text-lg">
        {getPaintedRatioStr(state.pixels, state.currentColor)}
      </span>
      <div class="grid grid-cols-10">
        <Index each={state.colors}>
          {(color, index) => <ColorButton color={color()} index={index} />}
        </Index>
      </div>
    </div>
  );
}
