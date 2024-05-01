import { AppProvider } from "../provider";
import { BottomMenu, Grid, SideBar } from "../components/editing";
import { generateEmptyGrid } from "../../utils";

const width = 12;
const height = 16;
const colorAmount = 10;

const { pixels } = generateEmptyGrid({ width, height, colorAmount });
const colors = ["#fb0204", "#7e8002", "#fcaa04", "#333333"];

export function Editing() {
  return (
    <AppProvider
      state={{ pixels, colors, currentColor: 0, paintTool: "pencil" }}
    >
      <SideBar />
      <Grid />
      <BottomMenu />
    </AppProvider>
  );
}
