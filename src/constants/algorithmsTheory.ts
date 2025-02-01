import type { Algorithm } from "./algoTypes";

type AlgorithmDetails = {
  title: string;
  longDescription: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
};

export const sortingAlgorithms: Record<Algorithm, AlgorithmDetails> = {
  selection: {
    title: "Selection Sort",
    longDescription:
      "Selection Sort is a basic algorithm that works by repeatedly selecting the smallest unsorted element and moving it to the sorted portion of the list. It’s simple and minimizes swaps, which is beneficial when memory writes are costly. However, with an O(n²) time complexity, it becomes inefficient on larger datasets or nearly sorted arrays, making it more suitable for small collections.",
    
      timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  insertion: {
    title: "Insertion Sort",
    longDescription:
      "Insertion Sort is a simple algorithm that builds a sorted array one element at a time. It’s efficient on small or nearly sorted datasets, achieving a best-case O(n) time complexity. However, its O(n²) complexity in average and worst cases makes it less suitable for large, random datasets. The algorithm iteratively places each item into its proper place within the sorted portion of the array.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  bubble: {
    title: "Bubble Sort",
    longDescription:
      "",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  quick: {
    title: "Quick Sort",
    longDescription:
      "Quick Sort is a highly efficient sorting algorithm that works by partitioning an array around a pivot and recursively sorting the sub-arrays. It typically achieves O(n log n) time complexity, making it very fast in practice. However, if the pivot choice is poor, it can degrade to O(n²). Despite this, Quick Sort is widely used due to its superior average performance and minimal memory usage.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },
  merge: {
    title: "Merge Sort",
    longDescription:
      "Merge Sort is a stable and reliable sorting algorithm that divides the array into smaller sub-arrays, sorts them, and then merges them back together. Its time complexity is O(n log n) in all cases, making it suitable for large datasets. However, its need for additional memory during the merging process can be a limitation in resource-constrained environments.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
  },
  heap: {
    title: "Heap Sort",
    longDescription:
      "Merge Sort is a stable and reliable sorting algorithm that divides the array into smaller sub-arrays, sorts them, and then merges them back together. Its time complexity is O(n log n) in all cases, making it suitable for large datasets. However, its need for additional memory during the merging process can be a limitation in resource-constrained environments.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
  },
};
