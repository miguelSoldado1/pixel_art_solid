import { Accessor, Index, createSignal } from "solid-js";
import { useAppProvider } from "../provider";

interface GridProps {
  rows: number;
  columns: number;
  colors: string[];
  colorIndex: Accessor<number>;
}

interface SolidMouseEvent extends MouseEvent {
  currentTarget: HTMLDivElement;
  target: Element;
}

const outlineClass = "outline outline-1 outline-outline-color";

export function Grid(props: GridProps) {
  const { rows, columns, colors, colorIndex } = props;
  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const { pixels, setPixel } = useAppProvider();

  function handleDraw(e: SolidMouseEvent, index: number) {
    setPosition({ x: index % columns, y: Math.floor(index / columns) });

    if (pixels()[index].colorIndex === colorIndex() && e.buttons === 1) {
      setPixel(index, { painted: !e.shiftKey, colorIndex: colorIndex() });
    }
  }

  return (
    <>
      <div
        class={`grid h-full cursor-crosshair overflow-auto ${outlineClass}`}
        style={{
          "grid-template-rows": `repeat(${rows}, 1fr)`,
          "grid-template-columns": `repeat(${columns}, 1fr)`,
        }}
      >
        <Index each={pixels()}>
          {(item, index) => {
            return (
              <div
                onMouseEnter={(e) => handleDraw(e, index)}
                onMouseDown={(e) => handleDraw(e, index)}
                class={`flex aspect-square items-center justify-center ${outlineClass} ${item().colorIndex === colorIndex() ? "bg-accent-color" : ""}`}
                style={{
                  "background-color": item().painted
                    ? colors[item().colorIndex]
                    : item().colorIndex === colorIndex()
                      ? "#404040"
                      : undefined,
                }}
              >
                {!item().painted && item().colorIndex}
              </div>
            );
          }}
        </Index>
      </div>
      <div class="absolute bottom-0 right-0 m-8 flex gap-2">
        <span>
          {position().x}, {position().y}
        </span>
        |
        <span>
          {pixels().reduce((sum, pixel) => sum + (pixel.painted ? 1 : 0), 0)} /{" "}
          {pixels().length}
        </span>
      </div>
    </>
  );
}
