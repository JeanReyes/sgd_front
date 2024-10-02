import { getAllMoney } from "@/actions/mainteiner/moneda/actions";
import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getAllUnidad } from "@/actions/mainteiner/unidad/actions";
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

  // console.log("funcionarios", funcionarios);

  // if (!funcionarios || funcionarios === undefined) {
  //   return (
  //     <>
  //       <h1>Error nuevo</h1>
  //     </>
  //   );
  // }

  return (
    <div>
      <Title title="Funcionario" />
      {/* <div className="flex justify-end">
        <AddFuncionarioGrid />
      </div> */}
      <DataTable columns={columns} data={funcionarios.data}>
        <AddFuncionarioGrid />
      </DataTable>
    </div>
  );
}
