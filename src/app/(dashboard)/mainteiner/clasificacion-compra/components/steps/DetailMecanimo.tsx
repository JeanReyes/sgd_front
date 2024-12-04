import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { DataClasificacion } from '@/interfaces/clasificacion-compra';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewMecanismo } from '../NuevoMecanimosForType';

// const mecanismoSchema = z.object({
//   nombreMecanismo: z.string().min(1, "El nombre del mecanismo es obligatorio."),
//   rangoMin: z
//     .string()
//     .transform((val) => parseFloat(val))
//     .refine((val) => !isNaN(val), { message: "Debe ser un número." })
//     .refine((val) => val >= 0, "El rango mínimo no puede ser negativo."),
//   rangoMax: z
//     .string()
//     .transform((val) => parseFloat(val))
//     .refine((val) => !isNaN(val), { message: "Debe ser un número." })
//     .refine((val) => val > 0, "El rango máximo debe ser mayor que cero."),
// });

const mecanismoSchema = z.object({
  nombreMecanismo: z.string().min(1, "El nombre del mecanismo es obligatorio."),
  rangoMin: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Debe ser un número.",
    })
    .refine(
      (val) => parseFloat(val) >= 0,
      "El rango mínimo no puede ser negativo."
    ),
  rangoMax: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Debe ser un número.",
    })
    .refine(
      (val) => parseFloat(val) > 0,
      "El rango máximo debe ser mayor que cero."
    ),
});

interface Props {
  selectedTipoId: number;
  dataMecanismo: NewMecanismo;
  tiposDeCompra: DataClasificacion[];
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setDataMecanismo: React.Dispatch<React.SetStateAction<NewMecanismo>>;
}

export const DetailMecanimo = ({
  tiposDeCompra,
  selectedTipoId,
  dataMecanismo,
  setCurrentStep,
  setDataMecanismo,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(mecanismoSchema),
    defaultValues: dataMecanismo.detail,
  });

  const handleCrearMecanismo = (data: {
    nombreMecanismo: string;
    rangoMin: string;
    rangoMax: string;
  }) => {
    const { nombreMecanismo, rangoMin, rangoMax } = data;
    const newRangoMax = Number(rangoMax);
    const newRangoMin = Number(rangoMin);

    // Validar si el rango máximo es mayor que el rango mínimo
    if (newRangoMax <= newRangoMin) {
      toast.error("El rango máximo debe ser mayor que el rango mínimo.", {
        position: "top-right",
      });
      return;
    }

    // Obtener el tipo de compra seleccionado
    const tipoCompra = tiposDeCompra.find(
      (tipo) => tipo.idClasificacion === selectedTipoId
    );
    if (!tipoCompra) {
      toast.error("Tipo de compra no encontrado.", {
        position: "top-right",
      });
      return;
    }

    // Verificar si el nuevo mecanismo se solapa con los ya existentes
    const solapamiento = tipoCompra.mecanismosCompra.some((mecanismo) => {
      const mecanismoMin = Number(mecanismo.montoMinimo);
      const mecanismoMax = Number(mecanismo.montoMaximo);
      return (
        (newRangoMin >= mecanismoMin && newRangoMin < mecanismoMax) ||
        (newRangoMax > mecanismoMin && newRangoMax <= mecanismoMax) ||
        (newRangoMin <= mecanismoMin && newRangoMax >= mecanismoMax)
      );
    });

    if (solapamiento) {
      toast.error("El rango se solapa con un mecanismo existente.", {
        position: "top-right",
      });
      return;
    }

    // Reglas adicionales para el primer mecanismo y los siguientes
    if (tipoCompra.mecanismosCompra.length === 0) {
      if (newRangoMin !== 1) {
        toast.error("El primer mecanismo debe tener un rango mínimo de 1.", {
          position: "top-right",
        });
        return;
      }
    } else {
      const ultimoMecanismo =
        tipoCompra.mecanismosCompra[tipoCompra.mecanismosCompra.length - 1];
      const rangoMinEsperado = Number(ultimoMecanismo.montoMaximo) + 1;
      if (newRangoMin !== rangoMinEsperado) {
        toast.error(
          `El rango mínimo debe comenzar desde ${rangoMinEsperado}.`,
          {
            position: "top-right",
          }
        );
        return;
      }
    }


    setDataMecanismo((prev) => {
      return {
        ...prev,
        detail: data,
      };
    });

    setCurrentStep(1);
  };

  return (
    <div className="w-full mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCrearMecanismo)}>
          <FormField
            control={form.control}
            name="nombreMecanismo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex py-1">
                  Nombre del Mecanismo
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="rangoMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex py-1">
                      {String("Rango Mínimo (>= Min UTM)")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""} // Asegúrate de manejar valores vacíos
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="rangoMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex py-1">
                      {String("Rango Máximo (< Max UTM)")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""} // Asegúrate de manejar valores vacíos
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="default" type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
