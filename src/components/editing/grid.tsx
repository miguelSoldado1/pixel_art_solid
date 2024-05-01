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
          setState("pixels", y, x, {
            colorIndex: state.currentColor,
            painted: true,
          });
      }
    }
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
