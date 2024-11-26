"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  tiposDeCompra: DataClasificacion[];
  selectedTipo: DataClasificacion;
  setTiposDeCompra: (tiposDeCompra: DataClasificacion[]) => void;
}

const mecanismoSchema = z.object({
  nombreMecanismo: z.string().min(1, "El nombre del mecanismo es obligatorio."),
  rangoMin: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Debe ser un número." })
    .refine((val) => val >= 0, "El rango mínimo no puede ser negativo."),
  rangoMax: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Debe ser un número." })
    .refine((val) => val > 0, "El rango máximo debe ser mayor que cero."),
});

export default function DialogMecanismo({
  tiposDeCompra,
  selectedTipo,
  setTiposDeCompra,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(mecanismoSchema),
    defaultValues: {
      nombreMecanismo: "",
      rangoMin: "1", // Inicializa con 1 para el primer mecanismo como string
      rangoMax: "",
    },
  });

  const selectedTipoId = selectedTipo.idClasificacion;

  const handleOpenDialog = () => {
    if (selectedTipo.mecanismosCompra.length > 0) {
      const ultimoMecanismo =
        selectedTipo.mecanismosCompra[selectedTipo.mecanismosCompra.length - 1];
      form.setValue(
        "rangoMin",
        String(Number(ultimoMecanismo.montoMaximo) + 1)
      );
    } else {
      form.setValue("rangoMin", "1");
    }
    setDialogOpen(true);
  };

  //
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

    // Crear el nuevo mecanismo
    const nuevoMecanismo: MecanismoCompra = {
      idMecanismo: `${Date.now()}`,
      nombre: nombreMecanismo,
      montoMinimo: String(newRangoMin),
      montoMaximo: String(newRangoMax),
      moneda: {
        idMoneda: 2,
        codigo: "UTM",
        decimales: 2,
        nombre: "UTM",
        descripcion: "Unidad Tributaria Mensual",
      },
      requisitos: [],
    };

    // Actualizar el estado con el nuevo mecanismo
    const nuevosTiposDeCompra = tiposDeCompra.map((tipo) => {
      if (tipo.idClasificacion === selectedTipoId) {
        return {
          ...tipo,
          mecanismosCompra: [...tipo.mecanismosCompra, nuevoMecanismo],
        };
      }
      return tipo;
    });

    setTiposDeCompra(nuevosTiposDeCompra);
    form.reset({
      nombreMecanismo: "",
      rangoMin: String(Number(newRangoMax) + 1),
      rangoMax: "",
    });
  };

  const hasMecanismo =
    tiposDeCompra.filter((tipo) => tipo.idClasificacion === selectedTipoId)?.[0]
      ?.mecanismosCompra.length > 0;

  return (
    <>
      <Button variant="default" onClick={handleOpenDialog}>
        Ver/Agregar Mecanismos
      </Button>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="md:min-w-[1000px] w-[95%] max-h-[90vh] overflow-y-auto p-4  md:w-auto">
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle className="text-2xl">
                {selectedTipo.nombre}
              </AlertDialogTitle>
              {/* <AlertDialogTitle>Crear Solitud</AlertDialogTitle> */}
              <AlertDialogCancel>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold mb-4">Agregar Mecanismo</h3>
            <div className=" gap-4">
              <div className="flex flex-col gap-4 md:flex-row  p-4 w-full border rounded-lg mb-4">
                <div className="w-full md:w-1/2">
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
                      <div className="flex space-x-4 mb-4">
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
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="default" type="submit">
                          Crear Mecanismo
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
                <div className="w-full md:w-1/2">
                  <div>
                    <h3>Requisitos</h3>
                  </div>
                </div>
              </div>
            </div>

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

          <AlertDialogFooter>
            {/* <AlertDialogAction onClick={() => setDialogOpen(false)}>
              Continuar
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
