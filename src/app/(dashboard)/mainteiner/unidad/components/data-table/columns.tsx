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
import { Unidad } from "../../../../../../interfaces/unidad";
import { UpdateUnidadGrid } from "../UpdateUnidadGrid";
import { deleteUnidad } from "@/actions/mainteiner/unidad/actions";
import { FaRegEdit } from "react-icons/fa";

const myCustomFilterFn: FilterFn<Unidad> = (
  row: Row<Unidad>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues = `${row.original.descripcion} ${row.original.nombre}`.toLowerCase();
  return filterParts.every((part) => rowValues.includes(part));
};


export const columns: ColumnDef<Unidad>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">id</div>,
  },
  {
    accessorKey: "nombre",
    header: () => <div className="text-left">Nombre</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("nombre")}</div>;
    },
    filterFn: myCustomFilterFn,
  },
  {
    accessorKey: "descripcion",
    header: () => <div className="text-left">Descripción</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unidad = row.original;
      const router = useRouter();
      const [dialogOpen, setDialogOpen] = useState(false);
      const [deleteItem, setDeleteItem] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <FaRegEdit />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
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
            <AlertDialogContent className="w-[95%]">
              <AlertDialogHeader>
                <div className="flex justify-between items-center">
                  <AlertDialogTitle>Actualice la unidad</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <div>
                  <UpdateUnidadGrid
                    unidad={unidad}
                    setDialogOpen={setDialogOpen}
                  />
                </div>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={deleteItem} onOpenChange={setDeleteItem}>
            <AlertDialogContent className="w-[95%]">
              <AlertDialogHeader>
                <div className="flex justify-between items-center">
                  <AlertDialogTitle>Eliminar la unidad</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <AlertDialogDescription>
                  ¿Seguro quieres eliminar esta unidad?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteUnidad(unidad.id);
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
