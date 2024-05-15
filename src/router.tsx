import { Route, RouteSectionProps, Router } from "@solidjs/router";
import { Coloring, Editing, Home } from "@/pages";

function Root(props: RouteSectionProps) {
  return <div class=" flex h-full select-none">{props.children}</div>;
}

export default function App() {
  return (
    <Router root={Root}>
      <Route path="/:path" component={Coloring} />
      <Route path="/editing" component={Editing} />
      <Route path="/" component={Home} />
    </Router>
  );
}
