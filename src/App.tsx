import { AppProvider } from "./provider";
import { Grid, Palette, SideBar } from "./components";
import { generateRandomArt } from "../utils";

const width = 16 * 2;
const height = 9 * 2;
const colorAmount = 10;

const state = generateRandomArt({ width, height, colorAmount });

function App() {
  return (
    <div class="relative flex h-full select-none justify-center gap-8 p-8">
      <AppProvider state={{ ...state, currentColor: 0, paintTool: "pencil" }}>
        <SideBar />
        <Grid rows={height} columns={width} />
        <Palette />
      </AppProvider>
    </div>
  );
}

export default App;
