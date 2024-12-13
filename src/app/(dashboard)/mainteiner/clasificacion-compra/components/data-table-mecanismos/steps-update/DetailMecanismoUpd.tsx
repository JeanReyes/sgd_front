import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MecanismoCompra } from '@/interfaces/mecanismo-compra';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { NewMecanismo } from '../UpdMecanismoSteps';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BiTerminal } from 'react-icons/bi';

interface Props {
  mecanismo: MecanismoCompra;
  allMecanismos: MecanismoCompra[];
  mecanismosAfectados: {
    mecanismo: MecanismoCompra;
    nuevoMinimo: string;
    nuevoMaximo: string;
  }[];
  setMecanismosAfectados: React.Dispatch<React.SetStateAction<
    { mecanismo: MecanismoCompra; nuevoMinimo: string; nuevoMaximo: string }[]
  >>;
  setRedundantes: React.Dispatch<React.SetStateAction<MecanismoCompra[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  redundantes: MecanismoCompra[];
  actualizados: string[];
  setActualizados: React.Dispatch<React.SetStateAction<string[]>>;
  setDataUpd: React.Dispatch<React.SetStateAction<NewMecanismo>>;
}

export const DetailMecanismoUpd = ({
  mecanismo,
  allMecanismos,
  mecanismosAfectados,
  redundantes,
  actualizados,
  setActualizados,
  setRedundantes,
  setMecanismosAfectados,
  setCurrentStep,
  setDataUpd,
}: Props) => {
const actualizarMecanismos = (
  idMecanismo: string,
  newData: Partial<MecanismoCompra>,
  mecanismos: MecanismoCompra[]
) => {
  const nuevoMinimo = parseFloat(newData.montoMinimo!);
  const nuevoMaximo = parseFloat(newData.montoMaximo!);

  // Validación inicial del mecanismo actual
  if (isNaN(nuevoMinimo) || isNaN(nuevoMaximo) || nuevoMinimo >= nuevoMaximo) {
    return;
  }

  const originalMecanismos = [...mecanismos];
  const index = originalMecanismos.findIndex(
    (m) => m.idMecanismo === idMecanismo
  );
  if (index === -1) {
    return;
  }

  const mecanismoActual = originalMecanismos[index];
  const mecanismosAfectados: {
    mecanismo: MecanismoCompra;
    nuevoMinimo: string;
    nuevoMaximo: string;
  }[] = [];
  const redundantes: MecanismoCompra[] = [];

  // Actualizar el mecanismo actual con los nuevos rangos
  mecanismosAfectados.push({
    mecanismo: mecanismoActual,
    nuevoMinimo: newData.montoMinimo!,
    nuevoMaximo: newData.montoMaximo!,
  });

  // Función para ajustar un mecanismo dado su min y max propuestos
  const ajustarMecanismo = (
    mecanismo: MecanismoCompra,
    propuestoMin: number,
    propuestoMax: number
  ) => {
    if (propuestoMin <= propuestoMax) {
      return {
        mecanismo,
        nuevoMinimo: propuestoMin.toString(),
        nuevoMaximo: propuestoMax.toString(),
      };
    } else {
      // No se puede ajustar este mecanismo sin invalidarlo
      redundantes.push(mecanismo);
      return null;
    }
  };

  // Ajustar el mecanismo anterior (si existe)
  if (index > 0) {
    const mecanismoAnterior = originalMecanismos[index - 1];
    const minAnterior = parseFloat(mecanismoAnterior.montoMinimo);
    const maxAnterior = parseFloat(mecanismoAnterior.montoMaximo);

    // Comparar maxAnterior con nuevoMinimo del actual
    // Caso 1: Solapamiento si maxAnterior >= nuevoMinimo
    // Caso 2: Gap si maxAnterior + 1 < nuevoMinimo
    // Si maxAnterior + 1 == nuevoMinimo, ya están contiguos, no hacer nada.

    if (maxAnterior >= nuevoMinimo) {
      // Solapamiento: reducir el maxAnterior para que maxAnterior = nuevoMinimo - 1
      const ajuste = ajustarMecanismo(
        mecanismoAnterior,
        minAnterior,
        nuevoMinimo - 1
      );
      if (ajuste) mecanismosAfectados.push(ajuste);
    } else if (maxAnterior + 1 < nuevoMinimo) {
      // Gap: expandir el anterior para cubrir hasta nuevoMinimo - 1
      const ajuste = ajustarMecanismo(
        mecanismoAnterior,
        minAnterior,
        nuevoMinimo - 1
      );
      if (ajuste) mecanismosAfectados.push(ajuste);
    }
    // Si maxAnterior + 1 == nuevoMinimo, están alineados y no hace falta cambio.
  }

  // Ajustar el mecanismo siguiente (si existe)
  if (index < originalMecanismos.length - 1) {
    const mecanismoSiguiente = originalMecanismos[index + 1];
    const minSiguiente = parseFloat(mecanismoSiguiente.montoMinimo);
    const maxSiguiente = parseFloat(mecanismoSiguiente.montoMaximo);

    // Comparar minSiguiente con nuevoMaximo del actual
    // Caso 1: Solapamiento si minSiguiente <= nuevoMaximo
    // Caso 2: Gap si minSiguiente > nuevoMaximo + 1
    // Si minSiguiente == nuevoMaximo + 1, ya están alineados, no hacer nada.

    if (minSiguiente <= nuevoMaximo) {
      // Solapamiento: aumentar minSiguiente para que minSiguiente = nuevoMaximo + 1
      const ajuste = ajustarMecanismo(
        mecanismoSiguiente,
        nuevoMaximo + 1,
        maxSiguiente
      );
      if (ajuste) mecanismosAfectados.push(ajuste);
    } else if (minSiguiente > nuevoMaximo + 1) {
      // Gap: reducir el minSiguiente para que minSiguiente = nuevoMaximo + 1
      const ajuste = ajustarMecanismo(
        mecanismoSiguiente,
        nuevoMaximo + 1,
        maxSiguiente
      );
      if (ajuste) mecanismosAfectados.push(ajuste);
    }
    // Si minSiguiente == nuevoMaximo + 1, están alineados y no hace falta cambio.
  }

  // Actualizar estados
  setMecanismosAfectados(mecanismosAfectados);
  setRedundantes(redundantes);
  setDataUpd((prev) => {
    const mecanismoActualizado = mecanismosAfectados.find(
      (m) => m.mecanismo.idMecanismo === idMecanismo
    );

    const otrosAfectados = mecanismosAfectados.filter(
      (m) => m.mecanismo.idMecanismo !== idMecanismo
    );

    return {
      ...prev,
      current: {
        ...mecanismoActual,
        nombre: newData.nombre ?? mecanismoActual.nombre,
        montoMinimo: mecanismoActualizado
          ? mecanismoActualizado.nuevoMinimo
          : mecanismoActual.montoMinimo,
        montoMaximo: mecanismoActualizado
          ? mecanismoActualizado.nuevoMaximo
          : mecanismoActual.montoMaximo,
      },
      other: otrosAfectados.map((m) => ({
        ...m.mecanismo,
        nombre: m.mecanismo.nombre,
        montoMinimo: m.nuevoMinimo,
        montoMaximo: m.nuevoMaximo,
      })),
    };
  });
};


  return (
    <div className="grid gap-4">
      <div>
        {/* Formulario */}
        <FormEditMecanismo
          mecanismo={mecanismo}
          redundantes={redundantes}
          mecanismosAfectados={mecanismosAfectados}
          onSubmit={(newData) =>
            actualizarMecanismos(mecanismo.idMecanismo!, newData, allMecanismos)
          }
          setMecanismosAfectados={setMecanismosAfectados}
          setRedundantes={setRedundantes}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div>
        {redundantes.length > 0 && (
          <Alert variant={"warning"}>
            <BiTerminal className="h-4 w-4" />
            <AlertTitle>Advertencia</AlertTitle>
            <AlertDescription>
              No puede continuar si existen mecanismos redundantes, por favor
              valide los datos nuevamente
            </AlertDescription>
          </Alert>
        )}
        {/* Listado de mecanismos afectados */}
        {mecanismosAfectados.length > 0 && (
          <div className="mt-4 p-4 rounded-md border shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Mecanismos Afectados
            </h3>
            <ul className="space-y-4">
              {mecanismosAfectados.map(
                ({
                  mecanismo: mecanismoAfectado,
                  nuevoMinimo,
                  nuevoMaximo,
                }) => (
                  <li
                    key={mecanismoAfectado.idMecanismo}
                    className={`flex justify-between items-center p-3 rounded-md ${
                      actualizados.includes(mecanismoAfectado.idMecanismo!)
                        ? "bg-green-100 dark:bg-green-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {mecanismoAfectado.idMecanismo === mecanismo.idMecanismo ? 'Mecanismo actual: ' : ''}
                        {mecanismoAfectado.nombre}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rango actual: {mecanismoAfectado.montoMinimo} -{" "}
                        {mecanismoAfectado.montoMaximo}
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

        {/* Listado de mecanismos redundantes */}
        {redundantes.length > 0 && (
          <div className="mt-4 p-4 rounded-md border shadow-md bg-red-100 dark:bg-red-700">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-300">
              Mecanismos Redundantes
            </h3>
            <ul className="space-y-4">
              {redundantes.map((mecanismo) => (
                <li
                  key={mecanismo.idMecanismo}
                  className="flex justify-between items-center dark:bg-red-800"
                >
                  <span>
                    {mecanismo.nombre}: {mecanismo.montoMinimo} -{" "}
                    {mecanismo.montoMaximo}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mecanismoSchema = z.object({
  nombre: z.string().min(1, "El nombre del mecanismo es obligatorio."),
  montoMinimo: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Debe ser un número.",
  }),
  montoMaximo: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Debe ser un número.",
  }),
});

const FormEditMecanismo = ({
  mecanismo,
  redundantes,
  mecanismosAfectados,
  onSubmit,
  setMecanismosAfectados,
  setRedundantes,
  setCurrentStep,
}: {
  mecanismo: MecanismoCompra;
  redundantes: MecanismoCompra[];
  mecanismosAfectados: {
    mecanismo: MecanismoCompra;
    nuevoMinimo: string;
    nuevoMaximo: string;
  }[];
  onSubmit: (newData: Partial<MecanismoCompra>) => void;
  setMecanismosAfectados: React.Dispatch<
    React.SetStateAction<
      { mecanismo: MecanismoCompra; nuevoMinimo: string; nuevoMaximo: string }[]
    >
  >;
  setRedundantes: React.Dispatch<React.SetStateAction<MecanismoCompra[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const form = useForm({
    resolver: zodResolver(mecanismoSchema),
    defaultValues: mecanismo,
  });

  const handleSubmit = (data: Partial<MecanismoCompra>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col col-span-1">
            <FormField
              control={form.control}
              name="montoMinimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto Mínimo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setMecanismosAfectados([]);
                        setRedundantes([]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col col-span-1">
            <FormField
              control={form.control}
              name="montoMaximo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto Máximo</FormLabel>
                  <FormControl>
                    <Input {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setMecanismosAfectados([]);
                        setRedundantes([]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5 gap-2">
          {mecanismosAfectados.length === 0 || redundantes.length > 0 ? (
            <Button type="submit" variant="secondary" className="mt-4">
              Validar
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(1)}>Continuar</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

