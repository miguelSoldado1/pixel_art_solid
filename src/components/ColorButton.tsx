import { State, useAppProvider } from "../provider";
import { getPaintedRatio } from "../../helpers";

interface ColorButtonProps {
  color: string;
  index: number;
}

function isColorFinished(state: State, index: number) {
  const { currentPixels, paintedPixels } = getPaintedRatio(state.pixels, index);

  return paintedPixels === currentPixels;
}

export function ColorButton(props: ColorButtonProps) {
  const { state, setCurrentColor } = useAppProvider();

  return (
    <button
      class={`text-outline-color flex aspect-square w-12 cursor-pointer items-center justify-center border ${state.currentColor === props.index ? "border-white" : "border-black"}`}
      style={{ background: props.color }}
      onClick={() => setCurrentColor(props.index)}
    >
      {isColorFinished(state, props.index) ? "✔️" : props.index}
    </button>
  );
}
