import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import AuthProvider from "@/app/auth/components/AuthProvider";
import { inter } from "./config/fonts";


export const metadata: Metadata = {
  title: "SGD",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value
    ? JSON.parse(cookieStore.get("theme")!.value)
    : "light";

  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${theme} dark:text-white dark:bg-black`}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
