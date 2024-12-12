import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MecanismoCompra } from '@/interfaces/mecanismo-compra';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { NewMecanismo } from '../UpdMecanismoSteps';

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

    if (
      isNaN(nuevoMinimo) ||
      isNaN(nuevoMaximo) ||
      nuevoMinimo >= nuevoMaximo
    ) {
      toast.error("El rango máximo debe ser mayor que el rango mínimo.", {
        position: "top-right",
      });
      return;
    }

    const mecanismosAfectados: {
      mecanismo: MecanismoCompra;
      nuevoMinimo: string;
      nuevoMaximo: string;
    }[] = [];
    const redundantes: MecanismoCompra[] = [];

    const originalMecanismos = [...mecanismos]; // Mantenemos intacto el estado actual
    const index = originalMecanismos.findIndex(
      (m) => m.idMecanismo === idMecanismo
    );

    if (index === -1) {
      toast.error("Mecanimo no encontrado.", {
        position: "top-right",
      });
      return;
    }

    // Mecanismo actualizado (sin modificar el actual aún)
    mecanismosAfectados.push({
      mecanismo: originalMecanismos[index],
      nuevoMinimo: newData.montoMinimo!,
      nuevoMaximo: newData.montoMaximo!,
    });

    // Analizamos mecanismos anteriores
    for (let i = index - 1; i >= 0; i--) {
      const mecanismo = originalMecanismos[i];
      const minimoActual = parseFloat(mecanismo.montoMinimo);
      const maximoActual = parseFloat(mecanismo.montoMaximo);

      if (maximoActual <= nuevoMaximo && maximoActual >= nuevoMinimo) {
        if (minimoActual >= nuevoMinimo) {
          // Mecanismo está completamente dentro del rango: redundante
          redundantes.push(mecanismo);
        } else {
          // Mecanismo parcialmente solapado: ajustar su monto máximo
          const nuevoMaximoAjustado = (nuevoMinimo - 1).toString();
          mecanismosAfectados.push({
            mecanismo,
            nuevoMinimo: mecanismo.montoMinimo,
            nuevoMaximo: nuevoMaximoAjustado,
          });
        }
      } else if (maximoActual < nuevoMinimo) {
        // Si no hay más solapamientos, terminamos
        break;
      }
    }

    // Analizamos mecanismos siguientes
    for (let i = index + 1; i < originalMecanismos.length; i++) {
      const mecanismo = originalMecanismos[i];
      const minimoActual = parseFloat(mecanismo.montoMinimo);
      const maximoActual = parseFloat(mecanismo.montoMaximo);

      if (minimoActual >= nuevoMinimo && maximoActual <= nuevoMaximo) {
        // Mecanismo está completamente dentro del rango: redundante
        redundantes.push(mecanismo);
      } else if (minimoActual <= nuevoMaximo && maximoActual > nuevoMaximo) {
        // Mecanismo parcialmente solapado: ajustar su monto mínimo
        const nuevoMinimoAjustado = (nuevoMaximo + 1).toString();
        mecanismosAfectados.push({
          mecanismo,
          nuevoMinimo: nuevoMinimoAjustado,
          nuevoMaximo: mecanismo.montoMaximo,
        });
      } else if (minimoActual > nuevoMaximo) {
        // Si no hay más solapamientos, terminamos
        break;
      }
    }

    console.log(mecanismosAfectados);
    
    // setMecanismosAfectados(mecanismosAfectados);
    setMecanismosAfectados(mecanismosAfectados);
    setRedundantes(redundantes);
    setDataUpd((prev) => {
      const otherMecanismoToUpd = mecanismosAfectados.filter((m) => m.mecanismo.idMecanismo !== mecanismo.idMecanismo)
      
      return {
        ...prev,
        current: {
          ...mecanismo,
          nombre: newData.nombre ?? "",
          montoMinimo: newData.montoMinimo ?? "",
          montoMaximo: newData.montoMaximo ?? "",
        },
        other: otherMecanismoToUpd.map((m) => {
          return {
            ...m.mecanismo,
            nombre: newData.nombre ?? "",
            montoMinimo: m.nuevoMinimo ?? "",
            montoMaximo: m.nuevoMaximo ?? "",
          }
        }),
      };
    })
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
        {/* Listado de mecanismos afectados */}
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
                    className={`flex justify-between items-center p-3 rounded-md ${
                      actualizados.includes(mecanismo.idMecanismo!)
                        ? "bg-green-100 dark:bg-green-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }`}
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

