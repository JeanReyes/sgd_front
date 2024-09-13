"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AiOutlineClose } from "react-icons/ai";
import { addMoney } from "@/actions/mainteiner/moneda/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export type Money = {
  id: string;
  codigo: string;
  decimales: number;
  nombre: string;
  descripcion: string;
};

const formSchema = z.object({
  codigo: z.string(),
  decimales: z.preprocess(
    (val) => parseInt(val as string, 10), // Convierte el valor a número
    z.number().int({ message: "Debe ser un número entero" }) // Asegura que es un número
  ),
  nombre: z.string(),
  descripcion: z.string(),
});



export const AddMoneyGrid = () => {
  const [dialogOpen, seDialogOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      nombre: "",
      decimales: 0,
      descripcion: ""
    },
    mode: "onChange",
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await addMoney({
      codigo: values.codigo,
      decimales: values.decimales,
      nombre: values.nombre,
      descripcion: values.descripcion,
    });

    if (!res) {
      toast.error("Error", {
        position: "top-right",
        description: "Intente denuevo",
      });
      return;
    }

    if (!res.status.hasError) {
      toast.success("Moneda creada", {
        position: "top-right",
        description: res.data.message,
      });
      router.refresh();
      seDialogOpen(false);
      form.reset()
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
        <Button onClick={() => seDialogOpen(true)}>Agregar</Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={seDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Agregue nueva moneda</AlertDialogTitle>
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
                  name="codigo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <Input placeholder="Código" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="decimales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decimales</FormLabel>
                      <FormControl>
                        <Input placeholder="Decimales" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
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
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripcion" {...field} />
                      </FormControl>
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
