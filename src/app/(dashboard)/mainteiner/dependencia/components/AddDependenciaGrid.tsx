"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AiOutlineClose } from "react-icons/ai";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { addDependencia } from "@/actions/mainteiner/dependencia/actions";
import { TipoDependencia } from "@/interfaces/tipo-dependencia";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sector } from "@/interfaces/sector";

const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"), // Cambio realizado aquí
  codigo: z.string().min(1, "El código es obligatorio"), // Cambio realizado aquí
  timbre: z.string().optional(),
  estado: z.boolean(),
  descripcion: z.string().optional(),
  tipoDependenciaID: z.string().nullable().optional(),
  sectorID: z.string().nullable().optional(),
});

interface Props {
  tipoDependencias: TipoDependencia[];
  sectores: Sector[];
}

export const AddDependenciaGrid = ({ tipoDependencias, sectores }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      codigo: "",
      timbre: "",
      estado: true,
      descripcion: "",
      tipoDependenciaID: null,
      sectorID: null,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      codigo: values.codigo,
      descripcion: values.descripcion,
      estado: values.estado ? "1" : "0",
      nombre: values.nombre,
      timbre: values.timbre,
      sectorID: values.sectorID,
      tipoDependenciaID: values.tipoDependenciaID,
    };

    const res = await addDependencia(data); // Llamada a la API para agregar dependencia

    if (!res) {
      toast.error("Error", {
        position: "top-right",
        description: "Intente de nuevo",
      });
      return;
    }

    if (!res.status.hasError) {
      toast.success("Dependencia creada", {
        position: "top-right",
        description: res.data.message,
      });
      router.refresh();
      setDialogOpen(false);
      form.reset();
      return;
    } else {
      toast.error("Error", {
        position: "top-right",
        description: res.data.message,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>Agregar Dependencia</Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95%]">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle>Nueva Dependencia</AlertDialogTitle>
              <AlertDialogCancel>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="codigo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Código</FormLabel>
                      <FormControl>
                        <Input placeholder="Código" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timbre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Timbre</FormLabel>
                      <FormControl>
                        <Input placeholder="Timbre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sectorID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sector <span className="text-red-800">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value ?? undefined}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectores.map((sector: TipoDependencia) => (
                            <SelectItem
                              value={String(sector.id)}
                              key={String(sector.id)}
                            >
                              {sector.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoDependenciaID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Dependencia <span className="text-red-800">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value ?? undefined}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Dependencia" />
                        </SelectTrigger>
                        <SelectContent>
                          {tipoDependencias.map(
                            (tipoDepencia: TipoDependencia) => (
                              <SelectItem
                                value={String(tipoDepencia.id)}
                                key={String(tipoDepencia.id)}
                              >
                                {tipoDepencia.nombre}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem className="flex mt-4 flex-row w-full items-center justify-between rounded-lg border p-4 col-span-1 sm:col-span-2">
                      <div>
                        <FormDescription>Estado</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripción" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="mt-4" type="submit">
                  Crear Dependencia
                </Button>
              </form>
            </Form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
