import { Status } from "./generic-api";

export interface ApiIndicePresupuestario {
  status: Status;
  data: IndicePresupestrario[];
}

export interface IndicePresupestrario {
  id: number;
  nombre: string;
  descripcion: string;
  asignacion: string;
  item: string;
  subtitulo: string;
}
