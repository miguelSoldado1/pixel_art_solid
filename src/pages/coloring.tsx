import { AppProvider } from "@/provider";
// import { generateRandomArt } from "../../utils";
import { Grid, BottomMenu, SideBar } from "@/components/coloring";
import mario from "../mario.json";
import yoda from "../yoda.json";
import { useParams } from "@solidjs/router";

// const width = 16 * 2;
// const height = 9 * 2;
// const colorAmount = 10;

// const state = generateRandomArt({ width, height, colorAmount });

const art = [
  { ...mario, id: "mario" },
  { ...yoda, id: "yoda" },
];

export function Coloring() {
  const params = useParams();
  const { id, ...item } = art.find((item) => item.id === params.path) ?? art[0];

  return (
    <div class="m-2 w-full">
      <AppProvider state={{ ...item, currentColor: 0, paintTool: "pencil" }}>
        <SideBar />
        <Grid />
        <BottomMenu />
      </AppProvider>
    </div>
  );
}
