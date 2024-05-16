import { AppProvider } from "@/provider";
import { BottomMenu, Grid, SideBar } from "@/components/editing";
import { generateEmptyGrid } from "../../utils";
import mikasa from "@/content/mikasa.json";

const width = 32;
const height = 32;
const colorAmount = 10;

const { pixels } = generateEmptyGrid({ width, height, colorAmount });
const colors = [
  "#090A1C",
  "#161D30",
  "#11253D",
  "#1F2839",
  "#91644D",
  "#312525",
  "#06070C",
  "#6F4038",
  "#FDC371",
  "#4F4249",
  "#CDAA68",
  "#FFCC70",
  "#323338",
  "#7A543B",
  "#0A0D12",
  "#1F1313",
  "#BD9571",
  "#1F272A",
  "#564040",
];

export function Editing() {
  return (
    <div class="m-2 w-full">
      <AppProvider state={{ ...mikasa }}>
        <SideBar />
        <Grid />
        <BottomMenu />
      </AppProvider>
    </div>
  );
}
