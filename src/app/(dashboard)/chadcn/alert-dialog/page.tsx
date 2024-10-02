"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";


export default function AlertDialogPage() {

  const [dialogOpen, seDialogOpen] = useState(false)

  return (
    <div className="grid grid-cols-5 gap-3">
      <AlertDialog
        open={dialogOpen}
        // onOpenChange={(open) => console.log({ open })}
        onOpenChange={seDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button variant="success">Show Dialog</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <Button variant={"secondary"}>
                <Link href={"/chadcn/button"}>ir a button</Link>
              </Button>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => console.log("cancel")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log("continuar")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button onClick={() => seDialogOpen(true)} variant={"secondary"}>
        Open
      </Button>
    </div>
  );
}