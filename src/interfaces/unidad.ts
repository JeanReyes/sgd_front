import { Status } from "./generic-api";

export interface ApiAllUnidad {
  status: Status;
  data: Unidad[];
}

export interface Unidad {
  id: number;
  nombre: string;
  descripcion: string;
}
