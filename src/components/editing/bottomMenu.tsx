import { Index } from "solid-js";
import { useAppProvider } from "../../provider";
import { ColorButton } from "../colorButton";
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
  const { state, setState } = useAppProvider();

  return (
    <div class="absolute bottom-0 right-0 flex w-full items-end justify-between p-4">
      <span class="m-4 text-lg">
        {countPaintedPixels(state.pixels)} /{" "}
        {state.pixels.length * state.pixels[0].length}
      </span>
      <div class="grid grid-cols-10">
        <Index each={state.colors}>
          {(color, index) => (
            <ColorButton
              color={color()}
              selected={state.currentColor === index}
              style={{ background: color() }}
              onClick={() => setState("currentColor", index)}
            >
              {index}
            </ColorButton>
          )}
        </Index>
      </div>
    </div>
  );
}
