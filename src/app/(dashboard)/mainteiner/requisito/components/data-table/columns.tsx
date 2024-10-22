"use client";

import { ColumnDef, FilterFn, Row, SortDirection } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { UpdateRequisitoGrid } from "../UpdaterequisitoGrid";
import { deleteUnidad } from "@/actions/mainteiner/unidad/actions";
import { Unidad } from "../../../../../../interfaces/unidad";
import { Requisito } from '../../../../../../interfaces/requisito';

const myCustomFilterFn: FilterFn<Requisito> = (
  row: Row<Requisito>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.descripcion} ${row.original.nombre}`.toLowerCase();
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
 

export const columns: ColumnDef<Unidad>[] = [
  {
    accessorKey: "nombre",
    header: () => <div className="text-left">Nombre</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("nombre")}</div>;
    },
  },
  {
    accessorKey: "descripcion",
    header: () => <div className="text-left">Descripción</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const requisito = row.original;
      const router = useRouter();
      const [dialogOpen, setDialogOpen] = useState(false);
      const [deleteItem, setDeleteItem] = useState(false);

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
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteItem(true);
                }}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex justify-between">
                  <AlertDialogTitle>Actualice el Requisito</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <div>
                  <UpdateRequisitoGrid
                    unidad={requisito}
                    setDialogOpen={setDialogOpen}
                  />
                </div>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={deleteItem} onOpenChange={setDeleteItem}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex justify-between">
                  <AlertDialogTitle>Eliminar el Requisito</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <AlertDialogDescription>
                  ¿Seguro quieres eliminar este Requisito?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteUnidad(requisito.id);
                    router.refresh();
                  }}
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
