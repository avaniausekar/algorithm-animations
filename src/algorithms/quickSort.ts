import { StoreState, useStore } from "../constants/storeState";
import { markAsDone, sleep, swap } from "./helper";

type SortConfig = Pick<
  StoreState,
  | "setItems"
  | "setActiveItems"
  | "setTempItems"
  | "setDoneItems"
  | "setSwaps"
  | "setComparisons"
  | "setTime"
  | "speedRef"
  | "abortRef"
>;

const partition = async (
  arr: number[],
  left: number,
  right: number,
  config: SortConfig,
  startTime: number,
  swaps: number,
  comparisons: number
): Promise<[number, number, number] | null> => {
  const {
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    setSwaps,
    setComparisons,
    setTime,
    speedRef,
    abortRef,
  } = config;

  if (abortRef.current) return null; // Stop if abortRef is set

  const pivotValue = arr[right];
  let pivotIndex = left;

  let interval: ReturnType<typeof setInterval>;

  const startInterval = () => {
    interval = setInterval(() => {
      setTime((performance.now() - startTime) / 1000);
    }, 100);
  };

  const stopInterval = () => {
    clearInterval(interval);
  };

  startInterval(); // Start the real-time time updates

  for (let i = left; i < right; i++) {
    if (abortRef.current) {
      stopInterval(); // Stop the interval if sorting is aborted
      return null;
    }
    setActiveItems([arr[i], pivotValue]);
    await sleep(speedRef.current);

    comparisons++;
    setComparisons(comparisons);

    if (arr[i] < pivotValue) {
      swap(arr, i, pivotIndex);
      pivotIndex++;
      swaps++;
      setSwaps(swaps);
      setTempItems([...arr.slice(left, pivotIndex)]);
      setItems([...arr]);
    }
  }

  swap(arr, pivotIndex, right);
  swaps++;
  setSwaps(swaps);
  setItems([...arr]);
  setTempItems([]);
  markAsDone(arr[pivotIndex], setDoneItems); // Mark the pivot as done

  stopInterval();

  return [pivotIndex, swaps, comparisons]; // Return the updated swaps and comparisons
};

const sort = async (
  arr: number[],
  left: number,
  right: number,
  config: SortConfig,
  startTime: number,
  swaps: number,
  comparisons: number
): Promise<[number, number] | null> => {
  if (left < right) {
    const partitionResult = await partition(
      arr,
      left,
      right,
      config,
      startTime,
      swaps,
      comparisons
    );

    if (partitionResult === null) {
      config.setActiveItems([]); // Ensure active items are cleared
      return null; // Return null if partition was aborted
    }

    const [partitionIndex, newSwaps, newComparisons] = partitionResult;

    // Recurse on the two halves
    const leftResult = await sort(arr, left, partitionIndex - 1, config, startTime, newSwaps, newComparisons);
    const rightResult = await sort(arr, partitionIndex + 1, right, config, startTime, newSwaps, newComparisons);

    // Return the final values after recursion
    if (leftResult && rightResult) {
      const [leftSwaps, leftComparisons] = leftResult;
      const [rightSwaps, rightComparisons] = rightResult;

      // Return final updated swaps and comparisons
      return [Math.max(leftSwaps, rightSwaps), Math.max(leftComparisons, rightComparisons)];
    }
  } else if (left === right) {
    markAsDone(arr[left], config.setDoneItems);
  }

  if (left === 0 && right === arr.length - 1) {
    config.setActiveItems([]);
  }

  // Return final values
  return [swaps, comparisons];
};

export const useQuickSort = () => {
  const {
    items,
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    setSwaps,
    setComparisons,
    setTime,
    speedRef,
    abortRef,
  } = useStore();

  const config: SortConfig = {
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    setSwaps,
    setComparisons,
    setTime,
    speedRef,
    abortRef,
  };

  const handleSort = async () => {
    const startTime = performance.now(); // Start timing the whole sort

    // Initialize swaps and comparisons at the start
    let swaps = 0;
    let comparisons = 0;

    try {
      await sort([...items], 0, items.length - 1, config, startTime, swaps, comparisons);
    } finally {
      if (abortRef.current) {
        config.setDoneItems([]);
      }
      config.abortRef.current = false;
      config.setActiveItems([]);
      config.setTempItems([]);

      // Set final time after sorting is complete
      const endTime = performance.now();
      setTime(((endTime - startTime) / 1000));
    }
  };

  return handleSort;
};