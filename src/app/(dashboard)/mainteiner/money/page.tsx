import { getAllMoney } from "@/actions/mainteiner/moneda/actions";
import { Title } from "@/components";
import { cookies } from "next/headers";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";

import { AddMoneyGrid } from "./components/AddMoneyGrid";

export default async function HomeMoneda() {

  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  

  const moneys = await getAllMoney()

  return (
    <div>
      <Title title="Moneda" />
      <div >
        <DataTable  columns={columns} data={moneys.data} >
          <AddMoneyGrid/>
        </DataTable>
      </div>
    </div>
  );
}
