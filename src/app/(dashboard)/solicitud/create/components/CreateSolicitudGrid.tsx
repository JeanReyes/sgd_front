"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { Unidad } from "@/interfaces/unidad";
import { ICargosActivos } from "@/interfaces/session";
import { Money } from "@/interfaces/money";
import { Switch } from "@/components/ui/switch";
import AddItemModal from "./AddItemSolicitud";
import { IndicePresupestrario } from "@/interfaces/indice-presupuestario";
import {  Calculator } from "lucide-react";
import {
  handleformatCurrency,
  handleTransformItemToMoney,
  transformStringsToNumbers,
} from "@/utils/utils";
import { Indicators } from '../../../../../interfaces/money';
import EconomicIndicators from "./IndicatorsGrid";
import { TableRequisitos } from "./TableRequisitos";
import { MecanismoCompra } from "@/interfaces/mecanismo-compra";
import { PurchaseRequest } from "@/interfaces/solicitud";
import { addRequest } from "@/actions/solicitud/actions";
import { toast } from "sonner";

const purchaseSchema = z.object({
  cargoCreador: z.string().min(1, "Cargo es requerido"),
  idMecanismoDeCompra: z.string(),
  idMoneda: z.string().min(1, "Tipo de moneda es requerido"),
  materia: z.string(),
  items: z.array(
    z.object({
      cantidad: z.string().min(1),
      idUnidad: z.string(),
      descripcion: z.string(),
      precioUnitario: z.string(),
      idClasificacionPresupuestaria: z.string().min(0),
    })
  ),
  afectoIva: z.boolean(),
});

interface Props {
  solitudes: DataClasificacion[];
  solicitudSelected: DataClasificacion;
  unidades: Unidad[];
  cargosByRut: ICargosActivos[];
  monedas: Money[];
  indicePresupuestario: IndicePresupestrario[];
  indicators: Indicators[];
}

export interface ItemSolicitud {
  cantidad: string;
  idUnidad: string;
  descripcion: string;
  precioUnitario: string;
  idClasificacionPresupuestaria: string;
}
export type ItemFormValuesCreate = z.infer<typeof purchaseSchema>;

export const CreateSolicitudGrid = ({
  solitudes,
  solicitudSelected,
  unidades,
  cargosByRut,
  monedas,
  indicePresupuestario,
  indicators,
}: Props) => {


  const [items, setItems] = useState([] as ItemSolicitud[]);
  const [currentItem, setCurrentItem] = useState({
    cantidad: "",
    idUnidad: "",
    descripcion: "",
    idClasificacionPresupuestaria: "",
    precioUnitario: "",
  } as ItemSolicitud);

  const [valueInUtm, setValueInUtm] = useState(0);
  const [mecanismoSelected, setMecanismoSelected] = useState(
    {} as MecanismoCompra
  );

  const form = useForm({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      idMecanismoDeCompra: "",
      idMoneda: "",
      cargoCreador: "",
      materia: "",
      items: [] as ItemSolicitud[],
      afectoIva: true,
    },
  });

  const addItem = (item: ItemSolicitud) => {
    setItems([...items, { ...item }]);
    setCurrentItem({
      cantidad: "",
      idUnidad: "",
      descripcion: "",
      idClasificacionPresupuestaria: "",
      precioUnitario: "",
    });
  };

  const handleAfectoIva = () => {
    return items.reduce((sum, item) => {
      if (form.watch().afectoIva) {
        return sum + Number(item.precioUnitario) * Number(item.cantidad) * 1.19;
      }
      return sum + Number(item.precioUnitario) * Number(item.cantidad);
    }, 0);
  };

  const onSubmitRequest = async () => {
    let data = form.getValues();
    data.items = items;
    data.idMecanismoDeCompra = mecanismoSelected.idMecanismo!;

    const dataFinal: PurchaseRequest = transformStringsToNumbers(data);
    dataFinal.afectoIva = dataFinal.afectoIva ? 1 : 0;

    console.log(dataFinal);
    

    const newRequest = await addRequest(dataFinal);
    if (newRequest.status.code === 200) {
        toast.success("Solicitud creada exitosamente", {
          position: "top-right",
        });
        form.reset();
        setItems([]);
    }
  };

  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

 useEffect(() => {
   // transform items ingresdos a utm
   if (items.length > 0) {
     const totalRequest = handleAfectoIva();
     const selectedMoney = monedas.find(
       (m) => Number(m.id) === Number(form.watch().idMoneda)
     )?.codigo;

     setValueInUtm(
       handleTransformItemToMoney(
         totalRequest,
         indicators,
         selectedMoney as string
       ) as number
     );
   }
 }, [items, form.watch().afectoIva]);

// agregar 3 opciones de tamaño de letra para toda la plataforma
  return (
    <Card className="w-full  mx-auto">
      {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(currentItem, null, 2)}</pre> */}
      <CardContent>
        <EconomicIndicators indicators={indicators} />
        calculos: {valueInUtm}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitRequest)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="cargoCreador"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cargo <span className="text-red-800">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Moneda <span className="text-red-800">*</span>
                    </FormLabel>
                    <Select
                      disabled={items.length > 0}
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value} // Cambiado a `value` en lugar de `defaultValue`
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        {monedas.map((moneda: Money) => (
                          <SelectItem
                            value={String(moneda.id)}
                            key={String(moneda.id)}
                          >
                            {moneda.codigo} / {moneda.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="materia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex py-1">Materia</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Add item */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <AddItemModal
                  control={form.control}
                  onAddItem={addItem}
                  unidades={unidades}
                  monedas={monedas}
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
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index + 1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.cantidad}</TableCell>
                      <TableCell>{item.descripcion}</TableCell>
                      <TableCell>
                        {
                          unidades.find(
                            (u) => Number(u.id) === Number(item.idUnidad)
                          )?.nombre
                        }
                      </TableCell>
                      <TableCell>
                        {
                          indicePresupuestario.find(
                            (i) =>
                              Number(i.id) ===
                              Number(item.idClasificacionPresupuestaria)
                          )?.nombre
                        }
                      </TableCell>
                      <TableCell>
                        {handleformatCurrency(
                          String(
                            Number(item.precioUnitario) * Number(item.cantidad)
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => deleteItem(index)}>
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Calulate fiscal y Requisitos */}
            <div className="grid grid-cols-1 md:grid-cols-8 pt-5 gap-6">
              <div className="col-span-8 md:col-span-5">
                <TableRequisitos
                  valueInUtm={valueInUtm}
                  solicitudSelected={solicitudSelected}
                  items={items}
                  setMecanismoSelected={setMecanismoSelected}
                />
              </div>
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
                            Solicitud{" "}
                            {form.watch().afectoIva ? "afecta a" : "excenta de"}{" "}
                            IVA.{" "}
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
                      value={
                        form.watch().afectoIva
                          ? items.reduce(
                              (sum, item) =>
                                sum +
                                Number(item.precioUnitario) *
                                  Number(item.cantidad) *
                                  0.19,
                              0
                            )
                          : 0
                      }
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
            </div>

            {/* flujo destino */}
            <div className="space-y-4">
              {/* <FormField
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
              /> */}
            </div>

            <div className="flex justify-end">
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
