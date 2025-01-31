import { AlgorithmVisualizer } from "./animation";
import { Header } from "./components/Header";
import { useStore } from "./constants/storeState";
import { useEffect } from "react";
import { Navbar } from "./navbar";
import { Separator } from "./components/Separator";
import { Settings } from "./Settings";
function App() {
  const { setSize } = useStore();
  useEffect(() => {
    setSize(20);
  }, [setSize]);
  return (
    <div className="flex flex-col h-dvh bg-background text-foreground">
      <Navbar />
      <main className="lg:container lg:max-w-7xl flex flex-col gap-4 lg:gap-10 p-8 lg:p-10 h-full w-full">
        <div className="hidden md:flex flex-col gap-2">
          <Header />
          <Separator />
          <Settings />
        </div>
        <AlgorithmVisualizer />
      </main>
    </div>
  );
}

export default App;
