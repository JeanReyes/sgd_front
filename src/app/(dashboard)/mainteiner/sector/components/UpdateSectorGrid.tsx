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
import { Sector } from "@/interfaces/sector"; // Interfaz de Sector
import { updateSector } from "@/actions/mainteiner/sector/actions"; // Acción para actualizar Sector

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

interface Props {
  sector: Sector; // Datos iniciales del sector
  setDialogOpen: (open: boolean) => void; // Función para cerrar el modal
}

export const UpdateSectorGrid = ({ sector, setDialogOpen }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: sector.nombre || "",
      descripcion: sector.descripcion || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      id: sector.id, // Incluir el ID del sector
      nombre: values.nombre,
      descripcion: values.descripcion,
    };

    const res = await updateSector(data); // Llamada a la API

    if (!res) {
      toast.error("Error al actualizar el sector.");
      return;
    }

    if (!res.status.hasError) {
      toast.success("Sector actualizado con éxito.");
      router.refresh(); // Refresca la página
      setDialogOpen(false); // Cierra el modal
      return;
    } else {
      toast.error(res.data.message || "Error al actualizar el sector.");
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
                  <Input placeholder="Nombre del sector" {...field} />
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
                    placeholder="Descripción del sector (opcional)"
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
            Actualizar Sector
          </Button>
        </form>
      </Form>
    </div>
  );
};
