export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
import { Title } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SolicitudListGrid } from "./components/SolicitudListGrid";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { getAllSolicitud } from "@/actions/solicitud/actions";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";

export const mapClasicacion = {
  "Trato Directo": "trato-directo",
  "Compra Ágile": "compra-agile",
  "Convenio Marco": "convenio-marco",
  "Licitación Pública": "licitacion-publica",
  "Licitación Privada": "licitacion-privada",
  "Gran Compra": "gran-compra",
} as any;


export default async function HomeSolicitud() {
    const cookieStore = cookies();
    const session = cookieStore.get("auth")?.value
      ? JSON.parse(cookieStore.get("auth")!.value)
      : null;

    if (!session) {
      redirect("/auth/login");
    }


  const clasificaciones = await getAllClasificacion();
  const solicitudes = await getAllSolicitud();
  
  const newClasificaciones = clasificaciones.data.map(
    (clasificacion: DataClasificacion) => {
      return {
        ...clasificacion,
        path: mapClasicacion[clasificacion.nombre],
      };
    }
  );


  return (
    <div>
      <Title title="Solicitudes" />
      {/* <pre>{JSON.stringify(solicitudes.data, null, 2)}</pre> */}
      <SolicitudListGrid clasificaciones={newClasificaciones} />
      <DataTable columns={columns} data={solicitudes.data}/>
     
    </div>
  );
}
