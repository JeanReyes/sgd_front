"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUnidad } from "@/actions/mainteiner/unidad/actions";
import { Textarea } from "@/components/ui/textarea";
import { Unidad } from "../../../../../interfaces/unidad";


const formSchema = z.object({
  id: z.preprocess(
    (val) => parseInt(val as string, 10), // Convierte el valor a número
    z.number().int({ message: "Debe ser un número entero" }) // Asegura que es un número
  ),
  nombre: z.string(),
  descripcion: z.string(),
});

interface Props {
  unidad: Unidad;
  setDialogOpen: (value: boolean) => void;
}

export const UpdateUnidadGrid = ({ unidad, setDialogOpen }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: unidad,
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await updateUnidad({
      id: values.id,
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
      toast.success("Unidad actualizada", {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>id</FormLabel>
                <FormControl>
                  <Input disabled placeholder="id" {...field} />
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

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
