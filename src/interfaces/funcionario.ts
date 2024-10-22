import { Status } from "./generic-api";

export interface ApiAllFuncionario {
  status: Status;
  data: Funcionario[];
}

export interface Funcionario {
  id: string;
  rut: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string | null;
  estado: string;
  correo: string;
}
