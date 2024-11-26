import { Status } from "./generic-api";

export interface ApiAllDependencias {
  status: Status;
  data: Dependencia[];
}

export interface Dependencia {
  id: string;
  nombre: string;
  codigo: string;
  timbre: string;
  sector: string;
  tipo: string;
  estado: string;
  descripcion: string;
  tipoDependenciaID: string | null;
  sectorID: string | null;
}

export interface IaddDependencia {

  codigo: string,
  descripcion: string,
  estado: string,
  nombre: string,
  timbre: string,
  sectorID: string,
  tipoDependenciaID: string
}
