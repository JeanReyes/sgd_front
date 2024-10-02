"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useRouter } from "next/navigation";


export default function ContextPage() {

  const router = useRouter()

  return (
    <div className="flex">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center border dark:border-gray-950 rounded-md">Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => router.back()}>Back</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}