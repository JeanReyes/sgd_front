"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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

const itemSchema = z.object({
  cantidad: z.string(),
  idUnidad: z.string().min(1, "Seleccione una unidad de medida"),
  description: z.string().min(1, "La descripción es requerida"),
  idClasificacionPresupuestraria: z
    .string()
    .min(1, "La clasificación es requerida"),
  precioUnitario: z.string(),
});

type ItemFormValues = z.infer<typeof itemSchema>;

export default function AddItemModal({
  onAddItem,
  unidades,
  indicePresupuestario
}: {
  onAddItem: (item: ItemFormValues) => void;
  unidades: Unidad[];
  indicePresupuestario: IndicePresupestrario[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      cantidad: "",
      idUnidad: "",
      description: "",
      idClasificacionPresupuestraria: "",
      precioUnitario: "",
    },
  });

  function onSubmit(values: ItemFormValues) {
    onAddItem(values);
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 w-full md:w-[200px] border-2 dark:bg-black dark:text-white border-flashing dark:border-flashing-dark"
        >
          Nuevo item
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between">Nuevo Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel className="flex py-2">Unidad de Medida</FormLabel>
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
              name="idClasificacionPresupuestraria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex py-2">Clasificacion Presupuestaria</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex py-2">Detalle o Descripción</FormLabel>
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
  );
}
