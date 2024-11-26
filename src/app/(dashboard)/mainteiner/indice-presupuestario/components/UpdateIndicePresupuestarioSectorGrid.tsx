"use client";

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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateIndicePresupuestario } from "@/actions/mainteiner/indice-presupuestario/actions"; // Acción para actualizar el índice presupuestario
import { IndicePresupestrario } from "@/interfaces/indice-presupuestario";


// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
  asignacion: z.string().min(1, "La asignación es obligatoria"),
  item: z.string().min(1, "El ítem es obligatorio"),
  subtitulo: z.string().min(1, "El subtítulo es obligatorio"),
});

interface Props {
  indicePresupuestario: IndicePresupestrario; // Datos iniciales del índice presupuestario
  setDialogOpen: (open: boolean) => void; // Función para cerrar el modal
}

export const UpdateIndicePresupuestarioGrid = ({
  indicePresupuestario,
  setDialogOpen,
}: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: indicePresupuestario.nombre || "",
      descripcion: indicePresupuestario.descripcion || "",
      asignacion: indicePresupuestario.asignacion || "",
      item: indicePresupuestario.item || "",
      subtitulo: indicePresupuestario.subtitulo || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      id: indicePresupuestario.id, // Asegúrate de incluir el ID para identificar el registro
      nombre: values.nombre,
      descripcion: values.descripcion,
      asignacion: values.asignacion,
      item: values.item,
      subtitulo: values.subtitulo,
    };

    const res = await updateIndicePresupuestario(data); // Llamada a la API

    if (!res) {
      toast.error("Error al actualizar el índice presupuestario.");
      return;
    }

    if (!res.status.hasError) {
      toast.success("Índice Presupuestario actualizado con éxito.");
      router.refresh(); // Refresca la página
      setDialogOpen(false); // Cierra el modal
      return;
    } else {
      toast.error(
        res.data.message || "Error al actualizar el índice presupuestario."
      );
    }
  };

  return (
    <div className="w-full">
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

          {/* Campo Descripción */}
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción del índice presupuestario (opcional)"
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

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="mt-4"
          >
            Actualizar Índice Presupuestario
          </Button>
        </form>
      </Form>
    </div>
  );
};
