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

import { ChevronDownIcon, ChevronUpIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { UpdateRequisitoGrid } from "../UpdaterequisitoGrid";
import { Requisito } from '../../../../../../interfaces/requisito';
import { deleteRequisito } from "@/actions/mainteiner/requisito/actions";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { FaRegEdit } from "react-icons/fa";

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
};

export const columns: ColumnDef<Requisito>[] = [
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
    accessorKey: "obligatorio",
    header: () => <div className="text-left">Obligatorio</div>,
    cell: ({ row }) => {
      type StatusKey = keyof typeof map;
      const map = {
        true: "success",
        false: "destructive",
      };

      const status = row.getValue("obligatorio") as StatusKey;
      const isTrue = status === "true" ? 'si' : 'no';

      return (
        <Badge variant={map[status] as BadgeProps["variant"]}>{isTrue}</Badge>
      );
    },
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
                    requisito={requisito}
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
                    deleteRequisito(+requisito.id!);
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
