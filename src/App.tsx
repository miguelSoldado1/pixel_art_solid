import { createSignal } from "solid-js";
import pixelMap from "../art";
import { Grid } from "./components/Grid";
import Palette from "./components/Palette";
import { AppProvider } from "./provider";

const colors = ["#000000", "#FFFFFF", "#F6C8A4", "#4C2D17", "#8BC34A"];

function App() {
  const [colorIndex, setColorIndex] = createSignal(0);

  return (
    <AppProvider pixels={pixelMap}>
      <div class="relative flex h-full select-none justify-center gap-8 p-20">
        <Palette
          colors={colors}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
        />
        <Grid colors={colors} rows={15} columns={15} colorIndex={colorIndex} />
      </div>
    </AppProvider>
  );
}

export default App;
