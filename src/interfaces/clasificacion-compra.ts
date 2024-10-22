import { Status } from "./generic-api";
import { MecanismoCompra } from "./mecanismo-compra";

export interface ApiClasificaciones {
  status: Status;
  data: DataClasificacion[];
}

export interface DataClasificacion {
  nombre: string;
  idClasificacion: number;
  descripcion: string;
  path?: string;
  mecanismosCompra: MecanismoCompra[];
}
