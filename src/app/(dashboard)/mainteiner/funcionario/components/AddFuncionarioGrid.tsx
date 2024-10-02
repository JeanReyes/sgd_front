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
import { cleanRut, formatRUT, validarRUT } from "@/utils/rut-validate";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addFuncionario } from "@/actions/mainteiner/funcionario/actions";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format, setYear as setDateYear } from "date-fns";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  rut: z.string().refine((rut) => validarRUT(rut), {
    message: "RUT inválido",
  }),
  nombres: z.string(),
  apellidos: z.string(),
  fechaNacimiento: z.string(),
  estado: z.string(),
  correo: z.string().email({ message: "no es un correo valido" }),
});

const years = Array.from(
  { length: 124 },
  (_, i) => new Date().getFullYear() - i
);

export const AddFuncionarioGrid = () => {
  const [dialogOpen, seDialogOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      estado: "",
      correo: ""
    },
    mode: "onChange",
  });

  const [date, setDate] = useState<Date | undefined>();
  const [year, updateYear] = useState<number>(new Date().getFullYear());

  const handleDNIChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const formattedRut = formatRUT(e.target.value); // Formateamos el RUT
    field.onChange(formattedRut); // Actualizamos el valor en el formulario
  };

    const handleYearChange = (selectedYear: string) => {
      const newYear = parseInt(selectedYear, 10);
      updateYear(newYear);
      if (date) {
        const newDate = setDateYear(date, newYear);
        setDate(newDate);
      }
    };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const smallDate = date?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "-");

    const res = await addFuncionario({
      nombres: values.nombres,
      apellidos: values.apellidos,
      rut: cleanRut(values.rut).slice(0, -1), //values.rut,
      fechaNacimiento: smallDate,
      estado: values.estado,
      correo: values.correo,
    });

    if (!res) {
      toast.error("Error", {
        position: "top-right",
        description: "Intente denuevo",
      });
      return;
    }

    if (!res.status.hasError) {
      toast.success("Funcionario creado", {
        position: "top-right",
        description: res.data.message,
      });
      router.refresh();
      seDialogOpen(false);
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
      <div className="flex justify-end">
        <Button onClick={() => seDialogOpen(true)}>Agregar</Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={seDialogOpen}>
        <AlertDialogContent className="w-[95%]">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle >Nuevo funcionario</AlertDialogTitle>
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
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Nombres</FormLabel>
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
                      <FormLabel className="flex py-2">apellidos</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellidos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="my-2">
                  <Label className="flex py-2">Fecha de nacimiento</Label>
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
                      {/* Selector de año */}
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

                      {/* Calendario */}
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        month={date || new Date(year, 0)}
                        onMonthChange={(newMonth) => {
                          updateYear(newMonth.getFullYear()); // Asegura que el cambio de mes actualice el año
                          setDate(newMonth); // Sincroniza la nueva fecha seleccionada
                        }}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="rut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex py-2">Rut</FormLabel>
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
                      <FormLabel className="flex py-2">Correo</FormLabel>
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
                      <FormLabel className="flex py-2">Estado</FormLabel>
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
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
