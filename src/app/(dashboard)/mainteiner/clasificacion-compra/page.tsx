
import { cookies } from "next/headers";
import  ManteinerGrid  from "./components/ManteinerGrid";
import { getAllClasificacion } from "@/actions/mainteiner/clasificacion-compra/actions";
import { getAllRequisitoAvailable } from "@/actions/mainteiner/requisito/actions";
import { getAllDependencias } from "@/actions/mainteiner/dependencia/actions";

export default async function HomeclasificacionCompra() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const clasificaciones = await getAllClasificacion();
  const requisitosAvailable = await getAllRequisitoAvailable();
  const dependencias = await getAllDependencias();

  return (
    <div>
      <ManteinerGrid
        clasificaciones={clasificaciones.data}
        requisitosAvailable={requisitosAvailable.data}
        dependencias={dependencias.data}
      />
    </div>
  );

}
