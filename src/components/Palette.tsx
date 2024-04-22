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
    <div class="absolute bottom-0 right-0 m-4 flex flex-col gap-2">
      <span class="mx-4 border-b-2 border-white p-1 text-center text-lg">
        {paintedPixels()} | {currentPixels().length}
      </span>
      <div class="grid grid-cols-10">
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
    </div>
  );
}
