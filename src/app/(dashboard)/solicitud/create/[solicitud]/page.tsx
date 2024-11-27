// export const dynamic = "force-dynamic";
// export const revalidate = 3600;

// import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
// import { Title } from "@/components";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { DataClasificacion } from "@/interfaces/clasificacion-compra";
// import { CreateSolicitudGrid } from "../components/CreateSolicitudGrid";
// import { getAllUnidad } from "@/actions/mainteiner/unidad/actions";
// import { getAllindicators, getAllMoney } from "@/actions/mainteiner/moneda/actions";
// import { getAllIndicePresupuestario } from "@/actions/mainteiner/indice-presupuestario/actions";

// export default async function HomeSolicitud({ params }: { params: { solicitud: string } }) {

//   const currentDate = new Date();
//   const day = currentDate.getDate();
//   const year = currentDate.getFullYear();
//   const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate);


//   const cookieStore = cookies();
//   const session = cookieStore.get("auth")?.value
//     ? JSON.parse(cookieStore.get("auth")!.value)
//     : null;

//   if (!session) {
//     redirect("/auth/login");
//   }


//     const [
//       clasificaciones,
//       unidades,
//       monedas,
//       indicePresupuestario,
//       indicators,
//     ] = await Promise.all([
//       getAllClasificacion(),
//       getAllUnidad(),
//       getAllMoney(),
//       getAllIndicePresupuestario(),
//       getAllindicators()
//     ]);
    
//     const solicitudSelected = clasificaciones.data.find(
//       (clasificacion: DataClasificacion) =>
//         clasificacion.path === (params.solicitud as string)
//     );

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-2">
//         <Title title={` ${solicitudSelected?.nombre}`} />
//         <div className="flex items-baseline space-x-1">
//           <span className="md:text-2xl font-bold">{day} </span>
//           <span className="md:text-xl text-gray-400">{month} </span>
//           <span className="md:text-lg text-gray-400 ">{year} </span>
//         </div>
//       </div>
//       <CreateSolicitudGrid
//         solitudes={clasificaciones.data}
//         solicitudSelected={solicitudSelected as DataClasificacion}
//         unidades={unidades.data}
//         cargosByRut={session?.user?.cargosActivos}
//         monedas={monedas.data}
//         indicePresupuestario={indicePresupuestario.data}
//         indicators={indicators.data}
//       />
//     </div>
//   );
// }

export const revalidate = 3600; // Revalida cada 1 hora.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
import { getAllUnidad } from "@/actions/mainteiner/unidad/actions";
import {
  getAllindicators,
  getAllMoney,
} from "@/actions/mainteiner/moneda/actions";
import { getAllIndicePresupuestario } from "@/actions/mainteiner/indice-presupuestario/actions";
import { Title } from "@/components";
import { CreateSolicitudGrid } from "../components/CreateSolicitudGrid";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { Unidad } from "@/interfaces/unidad";
import { ICargosActivos } from "@/interfaces/session";

export default async function HomeSolicitud({
  params,
}: {
  params: { solicitud: string };
}) {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  if (!session) {
    redirect("/auth/login");
  }

  const [clasificaciones, unidades] = await Promise.all([
    getAllClasificacion(),
    getAllUnidad(),
  ]);


  const solicitudSelected = clasificaciones.data.find(
    (clasificacion: DataClasificacion) =>
      clasificacion.path === (params.solicitud as string)
  );

  if (!solicitudSelected) {
    redirect("/404");
  }

  const currentDate = new Date();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    currentDate
  );

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-2">
        <Title title={` ${solicitudSelected.nombre}`} />
        <div className="flex items-baseline space-x-1">
          <span className="md:text-2xl font-bold">{day} </span>
          <span className="md:text-xl text-gray-400">{month} </span>
          <span className="md:text-lg text-gray-400">{year} </span>
        </div>
      </div>

      <Suspense fallback={<p>Cargando indicadores economicos...</p>}>
        <LazyLoadedGrid
          solitudes={clasificaciones.data}
          solicitudSelected={solicitudSelected}
          unidades={unidades.data}
          cargosByRut={session?.user?.cargosActivos}
        />
      </Suspense>
    </div>
  );
}

// Función para cargar datos secundarios de forma diferida
async function LazyLoadedGrid({
  solitudes,
  solicitudSelected,
  unidades,
  cargosByRut,
}: {
  solitudes: DataClasificacion[];
  solicitudSelected: DataClasificacion;
  unidades: Unidad[];
  cargosByRut: ICargosActivos[];
}) {
  const [monedas, indicePresupuestario, indicators] = await Promise.all([
    getAllMoney(),
    getAllIndicePresupuestario(),
    getAllindicators(),
  ]);

  return (
    <CreateSolicitudGrid
      solitudes={solitudes}
      solicitudSelected={solicitudSelected}
      unidades={unidades}
      cargosByRut={cargosByRut}
      monedas={monedas.data}
      indicePresupuestario={indicePresupuestario.data}
      indicators={indicators.data}
    />
  );
}
