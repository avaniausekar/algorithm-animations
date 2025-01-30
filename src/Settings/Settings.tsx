import { DisplayModeSelector } from "./DisplayMode";
import { SizeSelector } from "./SelectSize";
import { Controls } from "./Controls";
import { SpeedSlider } from "./Slider";
export const Settings = () => {
  return (
    <>
      <div className="flex items-center gap-10 mt-2">
        <SizeSelector />
        <DisplayModeSelector />
        <Controls />
      </div>
      <div className="flex items-center mt-3">
        <SpeedSlider />
      </div></>
  );
};
