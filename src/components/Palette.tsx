import { Accessor, Index, Setter, createMemo } from "solid-js";
import { useAppProvider } from "../provider";

interface PaletteProps {
  colors: string[];
  colorIndex: Accessor<number>;
  setColorIndex: Setter<number>;
}

export default function Palette(props: PaletteProps) {
  const { colors, colorIndex, setColorIndex } = props;
  const { pixels } = useAppProvider();

  const currentPixels = createMemo(() =>
    pixels().filter((pixel) => pixel.colorIndex === colorIndex()),
  );

  const paintedPixels = createMemo(() =>
    currentPixels().reduce((sum, pixel) => sum + (pixel.painted ? 1 : 0), 0),
  );

  return (
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-3">
        <Index each={colors}>
          {(color, index) => (
            <button
              class={`flex aspect-square w-12 cursor-pointer items-center justify-center border text-outline-color ${colorIndex() === index ? "border-white" : "border-black"}`}
              style={{ background: color() }}
              onClick={() => setColorIndex(index)}
            >
              {index}
            </button>
          )}
        </Index>
      </div>
      <span>
        {paintedPixels()} / {currentPixels().length}
      </span>
    </div>
  );
}
