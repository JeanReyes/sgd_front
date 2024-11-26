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
import DialogMecanismo from "./DialogMecanismo";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";

const MainterGrid = ( { clasificaciones }: { clasificaciones: DataClasificacion[] }) => {
  const [tiposDeCompra, setTiposDeCompra] =
    useState<DataClasificacion[]>(clasificaciones);

  return (
    <div className="mx-auto">
      {/* Tabla para mostrar los tipos de compra */}
      <Table className="w-full border-collapse mb-8">
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
                  <DialogMecanismo
                    selectedTipo={tipo}
                    tiposDeCompra={tiposDeCompra}
                    setTiposDeCompra={setTiposDeCompra}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MainterGrid;
