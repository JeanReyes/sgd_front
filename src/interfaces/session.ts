import { Status } from "./generic-api";

export interface UserLogin {
  password: string;
  rut: string;
}

export interface UserSession {
  password?: string;
  name: string;
  image?: string;
  email: string;
  roles: string[];
  rut: string;
  cargosActivos: ICargosActivos[];
}

export interface ICargosActivos {
  id: number;
  isCargoPrincipal: string;
  nombre: string;
  descripcion: string;
  estado: string;
  fechaCreacion: string;
  nombreDependencia: string;
  nombreFuncionario: string;
  nombreTipoCargo: string;
  funcionarioID: null;
  dependenciaID: null;
  tipoCargoID: null;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  message: string;
  passValid: boolean;
  user: UserSession;
}

export interface ISessionAPI {
  status: Status;
  data: Session;
}


