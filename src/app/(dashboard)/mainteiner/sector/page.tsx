import { Title } from "@/components";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import { getAllDependencias } from "@/actions/mainteiner/dependencia/actions";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getAllTipoDependencias } from "@/actions/mainteiner/tipo-dependencia/actions";
import { getAllSector } from "@/actions/mainteiner/sector/actions";
import { AddSectorGrid } from "./components/AddSectorGrid";

export default async function HomeSector() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const sectores = await getAllSector();

  return (
    <div>
      <Title title="Sector Municiapal" />
      <DataTable columns={columns} data={sectores.data}>
        <AddSectorGrid />
      </DataTable>
    </div>
  );
}
