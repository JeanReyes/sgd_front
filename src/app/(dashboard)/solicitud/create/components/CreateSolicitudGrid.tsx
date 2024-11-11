"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { Unidad } from "@/interfaces/unidad";
import { ICargosActivos } from "@/interfaces/session";
import { Money } from "@/interfaces/money";
import { Switch } from "@/components/ui/switch";
import AddItemModal from "./AddItemSolicitud";
import { IndicePresupestrario } from "@/interfaces/indice-presupuestario";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { Requisito } from "@/interfaces/requisito";
import { Upload, FileText, Calculator } from "lucide-react";
import { Label } from "recharts";
import { handleformatCurrency } from "@/utils/utils";

const purchaseSchema = z.object({
  requestNumber: z.string(),
  idMecanismoDeCompra: z.string(),
  idMoneda: z.string().min(1, "Tipo de moneda es requerido"),
  date: z.string(),
  cargoCreador: z.string().min(1, "Cargo es requerido"),
  // area: z.string().min(1, "Área es requerida"),
  // unit: z.string().min(1, "Unidad es requerida"),
  items: z.array(
    z.object({
      cantidad: z.number().min(1),
      idUnidad: z.number(),
      description: z.string(),
      precioUnitario: z.string(),
      idClasificacionPresupuestraria: z.number().min(0),
    })
  ),
  afectoIva: z.boolean(),
  totalNet: z.number(),
  vat: z.number(),
  totalGross: z.number(),
  destination: z.string(),
  program: z.string(),
});

interface Props {
  solitudes: DataClasificacion[];
  solicitudSelected: DataClasificacion;
  unidades: Unidad[];
  cargosByRut: ICargosActivos[];
  monedas: Money[];
  indicePresupuestario: IndicePresupestrario[];
}

interface ItemSolicitud {
  cantidad: string;
  idUnidad: string;
  description: string;
  precioUnitario: string;
  idClasificacionPresupuestraria: string;
}

export const CreateSolicitudGrid = ({
  solitudes,
  solicitudSelected,
  unidades,
  cargosByRut,
  monedas,
  indicePresupuestario,
}: Props) => {
  const [items, setItems] = useState([] as ItemSolicitud[]);
  const [currentItem, setCurrentItem] = useState({
    cantidad: "",
    idUnidad: "",
    description: "",
    idClasificacionPresupuestraria: "",
    precioUnitario: "",
  } as ItemSolicitud);

  const form = useForm({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      requestNumber: "",
      idMecanismoDeCompra: "",
      idMoneda: "",
      cargoCreador: "",
      date: "",
      items: [],
      afectoIva: false,
      totalNet: 0,
      vat: 0,
      totalGross: 0,
      destination: "",
      program: "",
    },
  });

  const addItem = (item: ItemSolicitud) => {
    setItems([...items, { ...item }]);
    setCurrentItem({
      cantidad: "",
      idUnidad: "",
      description: "",
      idClasificacionPresupuestraria: "",
      precioUnitario: "",
    });
  };

  const handleAfectoIva = () => {
    return items.reduce((sum, item) => {
      if (form.watch().afectoIva) {
        return (
          sum + ((Number(item.precioUnitario) * Number(item.cantidad)) * 1.19) 
        );
      }
      return sum + Number(item.precioUnitario) * Number(item.cantidad);
    }, 0);
  };

  const handleRequisitos = () => {
      const mecanismo = solicitudSelected.mecanismosCompra.find(
        (mecanismo: MecanismoCompra) => mecanismo.idMecanismo === form.watch().idMecanismoDeCompra
      )

  return (
      <div>
        <span className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          Requerimientos
        </span>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Nombre del Requisito</TableHead>
              <TableHead className="text-left">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mecanismo?.requisitos.map((requisito: Requisito, index) => (
              <TableRow key={index}>
                <TableCell className="text-sm font-medium">
                  {requisito.nombre}
                </TableCell>
                <TableCell>
                  <div className="rounded-lg border border-dashed p-2 transition-colors flex flex-col items-center">
                    <Upload className="h-4 w-4 text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">
                      Arrastre archivos aquí o haga clic para seleccionar
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  const onSubmit = () => {
    console.log("Valores del formulario:", form.getValues()); // Revisa los valores aquí
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>{/* <CardTitle>{params.solicitud}</CardTitle> */}</CardHeader>
      {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(currentItem, null, 2)}</pre> */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <FormField
                control={form.control}
                name="requestNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nro de Solicitud</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Solicitud de Compra N° XXX"
                        {...field}
                        value={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="idMecanismoDeCompra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mecanismo de compra</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Mecanismo de compra" />
                      </SelectTrigger>
                      <SelectContent>
                        {solicitudSelected.mecanismosCompra.map(
                          (mecanismo: MecanismoCompra) => (
                            <SelectItem
                              value={String(mecanismo.idMecanismo)}
                              key={String(mecanismo.idMecanismo)}
                            >
                              {mecanismo.nombre}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de ingreso</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="date"
                        {...field}
                        value={
                          field.value || new Date().toISOString().split("T")[0]
                        } // Fecha actual por defecto
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="cargoCreador"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {cargosByRut.map((cargo: Unidad) => (
                          <SelectItem
                            value={String(cargo.id)}
                            key={String(cargo.id)}
                          >
                            {cargo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idMoneda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moneda</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value} // Cambiado a `value` en lugar de `defaultValue`
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        {monedas.map((moneda: Money) => (
                          <SelectItem
                            value={String(moneda.idMoneda)}
                            key={String(moneda.idMoneda)}
                          >
                            {moneda.codigo} / {moneda.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Add item */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <AddItemModal
                  onAddItem={addItem}
                  unidades={unidades}
                  indicePresupuestario={indicePresupuestario}
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N°</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Detalle o Descripción</TableHead>
                    <TableHead>Unidad de Medida</TableHead>
                    <TableHead>Clasificación Presupuestaria</TableHead>
                    <TableHead>Precio Neto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index + 1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.idUnidad}</TableCell>
                      <TableCell>
                        {item.idClasificacionPresupuestraria}
                      </TableCell>
                      <TableCell>
                        $
                        {handleformatCurrency(
                          String(
                            Number(item.precioUnitario) * Number(item.cantidad)
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

              {/* Calulate fiscal y Requisitos */}
            <div className="grid grid-cols-1 md:grid-cols-8 pt-5 gap-6">
              <div className="col-span-8 md:col-span-3">
                <span className="flex items-center gap-1">
                  <Calculator className="w-4 h-4" />
                  Calculos de IVA
                </span>
                <div className="flex items-center gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="afectoIva"
                    render={({ field }) => (
                      <FormItem className="flex flex-row w-full items-center justify-between rounded-lg border p-4 col-span-1 sm:col-span-2">
                        <div className="space-y-0.5">
                          <FormDescription>
                            Solicitud afecta a IVA.{" "}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span>Total Neto:</span>
                    <Input
                      className="w-40"
                      readOnly
                      value={items.reduce(
                        (sum, item) =>
                          sum +
                          Number(item.precioUnitario) * Number(item.cantidad),
                        0
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>IVA:</span>
                    <Input
                      className="w-40"
                      readOnly
                      value={items.reduce(
                        (sum, item) =>
                          sum +
                          Number(item.precioUnitario) *
                            Number(item.cantidad) *
                            0.19,
                        0
                      )}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>Total Bruto:</span>
                    <Input
                      className="w-40"
                      readOnly
                      value={handleAfectoIva()}
                    />
                  </div>
                </div>
              </div>
             
              <div className="col-span-8 md:col-span-5">{handleRequisitos()}</div>
            </div>

            {/* flujo destino */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione destino" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="destino1">Destino 1</SelectItem>
                        <SelectItem value="destino2">Destino 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Programa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione programa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="programa1">Programa 1</SelectItem>
                        <SelectItem value="programa2">Programa 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full flex items-end md:w-[400px]"
              >
                Crear {solicitudSelected.nombre}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
