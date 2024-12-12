"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NuevoMecanimosForType from "./NuevoMecanimosForType";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { Requisito } from "@/interfaces/requisito";
import { Title } from "@/components";
import { Dependencia } from "@/interfaces/dependencia";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";


const MainterGrid = ({
  clasificaciones,
  requisitosAvailable,
  dependencias,
}: {
  clasificaciones: DataClasificacion[];
  requisitosAvailable: Requisito[];
  dependencias: Dependencia[];
}) => {
  const [tiposDeCompra, setTiposDeCompra] =
    useState<DataClasificacion[]>(clasificaciones);

  return (
    <>
      <Title title={`Clasificación de la compra`} />
      <div className="mx-auto">
        <DataTable
          columns={columns}
          data={clasificaciones}
          requisitosAvailable={requisitosAvailable}
          dependencias={dependencias}
        ></DataTable>

        {/* <Table className="w-full border-collapse mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Compra</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiposDeCompra.map((tipo) => (
              <TableRow key={tipo.idClasificacion}>
                <TableCell>{tipo.nombre}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <NuevoMecanimosForType
                      selectedTipo={tipo}
                      tiposDeCompra={tiposDeCompra}
                      requisitosAvailable={requisitosAvailable}
                      dependencias={dependencias}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </>
  );
};

export default MainterGrid;
