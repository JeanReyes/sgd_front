import { redirect } from "next/navigation";

export default async function HomeCreate({
  params,
}: {
  params: { solicitud: string };
}) {
  return redirect("/solicitud");
}