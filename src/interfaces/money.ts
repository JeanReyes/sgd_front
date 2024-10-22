import { Status } from "./generic-api";

export interface ApiAllMoney {
  status: Status;
  data: Money[];
}

export type Money = {
  idMoneda: number;
  codigo: string;
  decimales: number;
  nombre: string;
  descripcion: string;
};
