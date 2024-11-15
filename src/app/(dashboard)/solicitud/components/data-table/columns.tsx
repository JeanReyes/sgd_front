"use client";

import { ColumnDef, FilterFn, Row, SortDirection } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { deleteMoney } from "@/actions/mainteiner/moneda/actions";
import { useRouter } from "next/navigation";
import { Money } from "@/interfaces/money";
import { AiOutlineClose } from "react-icons/ai";
import { UpdateMoneyGrid } from "@/app/(dashboard)/mainteiner/money/components/UpdateMoneyGrid";
import { Solicitud } from "@/interfaces/solicitud";
import { Badge, BadgeProps } from "@/components/ui/badge";

const myCustomFilterFn: FilterFn<Solicitud> = (
  row: Row<Solicitud>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.cod} ${row.original.estado} ${row.original.cargoCreador}`.toLowerCase();
  return filterParts.every((part) => rowValues.includes(part));

  //esto es cada campo por separado
  // if (row.original.email.includes(filterValue)) {
  //   return true
  // }

  // if (row.original.clientName.includes(filterValue)) {
  //   return true;
  // }

  // if (row.original.status.includes(filterValue)) {
  //   return true;
  // }
  return false;
};


const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4"/>
  }

  if (isSorted === 'desc') {
    return <ChevronDownIcon className="h-4 w-4" />;
  }

  return null;
};
 

export const columns: ColumnDef<Solicitud>[] = [
  {
    accessorKey: "cod",
    header: () => <div className="text-left">cod</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("cod")}</div>;
    },
  },
  {
    accessorKey: "estado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      type StatusKey = keyof typeof map;
      const map = {
        Ingresada: "success",
        Pendiente: "destructive",
      };

      const status = row.getValue("estado") as StatusKey;

      return (
        <Badge variant={map[status] as BadgeProps["variant"]}>{status}</Badge>
      );
    },
  },
  {
    accessorKey: "cargoCreador",
    header: () => <div className="text-left">Creador</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("cargoCreador")}</div>;
    },
    filterFn: myCustomFilterFn,
  },
  {
    accessorKey: "materia",
    header: () => <div className="text-left">Materia</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const solicitud = row.original;
      const router = useRouter();
      const [dialogOpen, setDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                ver
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent className="w-[95%]">
              <AlertDialogHeader>
                <div className="flex justify-between items-center">
                  <AlertDialogTitle>Solicitud</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <div>
                  {/* <UpdateMoneyGrid
                    money={money}
                    setDialogOpen={setDialogOpen}
                  /> */}
                  <pre className=" overflow-x-auto">
                    {JSON.stringify(solicitud, null, 2)}
                  </pre>
                </div>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
