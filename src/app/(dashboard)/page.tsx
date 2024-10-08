import { Title } from "@/components";
import { titleFont } from "../config/fonts";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";

export default function HomeDashboard() {
  const BASE_URL = process.env.BACK_URL_FOR_FRONT;

  return (
    <div>
      <Title title="Dashboard" />
      {BASE_URL}
      <DashboardGrid />
    </div>
  );
}