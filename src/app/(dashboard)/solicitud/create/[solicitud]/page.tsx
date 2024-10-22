import { Title } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeCreate({ params }: { params: { solicitud: string } }) {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <Title title="Crear solicitud" />
      {params.solicitud}
    </div>
  );
}
