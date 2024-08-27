
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ContainerMenu } from "@/components/sidebar/ContainerMenu";
import { cookies } from "next/headers";
import { authOptions } from "@/libs/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions);
    const cookieStore = cookies();
    const theme = cookieStore.get("theme")?.value
      ? JSON.parse(cookieStore.get("theme")!.value)
      : "light";
      

  return (
    <>
      <ContainerMenu session={session!} theme={theme}>
        {children}
      </ContainerMenu>
    </>
  );
}