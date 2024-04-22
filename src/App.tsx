import { AppProvider } from "./provider";
import { Grid, Palette } from "./components";
import { generateRandomArt } from "../utils";

const width = 16 * 2;
const height = 9 * 2;
const colorAmount = 10;

const state = generateRandomArt({ width, height, colorAmount });

function App() {
  return (
    <AppProvider state={{ ...state, currentColor: 0 }}>
      <div class="relative flex h-full select-none justify-center gap-8 p-8">
        <Grid rows={height} columns={width} />
        <Palette />
      </div>
    </AppProvider>
  );
}

export default App;
