import { Money } from "./money";
import { Requisito } from "./requisito";

export interface MecanismoCompra {
  idMecanismo?: string;
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  moneda: Money;
  requisitos: Requisito[];
}

export interface CreateMecanismo {
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  comentario: string;
  monedaID: string;
  clasificacionCompraID: string;
  requisitos: string[];
  ruta: string[];
}
