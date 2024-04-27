import { Route, RouteSectionProps, Router } from "@solidjs/router";
import { PixelArt } from "./pages";

function Root(props: RouteSectionProps) {
  return (
    <div class="relative flex h-full select-none justify-center gap-8 p-8">
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
