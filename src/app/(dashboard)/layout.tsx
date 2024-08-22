
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ContainerMenu } from "@/components/sidebar/ContainerMenu";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions);
    const cookieStore = cookies();
    const theme = cookieStore.get("theme")?.value
      ? JSON.parse(cookieStore.get("theme")!.value)
      : "light";
      
    if (!session) {
      redirect("/api/auth/signin");
    }

  return (
    <>
      <ContainerMenu session={session} theme={theme}>
        {children}
      </ContainerMenu>
    </>
  );
}