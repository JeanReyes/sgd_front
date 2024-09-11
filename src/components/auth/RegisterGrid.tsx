"use client";

import { logIn, register } from "@/actions/auth/actions";
import { Session } from "@/interfaces/session";
import { useSession } from "@/store/session/session.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { cleanRut, formatRUT, validarRUT } from "@/utils/rut-validate";


//https://www.npmjs.com/package/zod
const formSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  dni: z.string().refine((dni) => validarRUT(dni), {
    message: "RUT inválido",
  }),
  correo: z.string().email({ message: "no es un correo valido" }),
  role: z.enum(["MANAGER", "ADMIN"], { message: "Seleccione un rol" }),
});

export const RegisterGrid = () => {
  const router = useRouter();
  const signIn = useSession((store) => store.signIn);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      correo: "",
      role: undefined
    },
    mode: "onChange",
  });

  // Llamamos a formatRUT en el evento onChange
  const handleDNIChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const formattedRut = formatRUT(e.target.value); // Formateamos el RUT
    field.onChange(formattedRut); // Actualizamos el valor en el formulario
  };


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.dni = cleanRut(values.dni)
  
    const res = await register({
      nombres: values.nombres,
      apellidos: values.apellidos,
      dni: cleanRut(values.dni),
      correo: values.correo,
      role: values.role,
    });

    if (!res) {
      toast.error("Error", {
        position: "top-right",
        description: "Intente denuevo",
      });
      return;
    }

    if (!res.status.hasError) {
      toast.success("Usuario creado", {
        position: "top-right",
        description: res.data.message,
      });
      return;
    } else {
      toast.error("Error", {
        position: "top-right",
        description: res.data.message,
      });
    }
  };

  return (
    <Card className="flex flex-col pb-5 w-[80%] sm:w-[400px]">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Registrar Usuario
        </CardTitle>
        <CardDescription className="text-center">
          Bienbenido a NES/CORP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Apllellidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dni</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dni"
                        value={field.value} // El valor formateado
                        onChange={(e) => handleDNIChange(e, field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione Rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="MANAGER">MANAGER</SelectItem>
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
                variant={"destructive"}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
