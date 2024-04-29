import { JSX, splitProps } from "solid-js";

interface ColorButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

export function ColorButton(props: ColorButtonProps) {
  const [local, others] = splitProps(props, ["selected"]);

  return (
    <button
      {...others}
      class={`text-outline-color flex aspect-square w-12 cursor-pointer items-center justify-center border ${local.selected ? "border-white" : "border-black"}`}
    >
      {props.children}
    </button>
  );
}
