import { useStore } from "../constants/storeState";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { cn } from "../utils/utility";
import { useRef, useState } from "react";

export const AlgorithmVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemMaxHeight, setItemMaxHeight] = useState(0);

  const {
    items,
    setItems,
    activeItems,
    doneItems,
    tempItems,
    arrayId,
    displayMode,
    swaps,
    comparisons,
    time,
  } = useStore();

  const containerHeight = containerRef.current?.getBoundingClientRect().height;

  if (containerHeight && containerHeight !== itemMaxHeight) {
    setItemMaxHeight(containerHeight);
  }

  return (
    <div className="border border-accent/50 lg:border-none lg:bg-accent rounded flex flex-col items-center justify-center overflow-hidden h-full p-1 md:p-2 lg:p-3 xl:p-8 shadow">
    <div className="text-foreground text-center w-full flex justify-between px-4 font-bold">
        <span>Swaps: <span className="font-normal">{swaps}</span></span>
        <span>Comparisons: <span className="font-normal">{comparisons}</span></span>
        <span>Time: <span className="font-normal">{time.toFixed(2)} sec</span></span>
      </div>
      <Reorder.Group
        ref={containerRef}
        axis="x"
        values={items}
        onReorder={setItems}
        className={cn(
          "w-full lg:max-w-4xl flex items-end justify-center md:gap-2 gap-1 lg:gap-3 h-full ",
          {
            "items-center": displayMode === "numbers",
          }
        )}
      >
        {items.map((item) => (
          <Item
            key={`${arrayId}-${item}`}
            itemMaxHeight={itemMaxHeight}
            item={item}
            isActive={activeItems.includes(item)}
            isDone={doneItems.includes(item)}
            isTemp={tempItems.includes(item)}
          />
        ))}
      </Reorder.Group>
    </div>
  );
};
