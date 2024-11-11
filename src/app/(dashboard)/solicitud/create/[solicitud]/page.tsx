export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
import { Title } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { mapClasicacion } from "../../page";
import { CreateSolicitudGrid } from "../components/CreateSolicitudGrid";
import { getAllUnidad } from "@/actions/mainteiner/unidad/actions";
import { getAllMoney } from "@/actions/mainteiner/moneda/actions";
import { getAllIndicePresupuestario } from "@/actions/mainteiner/indice-presupuestario/actions";

export default async function HomeSolicitud({ params }: { params: { solicitud: string } }) {

  const currentDate = new Date();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate);


  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  if (!session) {
    redirect("/auth/login");
  }


    const [clasificaciones, unidades, monedas, indicePresupuestario] = await Promise.all([
      getAllClasificacion(),
      getAllUnidad(),
      getAllMoney(),
      getAllIndicePresupuestario()
    ]);
    

    const newClasificaciones = clasificaciones.data.map(
      (clasificacion: DataClasificacion) => {
        return {
          ...clasificacion,
          path: mapClasicacion[clasificacion.nombre],
        };
      }
    );

    const solicitudSelected = newClasificaciones.find(
      (clasificacion: DataClasificacion) => clasificacion.path === (params.solicitud as string)
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Title title={` ${solicitudSelected?.nombre}`} />
        <div className="flex items-baseline space-x-1">
          <span className="md:text-2xl font-bold">{day} </span>
          <span className="md:text-xl text-gray-400">{month} </span>
          <span className="md:text-lg text-gray-400 ">{year} </span>
        </div>
      </div>
      <CreateSolicitudGrid
        solitudes={newClasificaciones}
        solicitudSelected={solicitudSelected as DataClasificacion}
        unidades={unidades.data}
        cargosByRut={session?.user?.cargosActivos}
        monedas={monedas.data}
        indicePresupuestario={indicePresupuestario.data}
      />
    </div>
  );
}
