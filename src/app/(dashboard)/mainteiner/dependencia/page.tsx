import { Title } from "@/components";
import { cookies } from "next/headers";

import { getAllDependencias } from "@/actions/mainteiner/dependencia/actions";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { AddDependenciaGrid } from "./components/AddDependenciaGrid";
import { getAllTipoDependencias } from "@/actions/mainteiner/tipo-dependencia/actions";
import { getAllSector } from "@/actions/mainteiner/sector/actions";

export default async function HomeclasificacionCompra() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const dependencias = await getAllDependencias();
  const tipoDependencias = await getAllTipoDependencias();
  const sectores = await getAllSector();


  return (
    <div>
      <Title title="Dependencias Municipales" />
      <DataTable
        columns={columns}
        data={dependencias.data}
        tipoDependencias={tipoDependencias.data}
        sectores={sectores.data}
      >
        <AddDependenciaGrid
          tipoDependencias={tipoDependencias.data}
          sectores={sectores.data}
        />
      </DataTable>
    </div>
  );
}
