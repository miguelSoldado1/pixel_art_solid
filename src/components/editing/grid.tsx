import { Index } from "solid-js";
import { useAppProvider } from "@/provider";

const outlineColor = "#333333";

export function Grid() {
  const { state, setState } = useAppProvider();
  const columns = state.pixels[0].length;
  const rows = state.pixels.length;

  function handleDraw(e: MouseEvent, y: number, x: number) {
    if (e.buttons === 1 || e.button === 1) {
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
      <div
        class="grid cursor-crosshair"
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
