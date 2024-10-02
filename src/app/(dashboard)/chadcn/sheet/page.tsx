"use client"

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
type SheetSide = (typeof SHEET_SIDES)[number];

export default function SheetPage() {

   const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}