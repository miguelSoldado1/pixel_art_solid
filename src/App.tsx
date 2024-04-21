import { createSignal } from "solid-js";
import { Grid } from "./components/Grid";
import Palette from "./components/Palette";
import { AppProvider } from "./provider";
import { generateRandomArt } from "../utils";

const width = 16 * 4;
const height = 9 * 4;
const colorAmount = 10;

const { pixels, colors } = generateRandomArt({ width, height, colorAmount });

function App() {
  const [colorIndex, setColorIndex] = createSignal(0);

  return (
    <AppProvider pixels={pixels}>
      <div class="relative flex h-full select-none justify-center gap-8 p-20">
        <Palette
          colors={colors}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
        />
        <Grid
          colors={colors}
          rows={height}
          columns={width}
          colorIndex={colorIndex}
        />
      </div>
    </AppProvider>
  );
}

export default App;
