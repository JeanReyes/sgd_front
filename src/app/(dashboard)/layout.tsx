
import { ContainerMenu } from "@/components/sidebar/ContainerMenu";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value
    ? JSON.parse(cookieStore.get("theme")!.value)
    : "light";

  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;


  if (!session) {
    redirect("/auth/login")
  }

  return (
    <>
      <ContainerMenu session={session} theme={theme}>
        {children}
      </ContainerMenu>
    </>
  );
}