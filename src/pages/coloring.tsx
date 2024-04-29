import { AppProvider } from "../provider";
import { generateRandomArt } from "../../utils";
import { Grid, BottomMenu, SideBar } from "../components/coloring";

const width = 16 * 2;
const height = 9 * 2;
const colorAmount = 10;

const state = generateRandomArt({ width, height, colorAmount });

export function Coloring() {
  return (
    <AppProvider state={{ ...state, currentColor: 0, paintTool: "pencil" }}>
      <SideBar />
      <Grid />
      <BottomMenu />
    </AppProvider>
  );
}
