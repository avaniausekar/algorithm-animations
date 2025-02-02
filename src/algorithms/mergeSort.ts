import { StoreState, useStore } from "../constants/storeState";
import { sleep } from "./helper";

type SortConfig = Pick<
  StoreState,
  | "setItems"
  | "setActiveItems"
  | "setTempItems"
  | "setDoneItems"
  | "speedRef"
  | "abortRef"
  | "setSwaps"
  | "setComparisons"
  | "setTime"
>;

const merge = async (
  leftArr: number[],
  rightArr: number[],
  config: SortConfig,
  swaps: { count: number },
  comparisons: { count: number }
): Promise<number[] | null> => {
  const { setItems, setActiveItems, speedRef, abortRef, setTempItems, setComparisons, setSwaps } = config;
  const sortedArray: number[] = [];
  setActiveItems([...leftArr, ...rightArr]);
  await sleep(speedRef.current);

  while (leftArr.length || rightArr.length) {
    if (abortRef.current) {
      setActiveItems([]);
      setTempItems([]);
      return null;
    }

    if (leftArr.length && rightArr.length) {
      setComparisons(comparisons.count++); // Real-time comparisons update
      if (leftArr[0] < rightArr[0]) {
        sortedArray.push(leftArr.shift()!);
      } else {
        sortedArray.push(rightArr.shift()!);
        swaps.count++; // Track swap in mutable object
        setSwaps(swaps.count); // Update 
      }
    } else if (leftArr.length) {
      sortedArray.push(leftArr.shift()!);
    } else {
      sortedArray.push(rightArr.shift()!);
    }

    setTempItems([...sortedArray]);
    setActiveItems([...leftArr, ...rightArr]);
    setItems((prev) => {
      const sortedSubArray = [...sortedArray, ...leftArr, ...rightArr];
      const index = prev.findIndex((item) => sortedSubArray.includes(item));
      return [
        ...prev.slice(0, index),
        ...sortedSubArray,
        ...prev.slice(index + sortedSubArray.length),
      ];
    });
    await sleep(speedRef.current);
  }

  setActiveItems([]);
  setTempItems([]);
  return sortedArray;
};

const mergeSort = async (
  arr: number[],
  config: SortConfig,
  swaps: { count: number },
  comparisons: { count: number }
): Promise<number[] | null> => {
  if (config.abortRef.current) {
    config.setActiveItems([]);
    config.setTempItems([]);
    return null;
  }

  if (arr.length <= 1) return arr;

  const middleIndex = Math.floor(arr.length / 2);
  const leftArr = await mergeSort(arr.slice(0, middleIndex), config, swaps, comparisons);
  const rightArr = await mergeSort(arr.slice(middleIndex), config, swaps, comparisons);

  if (leftArr === null || rightArr === null) {
    config.setActiveItems([]);
    config.setTempItems([]);
    return null;
  }

  return await merge(leftArr, rightArr, config, swaps, comparisons);
};

export const useMergeSort = () => {
  const {
    items,
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
    abortRef,
    setSwaps,
    setComparisons,
    setTime,
  } = useStore();

  const config: SortConfig = {
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
    abortRef,
    setSwaps,
    setComparisons,
    setTime,
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

    const sortedArray = await mergeSort([...items], config, swaps, comparisons);
    stopInterval();

    if (sortedArray !== null && !abortRef.current) {
      setItems(sortedArray);
      setDoneItems(sortedArray);
    }
    setActiveItems([]);
    setTime((performance.now() - startTime) / 1000);
    setSwaps(swaps.count);

    if (abortRef.current) {
      abortRef.current = false;
    }
  };

  return sort;
};
