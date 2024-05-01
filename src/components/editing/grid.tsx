import { Index } from "solid-js";
import { useAppProvider } from "../../provider";

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
          return bucketFill(x, y);
      }
    }
  }

  function bucketFill(x: number, y: number, visited = new Set<number>()) {
    const { currentColor, pixels } = state;
    const currentIndex = y * columns + x;

    if (visited.has(currentIndex) || pixels[y][x].painted) {
      return;
    }

    visited.add(currentIndex);
    setState("pixels", y, x, { colorIndex: currentColor, painted: true });

    if (y > 0) bucketFill(x, y - 1, visited); // top
    if (x < columns - 1) bucketFill(x + 1, y, visited); // right
    if (y < rows - 1) bucketFill(x, y + 1, visited); // bottom
    if (x > 0) bucketFill(x - 1, y, visited); // left
  }

  return (
    <div
      class="grid h-5/6 cursor-crosshair"
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
  );
}
