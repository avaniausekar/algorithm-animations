import { useStore } from "../constants/storeState";
import { Button } from "../components/Button";

const displayModes = ["bars", "numbers"] as const;

export const DisplayModeSelector = () => {
  const {
    displayMode,
    setDisplayMode,
    size,
    setSize,
    isPlaying,
    setDoneItems,
  } = useStore();

  const handleDisplayModeChange = (mode: (typeof displayModes)[number]) => {
    if (mode !== displayMode) {
      setDoneItems([]);
      setDisplayMode(mode);

      if (mode === "numbers" && size > 20) {
        setSize(20);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <h3 className="font-medium text-lg">Display Mode:</h3>
      <div className="flex gap-2">
        {displayModes.map((mode) => (
          <Button
            key={mode}
            variant="ghost"
            className={`px-4 py-2 capitalize border-2 border-accent hover:bg-accent hover:text-background ${mode === displayMode ? "bg-accent text-black" : ""
              }`}
            onClick={() => handleDisplayModeChange(mode)}
            disabled={isPlaying}
          >
            {mode}
          </Button>
        ))}
      </div>
    </div>
  );
};
