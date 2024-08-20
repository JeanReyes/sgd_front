import { Sidebar } from "@/components/sidebar/Sidebar";
import { TopMenu } from "@/components/top-menu/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/api/auth/signin");
    }

  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div
          className={`px-6 pt-6 p-2 m-6 pb-5 rounded  dark:text-white dark:bg-slate-800`}
        >
          {children}
        </div>
      </div>
    </>
  );
}