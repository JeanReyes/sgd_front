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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addIndicePresupuestario } from "@/actions/mainteiner/indice-presupuestario/actions"; // Supuesta acción para agregar índice presupuestario
import { AiOutlineClose } from "react-icons/ai";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IoMdAddCircleOutline } from "react-icons/io";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
  asignacion: z.string().min(1, "La asignación es obligatoria"),
  item: z.string().min(1, "El ítem es obligatorio"),
  subtitulo: z.string().min(1, "El subtítulo es obligatorio"),
});

export const AddIndicePresupuestarioGrid = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      asignacion: "",
      item: "",
      subtitulo: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const res = await addIndicePresupuestario(values);

    if (!res) {
      toast.error("Error al agregar el índice presupuestario.");
      return;
    }

    if (!res.status.hasError) {
      toast.success("Índice Presupuestario agregado con éxito.");
      router.refresh(); // Refresca la vista
      setDialogOpen(false); // Cierra el modal
      form.reset(); // Limpia el formulario
      return;
    } else {
      toast.error(res.data.message || "Error al procesar la solicitud.");
    }
  };

  return (
    <div className="w-full">
      {/* Botón para abrir el modal */}
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setDialogOpen(true)}>
                <IoMdAddCircleOutline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Agregar indice presupuestario</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Modal */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95%] sm:max-w-lg">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle>Nuevo Índice Presupuestario</AlertDialogTitle>
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
              {/* Campo Nombre */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del índice presupuestario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Asignación */}
              <FormField
                control={form.control}
                name="asignacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asignación</FormLabel>
                    <FormControl>
                      <Input placeholder="Asignación" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Ítem */}
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ítem</FormLabel>
                    <FormControl>
                      <Input placeholder="Ítem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Subtítulo */}
              <FormField
                control={form.control}
                name="subtitulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Subtítulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Descripción */}
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

              {/* Botón de Enviar */}
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="mt-4"
              >
                Ingresar
              </Button>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
