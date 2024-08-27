// import prisma from "@/lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authOptions } from "@/libs/auth";
// import { signInEmailPassword } from "@/auth/actions/auth-action";

const handler = NextAuth(authOptions);

/** por la nueva sintaxis de next que trabaja con GET y POST en sus apis */
export { handler as GET, handler as POST };
