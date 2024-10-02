import { payments } from "@/data/payments.example";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const fetchData = async () => {
  return payments;
}

export default async function DataTablePage() {

  const data = await fetchData()

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}