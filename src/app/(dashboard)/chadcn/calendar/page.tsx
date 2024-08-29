"use client"

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarPage() {

  const [date, setDate] = useState<Date | undefined>(new Date());

  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([]);

  const smallDate = date?.toLocaleDateString("es-Es", {
    weekday: "short",
    day: "numeric",
    month: "short"
  })

  const smallMultipleDate = multipleDates?.map((date) =>
    date?.toLocaleDateString("es-Es", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  );

  return (
    <div className="flex gap-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      />

      <Calendar
        mode="multiple"
        selected={multipleDates}
        onSelect={setMultipleDates}
        className="rounded-md border"
      />

      <div>
        <h1 className="text-3xl">Información</h1>
        <div className="border-b"></div>
        <p>{smallDate}</p>
        <p>{smallMultipleDate}</p>
      </div>
    </div>
  );
}