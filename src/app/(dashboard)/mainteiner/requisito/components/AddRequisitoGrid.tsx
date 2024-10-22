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
import { addUnidad } from "@/actions/mainteiner/unidad/actions";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { extensiones, formatoBase } from "../utils/data";

export type Money = {
  id: string;
  nombre: string;
  descripcion: string;
};

const formSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  obligatorio: z.boolean(),
  cantidad: z.preprocess(
    (val) => parseFloat(val as string), // Convierte el valor a número
    z.number({ message: "La cantidad debe ser un número válido" }) // Mensaje personalizado
  ),
  extensiones: z.string(),
  formatoBase: z.string(),
});

export const AddrequisitoGrid = () => {
  const [dialogOpen, seDialogOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      cantidad: 1,
      obligatorio: false,
      extensiones: "",
      formatoBase: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // const res = await addUnidad({
    //   nombre: values.nombre,
    //   descripcion: values.descripcion,
    // });

    // if (!res) {
    //   toast.error("Error", {
    //     position: "top-right",
    //     description: "Intente denuevo",
    //   });
    //   return;
    // }

    // if (!res.status.hasError) {
    //   toast.success("Unidad creada", {
    //     position: "top-right",
    //     description: res.data.message,
    //   });
    //   router.refresh();
    //   seDialogOpen(false);
    //   form.reset();
    //   return;
    // } else {
    //   toast.error("Error", {
    //     position: "top-right",
    //     description: res.data.message,
    //   });
    // }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Button onClick={() => seDialogOpen(true)}>Agregar</Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={seDialogOpen}>
        <AlertDialogContent className="w-[95%]">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle>Nuevo Requisito</AlertDialogTitle>
              <AlertDialogCancel>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
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
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripcion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="cantidad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex py-2">Cantidad</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="obligatorio"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-10 pl-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 space-x-3 leading-none">
                            <FormLabel className="flex items-end text-start">
                              ¿Es obligatorio?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="extensiones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Extension</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione extension" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {extensiones.map((extension) => {
                            return (
                              <SelectItem
                                key={extension.value}
                                value={extension.value}
                              >
                                {extension.nombre}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="formatoBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Formato base</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione formato base" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formatoBase.map((format) => {
                            return (
                              <SelectItem
                                key={format.value}
                                value={format.value}
                              >
                                {format.nombre}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={!form.formState.isValid}
                  className="mt-4"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
