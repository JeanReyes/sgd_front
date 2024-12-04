"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { AiOutlineClose } from "react-icons/ai";
import { NewMecanimosSteps } from "./NewMecanimosSteps";
import { Requisito } from "@/interfaces/requisito";
import { Dependencia } from "@/interfaces/dependencia";

interface Props {
  tiposDeCompra: DataClasificacion[];
  selectedTipo: DataClasificacion;
  requisitosAvailable: Requisito[];
  dependencias: Dependencia[];
  setTiposDeCompra: (tiposDeCompra: DataClasificacion[]) => void;
}

export interface NewMecanismo {
  detail: {
    nombreMecanismo: string;
    rangoMin: string;
    rangoMax: string;
  };
  requisitos: Requisito[];
  ruta: Dependencia[];
}

export default function NuevoMecanimosForType({
  tiposDeCompra,
  selectedTipo,
  requisitosAvailable,
  dependencias,
  setTiposDeCompra,
}: Props) {
  const [dialogOpen, seDialogOpen] = useState(false);
  const [dataMecanismo, setDataMecanismo] = useState<NewMecanismo>((): NewMecanismo => {
    const defaultData = {requisitos: [], ruta: []};
    if (selectedTipo.mecanismosCompra.length > 0) {
      const ultimoMecanismo = selectedTipo.mecanismosCompra[selectedTipo.mecanismosCompra.length - 1];
      return {
        ...defaultData,
        detail: {
          nombreMecanismo: "",
          rangoMin: String(Number(ultimoMecanismo.montoMaximo) + 1),
          rangoMax: "",
        },
      };
    } else {
      return {
        ...defaultData,
        detail: {
          nombreMecanismo: "",
          rangoMin: "0",
          rangoMax: "",
        },
      }; 
    }
  });

  const selectedTipoId = selectedTipo.idClasificacion;
  const hasMecanismo =
    tiposDeCompra.filter((tipo) => tipo.idClasificacion === selectedTipoId)?.[0]
      ?.mecanismosCompra.length > 0;

  return (
    <div className="w-full">
      <div className="flex ">
        <Button onClick={() => seDialogOpen(true)}>Agregar</Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={seDialogOpen}>
        <AlertDialogContent className="md:min-w-[1200px] w-[95%] max-h-[90vh] overflow-y-auto p-4  md:w-auto">
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle className="text-2xl">
                {selectedTipo.nombre}
              </AlertDialogTitle>
              <AlertDialogCancel>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <div className="flex flex-col ">
            <NewMecanimosSteps
              dataMecanismo={dataMecanismo}
              tiposDeCompra={tiposDeCompra}
              selectedTipo={selectedTipo}
              requisitosAvailable={requisitosAvailable}
              dependencias={dependencias}
              setDataMecanismo={setDataMecanismo}
              setTiposDeCompra={setTiposDeCompra}
            />

            <div className="mb-8">
              <h3 className=" font-bold mb-4">Mecanismos de Compra</h3>
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Mecanismo</TableHead>
                    <TableHead>Monto Mínimo</TableHead>
                    <TableHead>Monto Máximo</TableHead>
                    <TableHead>Requisitos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasMecanismo ? (
                    tiposDeCompra
                      .find((tipo) => tipo.idClasificacion === selectedTipoId)
                      ?.mecanismosCompra.map((mecanismo) => (
                        <TableRow key={mecanismo.idMecanismo}>
                          <TableCell>{mecanismo.nombre}</TableCell>
                          <TableCell>{mecanismo.montoMinimo}</TableCell>
                          <TableCell>{mecanismo.montoMaximo}</TableCell>
                          <TableCell>
                            {mecanismo.requisitos
                              .map((r) => r.nombre)
                              .join(", ")}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No hay mecanismos de compra para este tipo
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
