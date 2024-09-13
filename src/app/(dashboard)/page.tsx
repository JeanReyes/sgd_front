import { Title } from "@/components";
import { titleFont } from "../config/fonts";

export default function HomeDashboard() {
  const BASE_URL = process.env.BACK_URL_FOR_FRONT;
  return (
    <div>
      <Title title="Dashboard" subTitle="Kpis" />
      {BASE_URL}
    </div>
  );
}