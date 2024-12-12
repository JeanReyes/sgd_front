import { Dependencia } from "./dependencia";
import { Money } from "./money";
import { Requisito } from "./requisito";

export interface MecanismoCompra {
  idMecanismo?: string;
  clasificacionCompra?: string;
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  moneda: Money;
  requisitos: Requisito[];
  rutas: Dependencia[];
}

export interface RutaResume {
  cod: string;
  value: string;
  date: string | null;
}

export interface CreateMecanismo {
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  comentario: string;
  monedaID: string;
  clasificacionCompraID: string;
  requisitos: string[];
  rutas: string[];
}

export interface MecanimosUpd {
  id: string;
  nombre: string;
  montoMinimo: string;
  montoMaximo: string;
  comentario: string;
  monedaID: string;
  clasificacionCompraID: string;
  requisitos: string[];
  rutas: string[];
}
