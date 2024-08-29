"use client"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerPage() {


  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            position: 'top-center',
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Sonner
      </Button>
    </div>
  );
}