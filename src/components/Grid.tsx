import { Index, createSignal } from "solid-js";
import { useAppProvider } from "../provider";

interface GridProps {
  rows: number;
  columns: number;
}

interface SolidMouseEvent extends MouseEvent {
  currentTarget: HTMLDivElement;
  target: Element;
}

const outlineColor = "#333333";

export function Grid(props: GridProps) {
  const { rows, columns } = props;

  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const { state, setPixel } = useAppProvider();

  function handleDraw(e: SolidMouseEvent, index: number) {
    setPosition({ x: index % columns, y: Math.floor(index / columns) });

    if (
      state.pixels[index].colorIndex === state.currentColor &&
      e.buttons === 1
    ) {
      setPixel(index, { painted: true, colorIndex: state.currentColor });
    }
  }

  return (
    <>
      <div
        class="grid h-5/6 cursor-crosshair"
        style={{
          "grid-template-rows": `repeat(${rows}, 1fr)`,
          "grid-template-columns": `repeat(${columns}, 1fr)`,
        }}
      >
        <Index each={state.pixels}>
          {(item, index) => {
            return (
              <div
                onMouseEnter={(e) => handleDraw(e, index)}
                onMouseDown={(e) => handleDraw(e, index)}
                class={`flex aspect-square items-center justify-center text-xs ${item().colorIndex === state.currentColor ? "bg-accent-color" : ""}`}
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
                {!item().painted && item().colorIndex}
              </div>
            );
          }}
        </Index>
      </div>
      <div class="absolute bottom-0 left-0 m-8 flex gap-2 text-lg">
        <span>
          {position().x}, {position().y}
        </span>
        |
        <span>
          {state.pixels.reduce(
            (sum, pixel) => sum + (pixel.painted ? 1 : 0),
            0,
          )}{" "}
          / {state.pixels.length}
        </span>
      </div>
    </>
  );
}
