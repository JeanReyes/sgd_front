"use client";

import { ColumnDef, FilterFn, Row, SortDirection } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import NuevoMecanimosForType from "../NuevoMecanimosForType";

const myCustomFilterFn: FilterFn<DataClasificacion> = (
  row: Row<DataClasificacion>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  filterValue = filterValue.toLowerCase();

  const filterParts = filterValue.split(" ");
  const rowValues =
    ` ${row.original.nombre} ${row.original.descripcion}`.toLowerCase();
  return filterParts.every((part) => rowValues.includes(part));
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
 

export const columns: ColumnDef<DataClasificacion>[] = [
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
    cell: ({ row, table }) => {
      const clasificacion = row.original;
      const requisitosAvailable = table.options.meta?.requisitosAvailable || [];
      const dependencias = table.options.meta?.dependencias || [];
      const allRows = table.getRowModel().rows.map((r) => r.original);

      return (
        <>
          <NuevoMecanimosForType
            selectedTipo={clasificacion}
            tiposDeCompra={allRows}
            requisitosAvailable={requisitosAvailable}
            dependencias={dependencias}
          />
        </>
      );
    },
  },
];
