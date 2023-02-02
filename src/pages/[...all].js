import dynamic from "next/dynamic";

const App = dynamic(() => import("../components/Ionic/AppShell/index"), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
