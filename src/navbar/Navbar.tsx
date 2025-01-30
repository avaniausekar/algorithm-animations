import { AlgorithmSelector } from "./SelectAlgorithm";
export const Navbar = () => (
   <nav className="w-full flex items-center justify-between p-4 border-b-2 border-accent bg-background">
   <h1 className="text-xl font-bold">Visualize Sorting Algorithms</h1>
   <div className="flex items-center gap-6">
     <AlgorithmSelector />
   </div>
 </nav>
);
