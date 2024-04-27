import { AppProvider } from "../provider";
import { generateRandomArt } from "../../utils";
import { Grid, Palette, SideBar } from "../components";

const width = 16 * 2;
const height = 9 * 2;
const colorAmount = 10;

const state = generateRandomArt({ width, height, colorAmount });

export function PixelArt() {
  return (
    <AppProvider state={{ ...state, currentColor: 0, paintTool: "pencil" }}>
      <SideBar />
      <Grid />
      <Palette />
    </AppProvider>
  );
}
