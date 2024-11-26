import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { AddIndicePresupuestarioGrid } from "./components/AddIndicePresupuestarioGrid";
import { getAllIndicePresupuestario } from "@/actions/mainteiner/indice-presupuestario/actions";

export default async function HomeIndicePresupuestario() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const indicePresupestario = await getAllIndicePresupuestario();

  return (
    <div>
      <Title title="Indices presupuestarios" />
      <DataTable columns={columns} data={indicePresupestario.data}>
        <AddIndicePresupuestarioGrid />
      </DataTable>
    </div>
  );
}
