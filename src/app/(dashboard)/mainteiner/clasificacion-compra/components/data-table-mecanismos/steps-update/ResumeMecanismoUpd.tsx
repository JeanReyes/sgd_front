import React from "react";
import { Button } from "@/components/ui/button";
import { NewMecanismo } from "../UpdMecanismoSteps";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { Dependencia } from "@/interfaces/dependencia";

interface Props {
  dataUpd: NewMecanismo;
  mecanismosAfectados: {
    mecanismo: MecanismoCompra;
    nuevoMinimo: string;
    nuevoMaximo: string;
  }[];
  actulizarMecanismo: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const ResumeMecanismoUpd = ({
  dataUpd,
  mecanismosAfectados,
  actulizarMecanismo,
  setCurrentStep,
}: Props) => {
  return (
    <div className="flex flex-col mt-4 rounded-lg p-6 border border-gray-700 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-6">
        Resumen de Mecanismo
      </h3>

      <div className="grid grid-cols-3 gap-6">
        {/* Detalle */}
        <div>
          <h4 className="text-primary text-md font-semibold mb-2">
            Detalle
            <Button
              variant="secondary"
              onClick={() => setCurrentStep(0)}
              className="ml-2"
            >
              Editar
            </Button>
          </h4>
          <p className="text-white text-sm">
            <span className="font-bold">Nombre:</span> {dataUpd.current.nombre}
          </p>
          <p className="text-white text-sm">
            <span className="font-bold">Monto Mínimo:</span>{" "}
            {dataUpd.current.montoMinimo}
          </p>
          <p className="text-white text-sm">
            <span className="font-bold">Monto Máximo:</span>{" "}
            {dataUpd.current.montoMaximo}
          </p>
          {mecanismosAfectados.length > 0 && (
            <div className="mt-4 p-4 rounded-md border shadow-md bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Mecanismos Afectados
              </h3>
              <ul className="space-y-4">
                {mecanismosAfectados.map(
                  ({ mecanismo, nuevoMinimo, nuevoMaximo }) => (
                    <li
                      key={mecanismo.idMecanismo}
                      className={`flex justify-between items-center p-3 rounded-md ${"bg-gray-50 dark:bg-gray-700"}`}
                    >
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {mecanismo.nombre}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Rango actual: {mecanismo.montoMinimo} -{" "}
                          {mecanismo.montoMaximo}
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          Nuevo rango: {nuevoMinimo} - {nuevoMaximo}
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Requisitos */}
        <div>
          <h4 className="text-primary text-md font-semibold mb-2">
            Requisitos
            <Button
              variant="secondary"
              onClick={() => setCurrentStep(1)}
              className="ml-2"
            >
              Editar
            </Button>
          </h4>
          <ul className="text-white text-sm space-y-1">
            {dataUpd.current.requisitos.map((req) => (
              <li key={req.id} className="border-b border-gray-700 pb-1">
                {req.nombre}
              </li>
            ))}
          </ul>
        </div>
        {/* Dependencias */}
        <div>
          <h4 className="text-primary text-md font-semibold mb-2">
            Dependencias
            <Button
              variant="secondary"
              onClick={() => setCurrentStep(2)}
              className="ml-2"
            >
              Editar
            </Button>
          </h4>
          <ul className="text-white text-sm space-y-1">
            {(dataUpd.current.rutas as Dependencia[]).map((dep) => (
              <li key={dep.id} className="border-b border-gray-700 pb-1">
                {dep.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-2">
        <Button
          onClick={() => console.log("cancelar mecanismo")}
          variant="secondary"
        >
          Cancelar
        </Button>
        <Button onClick={() => actulizarMecanismo()}>Actualizar</Button>
      </div>
      <div className="flex justify-end mt-6"></div>
    </div>
  );
};
