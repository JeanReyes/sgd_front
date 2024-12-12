import React from 'react'
import { NewMecanismo } from '../NuevoMecanimosForType';
import { Button } from '@/components/ui/button';

interface Props {
  dataMecanismo: NewMecanismo;
  createMecanismo: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const ResumeMecanismo = ({
  dataMecanismo,
  createMecanismo,
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
            <span className="font-bold">Nombre:</span>{" "}
            {dataMecanismo.detail.nombreMecanismo}
          </p>
          <p className="text-white text-sm">
            <span className="font-bold">Monto Mínimo:</span>{" "}
            {dataMecanismo.detail.rangoMin}
          </p>
          <p className="text-white text-sm">
            <span className="font-bold">Monto Máximo:</span>{" "}
            {dataMecanismo.detail.rangoMax}
          </p>
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
            {dataMecanismo.requisitos.map((req) => (
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
            {dataMecanismo.rutas.map((dep) => (
              <li key={dep.id} className="border-b border-gray-700 pb-1">
                {dep.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className='flex justify-end gap-2'>
        <div className="flex justify-end mt-6">
          <Button onClick={() => console.log("cancelar mecanismo")} variant="secondary">
          Cancelar</Button>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={() => createMecanismo()}>Crear mecanismo</Button>
        </div>
      </div>
    </div>
  );
};
