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
import { DataTable } from "./data-table-mecanismos/data-table";
import { columns } from "./data-table-mecanismos/columns";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  tiposDeCompra: DataClasificacion[];
  selectedTipo: DataClasificacion;
  requisitosAvailable: Requisito[];
  dependencias: Dependencia[];
}

export interface NewMecanismo {
  detail: {
    nombreMecanismo: string;
    rangoMin: string;
    rangoMax: string;
  };
  requisitos: Requisito[];
  rutas: Dependencia[];
}

export default function NuevoMecanimosForType({
  tiposDeCompra,
  selectedTipo,
  requisitosAvailable,
  dependencias
}: Props) {
  const [dialogOpen, seDialogOpen] = useState(false);
  const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  const [dataMecanismo, setDataMecanismo] = useState<NewMecanismo>((): NewMecanismo => {
    const defaultData = {requisitos: [], rutas: []};
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
        <Button onClick={() => seDialogOpen(true)}>Agregar Mecanismo</Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={seDialogOpen}>
        <AlertDialogContent className="md:min-w-[1200px] w-[95%] max-h-[90vh] overflow-y-auto p-4  md:w-auto">
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle className="text-2xl">
                {selectedTipo.nombre}
              </AlertDialogTitle>
              <div className="flex justify-end gap-2">
                <div className="flex justify-end">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={() => setDialogOpenAdd(true)}>
                          <IoMdAddCircleOutline />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Agregar nuevo mecanismo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <AlertDialogCancel>
                  <AiOutlineClose />
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogHeader>
          <div className="flex flex-col ">
            <div className="mb-8">
              <div className="flex justify-between">
                <h3 className=" font-bold mb-4">Mecanismos de Compra</h3>
              </div>

              <DataTable
                columns={columns}
                data={
                  tiposDeCompra.find(
                    (tipo) => tipo.idClasificacion === selectedTipoId
                  )?.mecanismosCompra!
                }
                requisitosAvailable={requisitosAvailable}
                dependencias={dependencias}
                selectedtipo={selectedTipo}
              />
            </div>
          </div>

          <AlertDialog open={dialogOpenAdd} onOpenChange={setDialogOpenAdd}>
            <AlertDialogContent className="md:min-w-[1000px] w-[95%] max-h-[90vh] overflow-y-auto p-4  md:w-auto">
              <AlertDialogHeader>
                <div className="flex justify-between">
                  <AlertDialogTitle>Nuevo mecanimo de compra:</AlertDialogTitle>
                  <AlertDialogCancel>
                    <AiOutlineClose />
                  </AlertDialogCancel>
                </div>
              </AlertDialogHeader>

              <NewMecanimosSteps
                dataMecanismo={dataMecanismo}
                tiposDeCompra={tiposDeCompra}
                selectedTipo={selectedTipo}
                requisitosAvailable={requisitosAvailable}
                dependencias={dependencias}
                setDataMecanismo={setDataMecanismo}
              />
            </AlertDialogContent>
          </AlertDialog>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
