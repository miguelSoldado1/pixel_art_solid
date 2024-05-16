import { AppProvider } from "@/provider";
import { useNavigate, useParams } from "@solidjs/router";
import content from "@/content";
import { Grid, BottomMenu, SideBar } from "@/components/coloring";

export function Coloring() {
  const navigate = useNavigate();
  const params = useParams();

  const item = content.find((item) => item.path === params.path);

  if (item === undefined) {
    return navigate("/");
  }

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
