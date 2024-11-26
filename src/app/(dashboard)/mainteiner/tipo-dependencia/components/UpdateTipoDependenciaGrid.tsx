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
import { TipoDependencia } from "@/interfaces/tipo-dependencia"; // Supuesta interfaz de TipoDependencia
import { updateTipoDependencia } from "@/actions/mainteiner/tipo-dependencia/actions";


// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

interface Props {
  tipoDependencia: TipoDependencia; // Datos iniciales del tipo de dependencia
  setDialogOpen: (open: boolean) => void; // Función para cerrar el modal
}

export const UpdateTipoDependenciaGrid = ({
  tipoDependencia,
  setDialogOpen,
}: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: tipoDependencia.nombre || "",
      descripcion: tipoDependencia.descripcion || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      id: +tipoDependencia.id, // Asegúrate de incluir el ID para identificar el registro
      nombre: values.nombre,
      descripcion: values.descripcion,
    };

    const res = await updateTipoDependencia(data); // Llamada a la API para actualizar

    if (!res) {
      toast.error("Error al actualizar el tipo de dependencia.");
      return;
    }

    if (!res.status.hasError) {
      toast.success("Tipo de Dependencia actualizado con éxito.");
      router.refresh();
      setDialogOpen(false); // Cierra el modal
      return;
    } else {
      toast.error(
        res.data.message || "Error al actualizar el tipo de dependencia."
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
                    placeholder="Nombre del tipo de dependencia"
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
                    placeholder="Descripción del tipo de dependencia (opcional)"
                    {...field}
                  />
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
            Actualizar Tipo de Dependencia
          </Button>
        </form>
      </Form>
    </div>
  );
};
