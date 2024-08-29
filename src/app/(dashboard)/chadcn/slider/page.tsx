"use client"

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SliderPage() {

  const [sliderValue, setSliderValue] = useState(10);
  const [rangeValue, setRangeValue] = useState([10,50]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <span>{sliderValue}</span>
      <Slider
        defaultValue={[sliderValue]}
        onValueChange={(value) => setSliderValue(value[0])}
        max={100}
        step={1}

      />
      <span>{rangeValue.join(",")}</span>
      <Slider
        defaultValue={rangeValue}
        onValueChange={setRangeValue}
        max={100}
        step={1}

      />
    </div>
  );
}