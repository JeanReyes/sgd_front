// create solicitud

import { Status } from "./generic-api";
import { Money } from "./money";
import { Requisito } from "./requisito";
import { Unidad } from "./unidad";

export interface PurchaseRequest {
  idMecanismoDeCompra: number;
  idMoneda: number;
  cargoCreador: number;
  materia: string;
  items: Item[];
  afectoIva: number;
}

interface Item {
  cantidad: number;
  idUnidad: number;
  description: string;
  idClasificacionPresupuestraria: number;
  precioUnitario: number;
}

// get all solicitud

export interface ApiAllSolicitud {
  status: Status;
  data: Solicitud[];
}

export interface Solicitud {
  id: number;
  cod: string;
  fechaCreacion: string;
  numero: number;
  totalNeto: number;
  valorDiaMoneda: null | string;
  estado: string;
  cargoCreador: string;
  moneda: Money;
  materia: string;
  afectoIva: boolean;
  mecanismoDeCompra: MecanismoDeCompra;
  items: ItemAllSolicitud[];
  adjuntos: null;
}

export interface MecanismoDeCompra {
  idMecanismo: string;
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  moneda: Money;
  requisitos: Requisito[];
}

export interface ItemAllSolicitud {
  id: number;
  cantidad: number;
  unidad: Unidad;
  precioUnitario: number;
  detalle: null;
  indicePresupuestario: IndicePresupuestario;
}

export interface IndicePresupuestario {
  id: number;
  nombre: string;
  descripcion: string;
  asignacion: string;
  item: string;
  subtitulo: string;
}








