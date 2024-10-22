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
import { UpdateUnidadGrid } from "../UpdateFuncionarioGrid";
import { deleteUnidad } from "@/actions/mainteiner/unidad/actions";
import { Funcionario } from "../../../../../../interfaces/funcionario";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { formatRUT } from "@/utils/rut-validate";
import { deleteFuncionario } from "@/actions/mainteiner/funcionario/actions";

const myCustomFilterFn: FilterFn<Funcionario> = (
  row: Row<Funcionario>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.apellidos} ${row.original.nombres} ${row.original.correo} ${row.original.rut}`.toLowerCase();
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


export const columns: ColumnDef<Funcionario>[] = [
  {
    accessorKey: "nombres",
    header: () => <div className="text-left">Nombres</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("nombres")}</div>;
    },
    filterFn: myCustomFilterFn,
  },
  {
    accessorKey: "apellidos",
    header: () => <div className="text-left">Apellidos</div>,
  },
  {
    accessorKey: "rut",
    header: () => <div className="text-left">Rut</div>,
    cell: ({ row }) => {
      const rut: string = formatRUT(row.getValue("rut"));

      return <div className="text-left">{rut}</div>;
    },
  },
  {
    accessorKey: "fechaNacimiento",
    header: () => <div className="text-left">Fecha de nacimiento</div>,
    cell: ({ row }) => {
      const fecha: string =
        row.getValue("fechaNacimiento") != "null"
          ? row.getValue("fechaNacimiento")
          : "";

      return <div className="text-left">{fecha}</div>;
    },
  },

  {
    accessorKey: "estado",
    header: () => <div className="text-left">Estado</div>,
    cell: ({ row }) => {
      type StatusKey = keyof typeof map;
      const map = {
        ACTIVO: "success",
        BLOQUEADO: "destructive",
      };

      const status = row.getValue("estado") as StatusKey;

      return (
        <Badge variant={map[status] as BadgeProps["variant"]}>{status}</Badge>
      );
    },
  },
  {
    accessorKey: "correo",
    header: () => <div className="text-left">Correo</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const funcionario = row.original;
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
            <AlertDialogContent className="w-[95%]">
              <AlertDialogHeader>
                <div className="flex justify-between items-center">
                  <AlertDialogTitle>Actualice un funcionario</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <div>
                  <UpdateUnidadGrid
                    funcionario={funcionario}
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
                  <AlertDialogTitle>Eliminar un funcionario</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <AlertDialogDescription>
                  ¿Seguro quieres eliminar este funcionario?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteFuncionario(+funcionario.id);
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
