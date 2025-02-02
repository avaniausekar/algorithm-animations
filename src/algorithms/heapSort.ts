import { useStore } from "../constants/storeState";
import { sleep } from "./helper";

export const useHeapSort = () => {
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

  // Function to heapify a subtree rooted at index i
  const heapify = async (arr: number[], n: number, i: number, swaps: { count: number }, comparisons: { count: number }) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setActiveItems([arr[i], arr[left]]);
      await sleep(speedRef.current);
      comparisons.count++;
      setComparisons(comparisons.count);

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      setActiveItems([arr[largest], arr[right]]);
      await sleep(speedRef.current);
      comparisons.count++;
      setComparisons(comparisons.count);

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps.count++;
      setSwaps(swaps.count);
      setItems([...arr]);
      await sleep(speedRef.current);

      if (abortRef.current) return;

      await heapify(arr, n, largest, swaps, comparisons);
    }
    setActiveItems([]);
  };

  const heapSort = async (arr: number[], swaps: { count: number }, comparisons: { count: number }) => {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i, swaps, comparisons);
      if (abortRef.current) return;
    }

    setActiveItems([]);

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      swaps.count++;
      setSwaps(swaps.count);
      setItems([...arr]);
      setDoneItems((prev) => [...prev, arr[i]]);
      await sleep(speedRef.current);

      if (abortRef.current) return;

      await heapify(arr, i, 0, swaps, comparisons);
    }

    setDoneItems([...arr]);
  };

  const sort = async () => {
    let swaps = { count: 0 };
    let comparisons = { count: 0 };
    const startTime = performance.now();
    let interval: ReturnType<typeof setInterval>;

    const startInterval = () => {
      interval = setInterval(() => {
        setTime((performance.now() - startTime) / 1000);
      }, 100);
    };

    const stopInterval = () => {
      clearInterval(interval);
    };

    startInterval();

    await heapSort([...items], swaps, comparisons);
    stopInterval();

    setActiveItems([]);
    setTime((performance.now() - startTime) / 1000);

    if (abortRef.current) {
      abortRef.current = false;
    }
  };

  return sort;
};
