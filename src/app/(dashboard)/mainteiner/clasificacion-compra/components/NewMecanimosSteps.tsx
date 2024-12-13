
import React, { SetStateAction, useState } from 'react'
import { DataClasificacion } from '@/interfaces/clasificacion-compra';
import { NewMecanismo } from './NuevoMecanimosForType';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Requisito } from '@/interfaces/requisito';
import { SelectDependency } from './steps/SelectDependency';
import { Dependencia } from '@/interfaces/dependencia';
import { DetailMecanimo } from './steps/DetailMecanimo';
import { SelectRequisitos } from './steps/SelectRequisitos';
import { CreateMecanismo } from '@/interfaces/mecanismo-compra';
import { ResumeMecanismo } from './steps/ResumeMecanismo';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { addMecanismo } from '@/actions/mainteiner/mecanismo-compra/actions';


interface Props {
  tiposDeCompra: DataClasificacion[];
  selectedTipo: DataClasificacion;
  dataMecanismo: NewMecanismo;
  requisitosAvailable: Requisito[];
  dependencias: Dependencia[];
  setDataMecanismo: React.Dispatch<SetStateAction<NewMecanismo>>;
}


export const NewMecanimosSteps = ({
  tiposDeCompra,
  selectedTipo,
  dataMecanismo,
  requisitosAvailable,
  dependencias,
  setDataMecanismo
}: Props) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const createMecanismo = async() => {

    const nuevoMecanismo: CreateMecanismo = {
      nombre: dataMecanismo.detail.nombreMecanismo,
      montoMinimo: String(dataMecanismo.detail.rangoMin),
      montoMaximo: String(dataMecanismo.detail.rangoMax),
      comentario: dataMecanismo.detail.nombreMecanismo,
      monedaID: "2",
      requisitos: dataMecanismo.requisitos.map((r) => r.id),
      clasificacionCompraID: String(selectedTipo.idClasificacion),
      rutas: dataMecanismo.rutas.map((r) => r.id),
    };

    console.log(nuevoMecanismo);
        const res = await addMecanismo(nuevoMecanismo); // Llamada a la API para agregar dependencia

        if (!res) {
          toast.error("Error", {
            position: "top-right",
            description: "Intente de nuevo",
          });
          return;
        }

        if (!res.status.hasError) {
          toast.success("Dependencia creada", {
            position: "top-right",
            description: res.data.message,
          });
          router.refresh();
          return;
        } else {
          toast.error("Error", {
            position: "top-right",
            description: res.data.message,
          });
        }
    
    // Actualizar el estado con el nuevo mecanismo
    // const nuevosTiposDeCompra = tiposDeCompra.map((tipo) => {
    //   if (tipo.idClasificacion === selectedTipoId) {
    //     return {
    //       ...tipo,
    //       mecanismosCompra: [...tipo.mecanismosCompra, nuevoMecanismo],
    //     };
    //   }
    //   return tipo;
    // });
  }

  return (
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
              disabled={currentStep !== 0}
            >
              Paso 1: Información Básica
            </TabsTrigger>
            <TabsTrigger
              className="w-full"
              value="step2"
              disabled={currentStep !== 1}
            >
              Paso 2: Asociar Requisitos
            </TabsTrigger>
            <TabsTrigger
              className="w-full"
              value="step3"
              disabled={currentStep !== 2}
            >
              Paso 3: Ruta del Mecanismo
            </TabsTrigger>
            <TabsTrigger
              className="w-full"
              value="step4"
              disabled={currentStep !== 3}
            >
              Paso 4: Resumen mecanismo
            </TabsTrigger>
          </TabsList>

          {/* Paso 1: Información Básica */}
          <TabsContent value="step1">
            <DetailMecanimo
              dataMecanismo={dataMecanismo}
              selectedTipoId={selectedTipo.idClasificacion}
              tiposDeCompra={tiposDeCompra}
              setCurrentStep={setCurrentStep}
              setDataMecanismo={setDataMecanismo}
            />
          </TabsContent>

          {/* Placeholder para los siguientes pasos */}
          <TabsContent value="step2">
            <SelectRequisitos
              requisitosAvailable={requisitosAvailable}
              dataMecanismo={dataMecanismo}
              setDataMecanismo={setDataMecanismo}
              setCurrentStep={setCurrentStep}
            />
          </TabsContent>

          <TabsContent value="step3">
            <SelectDependency
              selectedDependencies={dataMecanismo.rutas}
              dependencias={dependencias}
              setStep={setCurrentStep}
              setDataMecanismo={setDataMecanismo}
            />
          </TabsContent>

          <TabsContent value="step4">
            {/* <pre>{JSON.stringify(dataMecanismo, null, 2)}</pre> */}
            <ResumeMecanismo
              dataMecanismo={dataMecanismo}
              createMecanismo={createMecanismo}
              setCurrentStep={setCurrentStep}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
