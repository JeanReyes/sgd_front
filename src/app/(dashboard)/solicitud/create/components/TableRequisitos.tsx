'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { Requisito } from "@/interfaces/requisito";
import { FileText, Upload } from "lucide-react";
import { ItemSolicitud } from "./CreateSolicitudGrid";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { useEffect, useState } from "react";

interface Props {
  valueInUtm: number;
  solicitudSelected: DataClasificacion;
  items: ItemSolicitud[];
  setMecanismoSelected: React.Dispatch<React.SetStateAction<MecanismoCompra>>;
}

export const TableRequisitos = ({
  valueInUtm,
  solicitudSelected,
  items = [],
  setMecanismoSelected,
}: Props) => {

  const [selectedMecanismo, setSelected] = useState<MecanismoCompra | null>(
    null
  );

  const selectedRequisitos = () => {
    for (const mecanismo of solicitudSelected.mecanismosCompra) {
      if (
        valueInUtm >= Number(mecanismo.montoMinimo) &&
        valueInUtm <= Number(mecanismo.montoMaximo)
      ) {
        // setMecanismoSelected(mecanismo);
        return mecanismo;
      }
    }
    return null; // Si no se encuentra un mecanismo que coincida con el valor
  };
  useEffect(() => {
    if (items.length > 0) {
      const mecanismo = selectedRequisitos();
      if (mecanismo) {
        setSelected(mecanismo);
        setMecanismoSelected(mecanismo);
      } 
    }
  }, [valueInUtm]);


  return (
    <div>
      <span className="flex items-center gap-1">
        <FileText className="w-4 h-4" />
        Requisitos:
      </span>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Requisito</TableHead>
            <TableHead className="text-left">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell  className="text-2xl flex justify-center font-medium">
                No hay items agregados
              </TableCell>
            </TableRow>
          ) : (
            <>
              {selectedRequisitos() === null && items.length > 0 ? (
                <TableRow>
                  <TableCell className="text-sm font-medium">
                    El item agregado no categoriza en ningún mecanismo
                  </TableCell>
                </TableRow>
              ) : (
                selectedRequisitos()?.requisitos.map(
                  (requisito: Requisito, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm font-medium">
                        {requisito.nombre}
                      </TableCell>
                      <TableCell>
                        <div className="rounded-lg border border-dashed p-2 transition-colors flex flex-col items-center">
                          <Upload className="h-4 w-4 text-muted-foreground mb-1" />
                          <p className="text-xs text-muted-foreground">
                            Arrastre archivos aquí o haga clic para seleccionar
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
