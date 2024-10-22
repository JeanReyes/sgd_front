export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
import { Title } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { description } from '../../../components/dashboard/charts/PieChart';
import { SolicitudListGrid } from "./components/SolicitudListGrid";
import { ApiClasificaciones, DataClasificacion } from "@/interfaces/clasificacion-compra";

const mapClasicacion = {
  "Trato Directo": "trato-directo",
  "Compra Agile": "compra-agile",
  "Convenio Marco": "convenio-marco",
  "Licitación Pública": "licitacion-publica",
  "Licitación Privada": "licitacion-privada",
  "Gran Compra": "gran-compra",
} as any


export default async function HomeSolicitud() {
    const cookieStore = cookies();
    const session = cookieStore.get("auth")?.value
      ? JSON.parse(cookieStore.get("auth")!.value)
      : null;

    if (!session) {
      redirect("/auth/login");
    }


  const clasificaciones = await getAllClasificacion();
  
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
