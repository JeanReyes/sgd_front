import { Money } from "./money";
import { Requisito } from "./requisito";

export interface MecanismoCompra {
  idMecanismo: string;
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  moneda: Money;
  requisitos: Requisito[];
}
