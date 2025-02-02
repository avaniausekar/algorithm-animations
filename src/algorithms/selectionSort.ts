import { useStore } from "../constants/storeState";
import { sleep, swap } from "./helper";

export const useSelectionSort = () => {
  const {
    items,
    setItems,
    setActiveItems,
    setDoneItems,
    speedRef,
    abortRef,
    setSwaps,
    setComparisons,
    setTime,
  } = useStore();

  const sort = async () => {
    const result = [...items];
    let swaps = 0;
    let comparisons = 0;
    const startTime = performance.now();
    let interval: ReturnType<typeof setInterval>;

    const startInterval = () => {
      interval = setInterval(() => {
        setTime(((performance.now() - startTime) / 1000)); // Update time in seconds
      }, 100); // Update every 100ms
    };

    const stopInterval = () => {
      clearInterval(interval);
    };

    startInterval();

    const findMinIndex = async (
      arr: number[],
      start: number
    ): Promise<number> => {
      let minIndex = start;
      for (let i = start + 1; i < arr.length; i++) {
        if (abortRef.current) return -1; // Check if animation should stop
        setActiveItems([arr[i], arr[minIndex]]);
        await sleep(speedRef.current);
        comparisons++;
        setComparisons(comparisons);
        if (arr[i] < arr[minIndex]) {
          minIndex = i;
        }
      }
      return minIndex;
    };

    for (let i = 0; i < result.length - 1; i++) {
      const minIndex = await findMinIndex(result, i);
      if (minIndex === -1) {
        setActiveItems([]); // Clear active items
        setDoneItems([]);
        abortRef.current = false; // Reset abortRef
        stopInterval();
        return;
      } // Exit if animation should stop
      if (minIndex !== i) {
        swap(result, i, minIndex);
        swaps++;
        setSwaps(swaps);
      }
      setItems([...result]);
      setDoneItems((prev) => [...prev, result[i]]);
    }

    stopInterval();
    setTime((performance.now() - startTime) / 1000);
    setDoneItems((prev) => [...prev, result[result.length - 1]]);
    setActiveItems([]);
  };

  return sort;
};
