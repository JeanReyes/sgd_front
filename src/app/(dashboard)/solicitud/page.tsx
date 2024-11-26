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

  return (
    <div>
      <Title title="Solicitudes pendientes" />
      {/* <pre>{JSON.stringify(solicitudes.data, null, 2)}</pre> */}
      <SolicitudListGrid clasificaciones={clasificaciones.data} />
      <DataTable columns={columns} data={solicitudes.data} />
    </div>
  );
}
