import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
        name: { label: "Nombre", type: "text", placeholder: "nombre" },
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
          name: credentials?.name,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Esto asegura que sólo sea seguro en producción
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `__Secure-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  callbacks: {
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
