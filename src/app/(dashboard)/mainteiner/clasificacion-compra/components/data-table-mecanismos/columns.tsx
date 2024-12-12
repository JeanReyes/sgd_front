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
import { deleteUnidad } from "@/actions/mainteiner/unidad/actions";
import { Unidad } from "../../../../../../interfaces/unidad";
import { MecanismoCompra, RutaResume } from "@/interfaces/mecanismo-compra";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { UpdMecanismoSteps } from "./UpdMecanismoSteps";
import { FaRegEdit } from "react-icons/fa";
import { Dependencia } from "@/interfaces/dependencia";

const myCustomFilterFn: FilterFn<MecanismoCompra> = (
  row: Row<MecanismoCompra>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    ` ${row.original.nombre}`.toLowerCase();
  return filterParts.every((part) => rowValues.includes(part));

};

export const columns: ColumnDef<MecanismoCompra>[] = [
  {
    accessorKey: "nombre",
    header: () => <div className="text-left">Nombre</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("nombre")}</div>;
    },
  },
  {
    accessorKey: "montoMinimo",
    header: () => <div className="text-left">monto Minimo</div>,
  },
  {
    accessorKey: "montoMaximo",
    header: () => <div className="text-left">monto Maximo</div>,
  },
  {
    accessorKey: "requisitos",
    header: () => <div className="text-left">Requisitos</div>,
    cell: ({ row }) => {
      const requisitos = row.original.requisitos;
      const BadgeRequisitos = ({ name }: { name: string }) => {
        return (
          <Badge variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" aria-hidden="true" />
            {name}
          </Badge>
        );
      };
      return (
        <>
          {requisitos.map((requisito) => (
            <BadgeRequisitos key={requisito.id} name={requisito.nombre} />
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "ruta",
    header: () => <div className="text-left">Ruta</div>,
    cell: ({ row }) => {
      const rutas = row.original.rutas as Dependencia[];
      const BadgeRequisitos = ({
        dependencia,
        index,
      }: {
        dependencia: Dependencia;
        index: number;
      }) => {
        return (
          <Badge variant="outline" className="flex items-center gap-2">
            {index + 1}-{dependencia.nombre}
          </Badge>
        );
      };
      return (
        <>
          {rutas.map((ruta: Dependencia, index) => (
            <BadgeRequisitos key={ruta.id} dependencia={ruta} index={index} />
          ))}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const mecanismo = row.original;
      const allRows = table.getRowModel().rows.map((r) => r.original);
      const requisitosAvailable =table.options.meta?.requisitosAvailable || [];
      const dependencias = table.options.meta?.dependencias || [];
      const selectedtipo = table.options.meta?.selectedtipo;
      const [dialogOpen, setDialogOpen] = useState(false);

      return (
        <>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <FaRegEdit />
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
            </DropdownMenuContent>
          </DropdownMenu> */}

          <UpdMecanismoSteps
            mecanismo={row.original}
            allMecanismos={allRows}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            requisitosAvailable={requisitosAvailable}
            dependencias={dependencias}
            selectedtipo={selectedtipo}
          />
        </>
      );
    },
  },
];
