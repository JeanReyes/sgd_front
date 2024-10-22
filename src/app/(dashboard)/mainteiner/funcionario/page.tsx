import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { AddFuncionarioGrid } from "./components/AddFuncionarioGrid";
import { getAllFuncionario } from "@/actions/mainteiner/funcionario/actions";
import { redirect } from "next/navigation";

export default async function HomeFuncionario() {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  if (!session) {
    redirect("/auth/login");
  }

  const funcionarios = await getAllFuncionario();

  return (
    <div>
      <Title title="Funcionario" />
      <DataTable columns={columns} data={funcionarios.data}>
        <AddFuncionarioGrid />
      </DataTable>
    </div>
  );
}
