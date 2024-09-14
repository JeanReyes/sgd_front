import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getAllUnidad } from "@/actions/mainteiner/unidad/actions";
import { AddUnidadGrid } from "./components/AddUnidadGrid";

export default async function HomeclasificacionCompra() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const clasificaciones = await getAllUnidad();

  return (
    <div>
      <Title title="Clasificación de la compra" />
      {/* <div className="flex justify-end">
        <AddUnidadGrid />
      </div>
      <DataTable columns={columns} data={unidades.data} /> */}
    </div>
  );
}
