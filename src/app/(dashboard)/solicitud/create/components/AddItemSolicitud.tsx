"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unidad } from "@/interfaces/unidad";
import { IndicePresupestrario } from "@/interfaces/indice-presupuestario";
import { toast } from "sonner";
import { ItemFormValuesCreate } from "./CreateSolicitudGrid";
import { FaPlus } from "react-icons/fa";
import { Money } from "@/interfaces/money";
import StickyButton from "@/components/stycky-button/StickyButton";

const itemSchema = z.object({
  cantidad: z.string(),
  idUnidad: z.string().min(1, "Seleccione una unidad de medida"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  idClasificacionPresupuestaria: z
    .string()
    .min(1, "La clasificación es requerida"),
  precioUnitario: z.string(),
});

type ItemFormValues = z.infer<typeof itemSchema>;

export default function AddItemModal({
  onAddItem,
  unidades,
  indicePresupuestario,
  control,
  monedas,
}: {
  onAddItem: (item: ItemFormValues) => void;
  unidades: Unidad[];
  indicePresupuestario: IndicePresupestrario[];
  control: Control<ItemFormValuesCreate>;
  monedas: Money[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const formValues = useWatch({ control });

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      cantidad: "20",
      idUnidad: "1",
      descripcion: "detallr",
      idClasificacionPresupuestaria: "1",
      precioUnitario: "20",
    },
  });

  function onSubmit(values: ItemFormValues) {
    onAddItem(values);
    form.reset();
    setIsOpen(false);
  }

  const validateSpecificFields = (values: ItemFormValuesCreate) => {
    const fieldsToValidate: Array<keyof ItemFormValuesCreate> = [
      "cargoCreador",
      "idMoneda",
    ];
    const valuesError = [];

    for (const field of fieldsToValidate) {
      if (!values[field] || values[field] === "") {
        valuesError.push(field);
      }
    }
    return valuesError;
  };

  const handleOpenModal = () => {
    const mapFields = {
      cargoCreador: "cargo",
      idMoneda: "moneda",
    };

    const valuesError = validateSpecificFields(
      formValues as ItemFormValuesCreate
    ).filter((field): field is keyof typeof mapFields => field in mapFields);

    if (valuesError.length > 0) {
      toast.warning("Fatan campos obligatorios", {
        position: "top-right",
        description: valuesError.map((value) => mapFields[value]).join(", "),
      });
      return;
    }

    setIsOpen(true);
  };

  return (
    <>
    <StickyButton>
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full md:w-[200px] border-2 dark:bg-black dark:text-white border-flashing dark:border-flashing-dark"
        onClick={handleOpenModal} // Ejecuta la validación antes de abrir el modal
      >
        Nuevo item
        <FaPlus className="ml-2" />
      </Button>
    </StickyButton>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95%] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              Item valorizado en:{" "}
              {
                monedas.find((m) => m.idMoneda === Number(formValues.idMoneda))
                  ?.codigo
              }
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                form.handleSubmit(onSubmit)(e);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="cantidad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex py-2">Cantidad</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="precioUnitario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex py-2">Precio Neto</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="idUnidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex py-2">
                      Unidad de Medida
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unidades.map((unidad: Unidad) => (
                          <SelectItem
                            value={String(unidad.id)}
                            key={String(unidad.id)}
                          >
                            {unidad.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idClasificacionPresupuestaria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex py-2">
                      Clasificacion Presupuestaria
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Clasificacion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indicePresupuestario.map((iPresuesto: Unidad) => (
                          <SelectItem
                            value={String(iPresuesto.id)}
                            key={String(iPresuesto.id)}
                          >
                            {iPresuesto.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex py-2">
                      Detalle o Descripción
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Agregar Ítem
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
