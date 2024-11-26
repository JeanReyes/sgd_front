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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Requisito } from "@/interfaces/requisito"; // Interfaz de Requisito
import { updateRequisito } from "@/actions/mainteiner/requisito/actions"; // Acción para actualizar el Requisito
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { extensiones, formatoBase } from "../utils/data";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  cantidad: z.string().min(1, "La cantidad es obligatoria"),
  obligatorio: z.boolean(),
  descripcion: z.string().optional(),
  extensiones: z.string().optional(),
  formatoBase: z.string().optional(),
  mecanismoCompraID: z.string().nullable().optional(),
});

interface Props {
  requisito: Requisito; // Datos iniciales del requisito
  setDialogOpen: (open: boolean) => void; // Función para cerrar el modal
}

export const UpdateRequisitoGrid = ({ requisito, setDialogOpen }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: requisito.nombre || "",
      cantidad: requisito.cantidad || "",
      obligatorio: requisito.obligatorio === "true" ? true : false, // Convertir a booleano
      descripcion: requisito.descripcion || "",
      extensiones: requisito.extensiones || "",
      formatoBase: requisito.formatoBase || "",
      mecanismoCompraID: requisito.mecanismoCompraID || null,
    },
    mode: "onChange", 
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      id: requisito.id, // Incluir el ID del requisito
      nombre: values.nombre,
      cantidad: values.cantidad,
      obligatorio: values.obligatorio ? "true" : "false", // Convertir de booleano a string
      descripcion: values.descripcion,
      extensiones: values.extensiones,
      formatoBase: values.formatoBase,
      mecanismoCompraID: values.mecanismoCompraID,
    };
    
    const res = await updateRequisito(data); // Llamada a la API

    if (!res) {
      toast.error("Error al actualizar el requisito.");
      return;
    }

    if (!res.status.hasError) {
      toast.success("Requisito actualizado con éxito.");
      router.refresh(); // Refresca la página
      setDialogOpen(false); // Cierra el modal
      return;
    } else {
      toast.error(res.data.message || "Error al actualizar el requisito.");
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
                  <Input placeholder="Nombre del requisito" {...field} />
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

          {/* Campo Descripción */}
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción del requisito (opcional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                        <SelectItem key={format.value} value={format.value}>
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

          {/* Botón de Envío */}
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="mt-4"
          >
            Actualizar Requisito
          </Button>
        </form>
      </Form>
    </div>
  );
};
