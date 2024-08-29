"use client"
import { Button } from "@/components/ui/button";


export default function ButtonPage() {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Button>default</Button>
      <Button onClick={() => console.log("wena")} variant={"destructive"}>destructive</Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"link"}>link</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button disabled>disabled</Button>
      <Button variant={'success'}>disabled</Button>
    </div>
  );
}