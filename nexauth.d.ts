// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { TableMeta } from "@tanstack/react-table";
import { TipoDependencia } from "@/interfaces/tipo-dependencia";
import { Sector } from "@/interfaces/sector";

interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

// Extender el tipo TableMeta para incluir las nuevas propiedades
declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    tipoDependencias?: TipoDependencia[];
    sectores?: Sector[];
  }
}
