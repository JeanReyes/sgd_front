import { Title } from "@/components";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import { getAllDependencias } from "@/actions/mainteiner/dependencia/actions";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getAllTipoDependencias } from "@/actions/mainteiner/tipo-dependencia/actions";
import { getAllSector } from "@/actions/mainteiner/sector/actions";
import { AddTipoDependenciaGrid } from "./components/AddTipoDependenciaGrid";

export default async function HomeclasificacionCompra() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const tipoDependencias = await getAllTipoDependencias();

  return (
    <div>
      <Title title="Tipos de Dependencias Municipales" />
      <DataTable columns={columns} data={tipoDependencias.data}>
        <AddTipoDependenciaGrid />
      </DataTable>
    </div>
  );
}
