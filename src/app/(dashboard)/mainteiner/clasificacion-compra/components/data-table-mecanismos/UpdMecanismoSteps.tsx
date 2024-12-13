import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MecanimosUpd, MecanismoCompra } from "@/interfaces/mecanismo-compra";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
import { DetailMecanismoUpd } from "./steps-update/DetailMecanismoUpd";
import { Requisito } from "@/interfaces/requisito";
import { Dependencia } from "@/interfaces/dependencia";
import { SelectRequisitoUpd } from "./steps-update/SelectRequisitoUpd";
import { SelectDependenciaUpd } from "./steps-update/SelectDependenciaUpd";
import { ResumeMecanismoUpd } from "./steps-update/ResumeMecanismoUpd";
import { updateMecanismo } from "@/actions/mainteiner/mecanismo-compra/actions";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { useRouter } from "next/navigation";

export interface NewMecanismo {
  current: MecanismoCompra;
  other: MecanismoCompra[];
}


interface Props {
  mecanismo: MecanismoCompra;
  allMecanismos: MecanismoCompra[];
  dialogOpen: boolean;
  requisitosAvailable: Requisito[];
  dependencias: Dependencia[];
  selectedtipo: DataClasificacion;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdMecanismoSteps = ({
  dialogOpen,
  mecanismo,
  allMecanismos,
  requisitosAvailable,
  dependencias,
  selectedtipo,
  setDialogOpen,
}: Props) => {
  const router = useRouter();
  const [mecanismosAfectados, setMecanismosAfectados] = useState<
    { mecanismo: MecanismoCompra; nuevoMinimo: string; nuevoMaximo: string }[]
  >([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [redundantes, setRedundantes] = useState<MecanismoCompra[]>([]);
  const [actualizados, setActualizados] = useState<string[]>([]);
  const [dataUpd, setDataUpd] = useState<NewMecanismo>(
    {
      current: mecanismo,
      other: [],
    },
  );

  const handleCleanState = () => {
    // setCurrentStep(0);
    setActualizados([]);
    setRedundantes([]);
    setMecanismosAfectados([]);
    setDataUpd({
      current: mecanismo,
      other: [] as MecanismoCompra[],
    });
  };

  const handleActualizar = async () => {
    try {
      // actualizar el mecanismo solapado
      if (dataUpd.other.length > 0) {
        for (const mecanismo of dataUpd.other as MecanismoCompra[]) {
          const otroMecanismo = {
            id: mecanismo.idMecanismo,
            nombre: mecanismo.nombre,
            montoMinimo: mecanismo.montoMinimo,
            montoMaximo: mecanismo.montoMaximo,
            comentario: "",
            monedaID: mecanismo.moneda.id,
            clasificacionCompraID: String(selectedtipo.idClasificacion),
            requisitos: mecanismo.requisitos.map((r) => r.id),
            rutas: mecanismo.rutas.map((r: Dependencia) => r.id),
          } as MecanimosUpd;

          const res = await updateMecanismo(otroMecanismo);
          if (!res.status.hasError) {
            toast.success(`mecanismo actualizado: ${otroMecanismo.nombre}`, {
              position: "top-right",
              description: res.data.message,
            });
            router.refresh();
            setDialogOpen(false);
            // form.reset();
          } else {
            toast.error("Error", {
              position: "top-right",
              description: res.data.message,
            });
          }
      } 
    }
      
      const mecanimosUpd = {
        id: dataUpd.current.idMecanismo,
        nombre: dataUpd.current.nombre,
        montoMinimo: dataUpd.current.montoMinimo,
        montoMaximo: dataUpd.current.montoMaximo,
        comentario: "",
        monedaID: dataUpd.current.moneda.id,
        clasificacionCompraID: String(selectedtipo.idClasificacion),
        requisitos: dataUpd.current.requisitos.map((r) => r.id),
        rutas: dataUpd.current.rutas.map((r: Dependencia) => r.id),
      };

      console.log("1",mecanimosUpd.rutas);
      
      console.log(dataUpd.current.rutas.map((r: Dependencia) => r));
      

      const res = await updateMecanismo(mecanimosUpd);
      if (!res.status.hasError) {
        toast.success(`mecanismo actualizado: ${mecanimosUpd.nombre}`, {
          position: "top-right",
          description: res.data.message,
        });
        router.refresh();
        setDialogOpen(false);
        // form.reset();
      } else {
        toast.error("Error", {
          position: "top-right",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      alert(`Error al actualizar el mecanismo "${mecanismo.nombre}".`);
    }
  };

  return (
    <>
      <div className="flex ">
        <Button onClick={() => setDialogOpen(true)}>
          <FaRegEdit />
        </Button>
      </div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="md:min-w-[1000px] w-[95%] max-h-[90vh] overflow-y-auto p-4  md:w-auto">
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Actualizar Mecanismo</AlertDialogTitle>
              <AlertDialogCancel onClick={() => handleCleanState()}>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <div className="w-full gap-4 flex">
            <div className="flex flex-col gap-4 md:flex-row  p-4 w-full border rounded-lg mb-4">
              <Tabs
                className="w-full"
                defaultValue="step1"
                value={`step${currentStep + 1}`}
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    className="w-full"
                    value="step1"
                    onClick={() => setCurrentStep(0)}
                  >
                    Paso 1: Información Básica
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full"
                    value="step2"
                    onClick={() => setCurrentStep(1)}
                  >
                    Paso 2: Asociar Requisitos
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full"
                    value="step3"
                    onClick={() => setCurrentStep(2)}
                  >
                    Paso 3: Ruta del Mecanismo
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full"
                    value="step4"
                    onClick={() => setCurrentStep(3)}
                  >
                    Paso 4: Resumen mecanismo
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="step1">
                  <DetailMecanismoUpd
                    mecanismo={mecanismo}
                    allMecanismos={allMecanismos}
                    mecanismosAfectados={mecanismosAfectados}
                    redundantes={redundantes}
                    actualizados={actualizados}
                    setActualizados={setActualizados}
                    setRedundantes={setRedundantes}
                    setMecanismosAfectados={setMecanismosAfectados}
                    setCurrentStep={setCurrentStep}
                    setDataUpd={setDataUpd}
                  />
                </TabsContent>

                {/* Placeholder para los siguientes pasos */}
                <TabsContent value="step2">
                  <SelectRequisitoUpd
                    requisitosAvailable={requisitosAvailable}
                    dataUpd={dataUpd}
                    setDataUpd={setDataUpd}
                    setCurrentStep={setCurrentStep}
                  />
                </TabsContent>
                {/* <pre>
                  <code>{JSON.stringify(dataUpd.current.rutas, null, 2)}</code>
                </pre> */}
                <TabsContent value="step3">
                  <SelectDependenciaUpd
                    dependencias={dependencias}
                    selectedDependencies={dataUpd.current.rutas}
                    dataUpd={dataUpd}
                    setDataUpd={setDataUpd}
                    setStep={setCurrentStep}
                  />
                </TabsContent>

                <TabsContent value="step4">
                  <ResumeMecanismoUpd
                    dataUpd={dataUpd}
                    mecanismosAfectados={mecanismosAfectados}
                    actulizarMecanismo={handleActualizar}
                    setCurrentStep={setCurrentStep}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

