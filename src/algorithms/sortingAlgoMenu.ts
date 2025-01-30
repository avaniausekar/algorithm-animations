import { useBubbleSort } from "./bubbleSort";
import { useInsertionSort } from "./insertionSort";
import { useMergeSort } from "./mergeSort";
import { useQuickSort } from "./quickSort";
import { useSelectionSort } from "./selectionSort";
import { useHeapSort } from "./heapSort";

export const useSortingAlgorithms = () => {
  const selectionSort = useSelectionSort();
  const bubbleSort = useBubbleSort();
  const quickSort = useQuickSort();
  const insertionSort = useInsertionSort();
  const mergeSort = useMergeSort();
  const heapSort = useHeapSort();

  return { selectionSort, bubbleSort, quickSort, insertionSort, mergeSort,heapSort };
};
