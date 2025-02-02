import { StoreState, useStore } from "../constants/storeState";
import { sleep, swap } from "./helper";

const bubble = async ({
  arr,
  setItems,
  setActiveItems,
  setDoneItems,
  speedRef,
  abortRef,
  setSwaps,
  setComparisons,
  setTime,
}: Pick<
  StoreState,
  "abortRef" | "speedRef" | "setItems" | "setActiveItems" | "setDoneItems" | "setSwaps" | "setComparisons" | "setTime"
> & { arr: number[] }) => {
  const len = arr.length;
  let swaps = 0;
  let comparisons = 0;
  const startTime = performance.now();

  let interval: ReturnType<typeof setInterval>;
  const startInterval = () => {
    interval = setInterval(() => {
      setTime(((performance.now() - startTime) / 1000)); // Update tim
    }, 100);
  };

  const stopInterval = () => {
    clearInterval(interval);
  };

  startInterval();

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (abortRef.current) {
        stopInterval(); // Clear 
        return;
      }

      setActiveItems([arr[j], arr[j + 1]]);
      await sleep(speedRef.current);

      comparisons++;
      setComparisons(comparisons);

      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swaps++;
        setSwaps(swaps);
        setItems([...arr]);
      }
    }
    setDoneItems((prev) => [...prev, arr[arr.length - 1 - i]]);
  }

  stopInterval();
  setTime(((performance.now() - startTime) / 1000)); // Set final time after sorting
};

export const useBubbleSort = () => {
  const { items, setItems, setActiveItems, setDoneItems, speedRef, abortRef, setSwaps, setComparisons, setTime } = useStore();

  const sort = async () => {
    const result = [...items];
    setSwaps(0);
    setComparisons(0);
    setTime(0);

    await bubble({
      arr: result,
      setItems,
      setActiveItems,
      setDoneItems,
      speedRef,
      abortRef,
      setSwaps,
      setComparisons,
      setTime,
    });

    if (abortRef.current) {
      setActiveItems([]);
      setDoneItems([]);
      abortRef.current = false;
      return;
    }
    setDoneItems([...result]);
    setActiveItems([]);
  };

  return sort;
};
