import { useAppProvider } from "@/provider";
import PaintBucket from "@/assets/paintbucket.svg";
import Pencil from "@/assets/pencil.svg";
import Home from "@/assets/home.svg";
import Eraser from "@/assets/eraser.svg";

const buttonClass = "p-2 disabled:rounded disabled:bg-accent-color";

export function SideBar() {
  const { state, setState } = useAppProvider();

  return (
    <div class="absolute left-0 top-0 flex h-full flex-col gap-4 p-4">
      <button class={buttonClass}>
        <Home />
      </button>
      <button
        class={buttonClass}
        disabled={state.paintTool === "pencil"}
        onClick={() => setState("paintTool", "pencil")}
      >
        <Pencil />
      </button>
      <button
        class={buttonClass}
        disabled={state.paintTool === "paintBucket"}
        onClick={() => setState("paintTool", "paintBucket")}
      >
        <PaintBucket />
      </button>
      <button
        class={buttonClass}
        disabled={state.paintTool === "eraser"}
        onClick={() => setState("paintTool", "eraser")}
      >
        <Eraser />
      </button>
    </div>
  );
}
