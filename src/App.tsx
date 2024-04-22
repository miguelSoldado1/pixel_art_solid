import { createSignal } from "solid-js";
import { Grid } from "./components/Grid";
import Palette from "./components/Palette";
import { AppProvider } from "./provider";
import { generateRandomArt } from "../utils";

const width = 16 * 2;
const height = 9 * 2;
const colorAmount = 10;

const { pixels, colors } = generateRandomArt({ width, height, colorAmount });

function App() {
  const [colorIndex, setColorIndex] = createSignal(0);

  return (
    <AppProvider pixels={pixels}>
      <div class="relative flex h-full select-none justify-center gap-8 p-8">
        <Grid
          colors={colors}
          rows={height}
          columns={width}
          colorIndex={colorIndex}
        />
        <Palette
          colors={colors}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
        />
      </div>
    </AppProvider>
  );
}

export default App;
