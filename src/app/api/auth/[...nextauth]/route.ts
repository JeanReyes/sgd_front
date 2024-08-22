// import prisma from "@/lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { signInEmailPassword } from "@/auth/actions/auth-action";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "usuario@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        
        // const user = await signInEmailPassword(
        //   credentials?.email!,
        //   credentials?.password!
        // );
        const user: any = {
          email: credentials?.email!,
          password: credentials?.password!,
          name: "Nicolas"
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // const dbUser = await prisma.user.findUnique({
      //   where: { email: token.email ?? "no-email" },
      // });

      // token.roles = dbUser?.roles ?? ["no-roles"];
      // token.id = dbUser?.id ?? "no-id";
      return token;
    },
    async session({ session, token, user }) {
      // if (session && session.user) {
      //   session.user.roles = token.roles;
      //   session.user.id = token.id;
      // }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

/** por la nueva sintaxis de next que trabaja con GET y POST en sus apis */
export { handler as GET, handler as POST };
