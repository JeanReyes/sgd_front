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
import { Funcionario } from '../interfaces/funcionario';
import { formatRUT, validarRUT } from "@/utils/rut-validate";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";


const formSchema = z.object({
  rut: z.string().refine((rut) => validarRUT(rut), {
    message: "RUT inválido",
  }),
  nombres: z.string(),
  apellidos: z.string(),
  fechaNacimiento: z.string().nullable(),
  estado: z.string(),
  correo: z.string().email({ message: "no es un correo valido" }),
});

interface Props {
  funcionario: Funcionario;
  setDialogOpen: (value: boolean) => void;
}

export const UpdateUnidadGrid = ({ funcionario, setDialogOpen }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: funcionario,
    mode: "onChange",
  });

   const handleDNIChange = (
     e: React.ChangeEvent<HTMLInputElement>,
     field: any
   ) => {
     const formattedRut = formatRUT(e.target.value); // Formateamos el RUT
     field.onChange(formattedRut); // Actualizamos el valor en el formulario
   };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const res = await updateUnidad({
    //   id: values.id,
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
    //   toast.success("Unidad actualizada", {
    //     position: "top-right",
    //     description: res.data.message,
    //   });
    //   router.refresh();
    //   setDialogOpen(false);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
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
                <FormLabel>apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="my-2">
            <Label>Fecha de nacimiento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
               
                <Select
                  onValueChange={(selectedYear) =>
                    handleYearChange(selectedYear)
                  }
                >
                  <SelectTrigger className="w-[140px] mx-auto my-2">
                    <SelectValue>{year}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

      
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={date || new Date(year, 0)}
                  onMonthChange={(newMonth) => {
                    updateYear(newMonth.getFullYear()); 
                    setDate(newMonth);
                  }}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div> */}
          <FormField
            control={form.control}
            name="rut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rut</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rut"
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
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                    <SelectItem value="BLOQUEADO">BLOQUEADO</SelectItem>
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
          >
            Submit
          </Button>

          {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Select onValueChange={handleYearChange}>
                      <SelectTrigger className="w-[140px] mx-auto my-2">
                        <SelectValue>{year}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y.toString()}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      month={date || new Date(year, 0)}
                      onMonthChange={(newMonth) => {
                        updateYear(newMonth.getFullYear());
                      }}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover> */}
        </form>
      </Form>
    </div>
  );
};
