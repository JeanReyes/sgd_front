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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addUnidad } from "@/actions/mainteiner/unidad/actions";
import { Textarea } from "@/components/ui/textarea";

export type Money = {
  id: string;
  nombre: string;
  descripcion: string;
};

const formSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
});

export const AddMecanismoGrid = () => {
  const [dialogOpen, seDialogOpen] = useState(false);
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Nuevo Mecanismo</AlertDialogTitle>
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
