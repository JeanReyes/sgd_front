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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
// import { addTipoDependencia } from "@/actions/mainteiner/tipo-dependencia/actions"; // Supuesta acción para agregar TipoDependencia
import { useRouter } from "next/navigation";
import { addTipoDependencia } from "@/actions/mainteiner/tipo-dependencia/actions";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

export const AddTipoDependenciaGrid = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await addTipoDependencia(values);

    if (!res) {
      toast.error("Error al agregar el tipo de dependencia");
      return;
    }

    if (!res.status.hasError) {
      toast.success("Tipo de Dependencia creado con éxito");
      router.refresh();
      setDialogOpen(false);
      form.reset();
      return;
    } else {
      toast.error(res.data.message || "Error al procesar la solicitud");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Button onClick={() => setDialogOpen(true)}>
          Agregar Tipo Dependencia
        </Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95%] sm:max-w-lg">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle>Nuevo Tipo de Dependencia</AlertDialogTitle>
              <AlertDialogCancel>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del tipo de dependencia"
                        {...field}
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
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción (opcional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="mt-4"
              >
                Crear Tipo de Dependencia
              </Button>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
