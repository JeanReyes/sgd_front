import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { AddrequisitoGrid } from "./components/AddRequisitoGrid";
import { redirect } from "next/navigation";
import { getAllRequisito } from "@/actions/mainteiner/requisito/actions";

export default async function RequisitoscionCompra() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  if (!session) {
    redirect("/auth/login");
  }

  const requisitos = await getAllRequisito();

  return (
    <div>
      <Title title="Requisitos" />
      <DataTable columns={columns} data={requisitos.data}>
        <AddrequisitoGrid />
      </DataTable>
    </div>
  );
}
