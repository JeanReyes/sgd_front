import { Status } from "@/interfaces/generic-api";


export interface ApiAllTipoDependencias {
  status: Status;
  data: TipoDependencia[];
}

export interface TipoDependencia {
  id: string;
  nombre: string;
  descripcion: string;
}
