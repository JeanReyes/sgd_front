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

export interface ApiAllIndicators {
  status: Status;
  data: Indicators[];
}

export interface Indicators {
  cod: string;
  value: number;
  date: string;
}
