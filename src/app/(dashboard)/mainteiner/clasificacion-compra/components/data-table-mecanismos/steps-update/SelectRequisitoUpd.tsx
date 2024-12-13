import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileIcon, Search } from "lucide-react";
import { Requisito } from "@/interfaces/requisito";
import { cn } from "@/lib/utils";
import { NewMecanismo } from "../UpdMecanismoSteps";

interface Props {
  dataUpd: NewMecanismo;
  requisitosAvailable: Requisito[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setDataUpd: React.Dispatch<React.SetStateAction<NewMecanismo>>;
}

export const SelectRequisitoUpd = ({
  dataUpd,
  requisitosAvailable,
  setCurrentStep,
  setDataUpd,
}: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [requisitosFiltrados, setRequisitosFiltrados] = useState<Requisito[]>(
    () =>
      requisitosAvailable.filter(
        (requisito) =>
          requisito.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          requisito.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      )
  );
  const toggleRequisito = (requisito: Requisito) => {
 
    setRequisitosFiltrados((prev) => {
      return [
        ...prev
          .filter((r) => r.id !== requisito.id)
          .filter((r) => r.nombre.toLowerCase().includes(busqueda.toLowerCase())),
        requisito,
      ];
    });

    setDataUpd((prev) => {
      return {
        ...prev,
        current: {
          ...prev.current,
          requisitos: prev.current.requisitos.some((r) => r.id === requisito.id)
            ? prev.current.requisitos.filter((r) => r.id !== requisito.id)
            : [...prev.current.requisitos, requisito],
        },
      };
    });
  };

  return (
    <div>
      <TooltipProvider>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar requisitos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2">
            <ScrollArea className="h-[250px] rounded-md border">
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {requisitosFiltrados.map((requisito) => (
                  <Tooltip key={requisito.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full h-auto p-4 flex items-start gap-2 bg-primary/10 hover:bg-primary/15 border-[#2F2F2F]",
                          dataUpd.current.requisitos.some(
                            (r) => r.id === requisito.id
                          ) &&
                            "border-primary bg-primary text-white dark:bg-slate-900 dark:text-white"
                        )}
                        onClick={() => toggleRequisito(requisito)}
                      >
                        <div className="flex flex-col items-start gap-1.5 min-w-0">
                          <span className="text-xs font-medium text-left break-words">
                            {requisito.nombre}
                          </span>
                        </div>
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">
              Requisitos seleccionados ({dataUpd.current.requisitos.length}
              ):
            </h3>
            <ScrollArea className="h-[150px]">
              <div className="flex flex-wrap gap-2">
                {dataUpd.current.requisitos.length > 0 ? (
                  dataUpd.current.requisitos.map((requisito) => {
                    // const requisito = requisitosAvailable.find(
                    //   (r) => r.id === id.id
                    // );
                    // if (!requisito) return null;
                    return (
                      <Badge
                        key={requisito.id}
                        variant="secondary"
                        className="text-sm cursor-pointer"
                        onClick={() => toggleRequisito(requisito)}
                      >
                        <FileIcon className="ml-1 h-3 w-3 mr-2" />
                        {requisito.nombre}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground">
                    Ningún requisito seleccionado
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </TooltipProvider>
      {/* Botón para continuar */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setCurrentStep(2)}
          disabled={dataUpd.current.requisitos.length === 0} // Deshabilitar si no hay requisitos seleccionados
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
