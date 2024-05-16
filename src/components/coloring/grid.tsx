import { Index } from "solid-js";
import { useAppProvider } from "@/provider";

const outlineColor = "#333333";

export function Grid() {
  const { state, setState } = useAppProvider();
  const columns = state.pixels[0].length;
  const rows = state.pixels.length;

  function handleDraw(e: MouseEvent, y: number, x: number) {
    const { painted, colorIndex } = state.pixels[y][x];
    if (painted || state.currentColor !== colorIndex || e.buttons !== 1) {
      return false;
    }

    if (state.paintTool === "paintBucket") {
      return bucketFill(y, x);
    }

    if (state.paintTool === "pencil") {
      return setState("pixels", y, x, (prev) => ({ ...prev, painted: true }));
    }
  }

  function bucketFill(y: number, x: number, visited = new Set<number>()) {
    const { currentColor, pixels } = state;
    const currentIndex = y * columns + x;

    if (visited.has(currentIndex) || pixels[y][x].colorIndex !== currentColor) {
      return;
    }

    setState("pixels", y, x, (prev) => ({ ...prev, painted: true }));
    visited.add(currentIndex);

    if (y > 0) bucketFill(y - 1, x, visited); // top
    if (x < columns - 1) bucketFill(y, x + 1, visited); // right
    if (y < rows - 1) bucketFill(y + 1, x, visited); // bottom
    if (x > 0) bucketFill(y, x - 1, visited); // left
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
                  onMouseDown={(e) => {
                    handleDraw(e, y, x);
                    if (e.buttons === 4) {
                      setState("currentColor", item().colorIndex);
                    }
                  }}
                  class="flex aspect-square items-center justify-center text-xs"
                  style={{
                    "background-color": item().painted
                      ? state.colors[item().colorIndex]
                      : item().colorIndex === state.currentColor
                        ? "#404040"
                        : undefined,
                    outline: item().painted
                      ? "none"
                      : `1px solid ${outlineColor}`,
                  }}
                >
                  {!state.toggleIndices && !item().painted && item().colorIndex}
                </div>
              )}
            </Index>
          )}
        </Index>
      </div>
    </div>
  );
}
