import { Route, RouteSectionProps, Router } from "@solidjs/router";
import { Coloring, Editing } from "./pages";

function Root(props: RouteSectionProps) {
  return <div class=" flex h-full select-none">{props.children}</div>;
}

export default function App() {
  return (
    <Router root={Root}>
      <Route path="/" component={Coloring} />
      <Route path="/editing" component={Editing} />
    </Router>
  );
}
