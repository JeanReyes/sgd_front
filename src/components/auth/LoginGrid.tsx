'use client'

import { logIn } from "@/actions/auth/actions";
import { Session } from "@/interfaces/session";
import { useSession } from "@/store/session/session.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatRUT } from "@/utils/rut-validate";
import { cleanRut } from '../../utils/rut-validate';

//https://www.npmjs.com/package/zod
const formSchema = z.object({
  rut: z.string(),
  password: z.string(),
});

export const LoginGrid = () => {

  const router = useRouter();
  const signIn = useSession((store) => store.signIn)
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        rut: "",
        password: ""
      },
      mode: 'onChange'
    });

     const handleDNIChange = (
       e: React.ChangeEvent<HTMLInputElement>,
       field: any
     ) => {
       const formattedRut = formatRUT(e.target.value); // Formateamos el RUT
       field.onChange(formattedRut); // Actualizamos el valor en el formulario
     };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

      const res = await logIn({
        rut: cleanRut(values.rut),
        password: values.password,
      });

      if (!res) {
        toast.error("Error", {
          position: "top-right",
          description: "Intente denuevo",
        });
        return
      }

      if (!res.status.hasError) {
        signIn(res.data as Session)
        router.push("/")
          return
        }  else {
          toast.error("Error", {
            position: "top-right",
            description: res.data.message,
          });
        }
    }

    return (
      <Card className="flex flex-col pb-5 w-[80%] sm:w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Acceso</CardTitle>
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
                  name="rut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rut</FormLabel>
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
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
}

