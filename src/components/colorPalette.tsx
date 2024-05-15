import { Index, JSX } from "solid-js";
import { useAppProvider } from "@/provider";

interface ColorPaletteProps {
  label: (index: number) => JSX.Element;
}

export function ColorPalette(props: ColorPaletteProps) {
  const { state, setState } = useAppProvider();

  return (
    <div
      class="grid"
      style={{
        "grid-template-columns": `repeat(${Math.min(state.colors.length, 10)}, minmax(0, 1fr))`,
      }}
    >
      <Index each={state.colors}>
        {(color, index) => (
          <button
            color={color()}
            class={`text-outline-color flex aspect-square h-11 cursor-pointer items-center justify-center border ${state.currentColor === index ? "border-white" : "border-black"}`}
            style={{ background: color() }}
            onClick={() => setState("currentColor", index)}
          >
            {props.label(index)}
          </button>
        )}
      </Index>
    </div>
  );
}
