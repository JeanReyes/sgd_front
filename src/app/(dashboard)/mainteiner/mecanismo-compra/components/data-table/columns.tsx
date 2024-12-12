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

import { ChevronDownIcon, ChevronUpIcon, CopyIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { UpdateMecanismoGrid } from "../UpdateMecanismoGrid";
import { deleteUnidad } from "@/actions/mainteiner/unidad/actions";
import { Unidad } from "../../../../../../interfaces/unidad";
import { MecanismoCompra } from "../../../../../../interfaces/mecanismo-compra";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { FaRegEdit } from "react-icons/fa";

const myCustomFilterFn: FilterFn<MecanismoCompra> = (
  row: Row<MecanismoCompra>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    `${row.original.nombre}`.toLowerCase();
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
 

export const columns: ColumnDef<MecanismoCompra>[] = [
  {
    accessorKey: "nombre",
    header: () => <div className="text-left">Nombre</div>,
    cell: ({ row }) => {
      const [openDetail, setOpenDetail] = useState(false);
      return (
        <>
          <div
            className="cursor-pointer font-medium"
            onClick={() => setOpenDetail(true)}
          >
            {row.getValue("nombre")}
          </div>

          <Dialog open={openDetail} onOpenChange={setOpenDetail}>
            <DialogContent className="sm:max-w-md w-[95%]">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {" "}
                  {row.getValue("nombre")}
                </DialogTitle>
              </DialogHeader>
              {/* Sección de requisitos */}
              <div className="space-y-4 text-pretty">
                <h3 className=" font-semibold">Requisitos:</h3>
                <ul className="space-y-2 pl-4 list-disc">
                  {row.original.requisitos.map((requisito) => (
                    <li
                      key={requisito.idRequisito}
                      className="flex justify-between"
                    >
                      <span>- {requisito.nombre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "montoMinimo",
    header: () => <div className="text-left">Monto minimo</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("montoMinimo")}</div>;
    },
  },
  {
    accessorKey: "montoMaximo",
    header: () => <div className="text-left">Monto maximo</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("montoMaximo")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mecanismo = row.original;
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
              <DropdownMenuLabel>Aciones</DropdownMenuLabel>
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
                <div className="flex justify-between">
                  <AlertDialogTitle>Actualice la Mecanismo</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <div>
                  <UpdateMecanismoGrid
                    mecanismoCompra={mecanismo}
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
                  <AlertDialogTitle>Eliminar Mecanismo</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
                <AlertDialogDescription>
                  ¿Seguro quieres eliminar este Mecanismo?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                // onClick={() => {
                //   deleteUnidad(+mecanismo.idMecanismo);
                //   router.refresh();
                // }}
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
