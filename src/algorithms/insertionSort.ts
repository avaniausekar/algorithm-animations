import { useStore } from "../constants/storeState";
import { sleep, swap } from "./helper";

export const useInsertionSort = () => {
  const {
    setItems,
    setActiveItems,
    items,
    setDoneItems,
    speedRef,
    setTempItems,
    abortRef,
    setSwaps,
    setComparisons,
    setTime,
  } = useStore();

  const insertionSort = async () => {
    const arr = [...items];
    setTempItems([arr[0]]);
    let swaps = 0;
    let comparisons = 0;
    const startTime = performance.now();
    let interval: ReturnType<typeof setInterval>;

    const startInterval = () => {
      interval = setInterval(() => {
        setTime(((performance.now() - startTime) / 1000)); // Update time in seconds
      }, 100);
    };

    const stopInterval = () => {
      clearInterval(interval);
    };

    startInterval();

    for (let i = 1; i < arr.length; i++) {
      if (abortRef.current) break; // Check if animation should stop
      const current = arr[i];
      const subArr = arr.slice(0, i);

      for (let j = subArr.length - 1; j >= 0; j--) {
        if (abortRef.current) break; // Check if animation should stop
        const compared = subArr[j];

        setActiveItems([current, compared]);
        await sleep(speedRef.current);
        comparisons++;
        setComparisons(comparisons);

        if (compared > current) {
          swap(arr, j, j + 1);
          setItems([...arr]);
          setTempItems((prev) => [...prev, current]);
          swaps++;
          setSwaps(swaps);
        } else {
          break;
        }
      }
      setTempItems((prev) => [...prev, current]);
    }

    stopInterval();
    setTime((performance.now() - startTime) / 1000);

    setActiveItems([]);
    setTempItems([]);
    if (abortRef.current) {
      setDoneItems([]);
      abortRef.current = false;
    } else {
      setDoneItems(arr);
    }
  };

  return insertionSort;
};
