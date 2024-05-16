import { Index } from "solid-js";
import { useAppProvider } from "@/provider";

const outlineColor = "#333333";

export function Grid() {
  const { state, setState } = useAppProvider();
  const columns = state.pixels[0].length;
  const rows = state.pixels.length;

  function handleDraw(e: MouseEvent, y: number, x: number) {
    if (e.buttons === 1) {
      switch (state.paintTool) {
        case "pencil":
          return setState("pixels", y, x, {
            colorIndex: state.currentColor,
            painted: true,
          });
        case "eraser":
          return setState("pixels", y, x, {
            colorIndex: -1,
            painted: false,
          });
        case "paintBucket":
          return bucketFill(y, x, state.pixels[y][x].colorIndex);
      }
    }
  }

  function bucketFill(
    y: number,
    x: number,
    initialColor: number,
    visited = new Set<number>(),
  ) {
    const currentIndex = y * columns + x;

    if (
      visited.has(currentIndex) ||
      state.pixels[y][x].colorIndex !== initialColor
    ) {
      return;
    }

    visited.add(currentIndex);
    setState("pixels", y, x, { colorIndex: state.currentColor, painted: true });

    if (y > 0) bucketFill(y - 1, x, initialColor, visited); // top
    if (x < columns - 1) bucketFill(y, x + 1, initialColor, visited); // right
    if (y < rows - 1) bucketFill(y + 1, x, initialColor, visited); // bottom
    if (x > 0) bucketFill(y, x - 1, initialColor, visited); // left
  }

  return (
    <div class="flex h-5/6 w-full justify-center">
      <img
        class="absolute w-[674.667px]"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf1a2a60-2dec-4173-9c9d-d0adc4f0b0c8/debvevh-21530d40-6005-45f4-8e4e-c1d2a41d90ad.png/v1/fit/w_512,h_512,q_70,strp/mikasa_ackerman_pixel_art_32_bits_by_guiopixel_debvevh-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvYmYxYTJhNjAtMmRlYy00MTczLTljOWQtZDBhZGM0ZjBiMGM4XC9kZWJ2ZXZoLTIxNTMwZDQwLTYwMDUtNDVmNC04ZTRlLWMxZDJhNDFkOTBhZC5wbmciLCJ3aWR0aCI6Ijw9NTEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0._PPy-1YP-HV9dB-92koEitsGTcl--LiLpUWdavy3etk"
      />
      <div
        class="z-10 grid cursor-crosshair"
        style={{
          "grid-template-rows": `repeat(${rows}, 1fr)`,
          "grid-template-columns": `repeat(${columns}, 1fr)`,
        }}
      >
        <Index each={state.pixels}>
          {(row, y) => (
            <Index each={row()}>
              {(item, x) => (
                <div
                  onMouseEnter={(e) => handleDraw(e, y, x)}
                  onMouseDown={(e) => handleDraw(e, y, x)}
                  class="flex aspect-square items-center justify-center text-xs"
                  style={
                    item().painted
                      ? {
                          "background-color": state.colors[item().colorIndex],
                          outline: "none",
                        }
                      : {
                          "background-color": "inherit",
                          outline: `1px solid ${outlineColor}`,
                        }
                  }
                />
              )}
            </Index>
          )}
        </Index>
      </div>
    </div>
  );
}
