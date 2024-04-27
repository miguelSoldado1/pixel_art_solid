import { Route, RouteSectionProps, Router } from "@solidjs/router";
import { PixelArt } from "./pages";

function Root(props: RouteSectionProps) {
  return (
    <div class="bg-background-color relative flex h-full select-none justify-center gap-8 p-8 text-white">
      {props.children}
    </div>
  );
}

export default function App() {
  return (
    <Router root={Root}>
      <Route path="/" component={PixelArt} />
    </Router>
  );
}
