import { useStore } from "../constants/storeState";
import { Button } from "../components/Button";
import { sizesMap } from "../constants/sizes";

export const SizeSelector = () => {
  const {
    size: activeSize,
    setSize,
    setDoneItems,
    isPlaying,
    displayMode,
  } = useStore();

  const handleSizeChange = (size: number) => {
    if (size !== activeSize) {
      setDoneItems([]);
      setSize(size);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <h3 className="font-medium text-lg">Array Size:</h3>
      <div className="flex gap-2">
        {Object.entries(sizesMap).map(([size, label]) => (
          <Button
            key={size}
            variant="ghost"
            className={`px-4 py-2 text-base capitalize border-2 border-accent hover:bg-accent hover:text-background ${
              Number(size) === activeSize ? "bg-accent text-black" : ""
            }`}
            onClick={() => handleSizeChange(Number(size))}
            disabled={isPlaying || (displayMode === "numbers" && Number(size) > 20)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};