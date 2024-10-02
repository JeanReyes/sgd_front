"use client"

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * ejemplo prefecto para agregar atributos cuando el componente chadcn no tiene interfaz, se debe crear una y extender
 * indicatorColor
 */

export default function ProgressPage() {


  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress <= 100) {
        setProgress((prev) => {
          return prev + 5;
        });
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center">
      <Progress value={progress} className="w-[60%]"  indicatorColor={cn({
        "bg-red-500": progress < 50,
        "bg-yellow-500": progress > 50 && progress < 80,
        "bg-green-500": progress > 80
      })}/>
    </div>
  );
}