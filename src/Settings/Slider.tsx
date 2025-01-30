import { useStore } from "../constants/storeState";
import { Slider } from "../components/Slider";

export const SpeedSlider = () => {
  const { speedRef } = useStore();

  const handleSpeedChange = (value: number[]) => {
    speedRef.current = 2000 - value[0];
  };

  return (
    <div className="flex gap-4 text-foreground w-full">
      <h3 className="font-medium text-lg">Speed</h3>
      <Slider
        defaultValue={[1500]}
        min={1000}
        max={2000}
        step={1}
        onValueChange={handleSpeedChange}
      />
    </div>
  );
};
