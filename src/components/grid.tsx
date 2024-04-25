import { Index, createMemo, createSignal } from "solid-js";
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
  const { state, setState } = useAppProvider();

  const paintedPixelsCount = createMemo(() =>
    state.pixels.reduce((acc, pixel) => (pixel.painted ? acc + 1 : acc), 0),
  );

  function handleDraw(e: SolidMouseEvent, index: number) {
    setPosition({ x: index % columns, y: Math.floor(index / columns) });
    const current = state.currentColor === state.pixels[index].colorIndex;

    if (current && (e.buttons === 1 || e.button === 1)) {
      if (e.shiftKey) return bucketFill(index);
      setState("pixels", index, (prev) => ({ ...prev, painted: true }));
    }
  }

  function bucketFill(index: number, visited: Set<number> = new Set()) {
    if (
      index < 0 ||
      index >= columns * rows ||
      visited.has(index) ||
      state.pixels[index].colorIndex !== state.currentColor
    ) {
      return true;
    }

    setState("pixels", index, (prev) => ({ ...prev, painted: true }));
    visited.add(index);

    const pixelX = index % columns;
    const pixelY = Math.floor(index / columns);

    if (pixelY > 0) bucketFill(index - columns, visited); // top
    if (pixelX < columns - 1) bucketFill(index + 1, visited); // right
    if (pixelY < rows - 1) bucketFill(index + columns, visited); // bottom
    if (pixelX > 0) bucketFill(index - 1, visited); // left
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
          {paintedPixelsCount()} / {state.pixels.length}
        </span>
      </div>
    </>
  );
}
