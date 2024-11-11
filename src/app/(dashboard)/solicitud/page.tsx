export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
import { Title } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SolicitudListGrid } from "./components/SolicitudListGrid";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";

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

  console.log(clasificaciones);
  
  
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
      <SolicitudListGrid clasificaciones={newClasificaciones} />
    </div>
  );
}
