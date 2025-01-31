import { cn } from "../utils/utility";
import { Algorithm } from "../constants/algoTypes";
import { useStore } from "../constants/storeState";
import { Button } from "../components/Button";
import { sortingAlgorithms } from "../constants/algorithmsTheory";

const algorithms = Object.keys(sortingAlgorithms) as Algorithm[];
export const AlgorithmSelector = () => {
  const { activeAlgorithm, setActiveAlgorithm, isPlaying } = useStore();

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {algorithms.map((algorithm) => (
          <Button
            key={algorithm}
            variant="ghost"
            className={cn(
              "px-4 py-2 text-base capitalize hover:bg-accent hover:text-foreground",
              {
                "bg-primary text-background hover:bg-primary/90":
                  activeAlgorithm === algorithm,
              }
            )}
            onClick={() => setActiveAlgorithm(algorithm)}
            disabled={isPlaying}
          >
            {algorithm} Sort
          </Button>
        ))}
      </div>
    </div>
  );
};
