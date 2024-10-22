import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getAllUnidad } from "@/actions/mainteiner/unidad/actions";
import { AddMecanismoGrid } from "./components/AddMecanimoGrid";
import { getAllMecanismo } from "@/actions/mainteiner/mecanismo-compra/actions";

export default async function HomeMecanismoCompra() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const mecanismos = await getAllMecanismo();

  return (
    <div>
      <Title title="Mecanismo de compra" />
      {/* {JSON.stringify(mecanismos)} */}
      <DataTable columns={columns} data={mecanismos.data}>
        <AddMecanismoGrid />
      </DataTable>
    </div>
  );
}
