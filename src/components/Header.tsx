import { useStore } from "../constants/storeState";
import { Badge } from "./Badge";
import { sortingAlgorithms } from "../constants/algorithmsTheory";
import { ClockIcon } from "@radix-ui/react-icons";

export const Header = () => {
  const { activeAlgorithm } = useStore();

  return (
    <div className="flex flex-col w-full gap-4 lg:gap-8 text-foreground p-8 md:p-0">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl lg:text-4xl font-semibold">
          {sortingAlgorithms[activeAlgorithm].title}
        </h1>
        <div className="flex items-center gap-4 bg-accent lg:bg-background p-4 lg:p-1 rounded  border-2 border-accent">
          <div className="flex items-center gap-2 font-medium lg:flex-row lg:px-4 lg:py-2 lg:rounded text-foreground">
            <span>Time Complexity</span>
            <ClockIcon className="w-4 h-4 text-foreground" />
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <Badge className="flex flex-col md:flex-row w-1/3 md:w-auto md:gap-2">
              Best
              <span className="font-normal">
                {sortingAlgorithms[activeAlgorithm].timeComplexity.best}
              </span>
            </Badge>

            <Badge className="flex flex-col md:flex-row w-1/3 md:w-auto md:gap-2">
              Average
              <span className="font-normal">
                {sortingAlgorithms[activeAlgorithm].timeComplexity.average}
              </span>
            </Badge>

            <Badge className="flex flex-col md:flex-row w-1/3 md:w-auto md:gap-2">
              Worst
              <span className="font-normal">
                {sortingAlgorithms[activeAlgorithm].timeComplexity.worst}
              </span>
            </Badge>
          </div>
        </div>

      </div>
      <p className="lg:text-lg">
        {sortingAlgorithms[activeAlgorithm].longDescription}
      </p>
    </div>

  );
};
