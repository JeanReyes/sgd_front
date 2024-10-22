import { Status } from "./generic-api";

export interface ApiAllRequisito {
  status: Status;
  data: Requisito[];
}

export interface Requisito {
  nombre: string;
  idRequisito: string | null;
  id: number
  cantidad: string;
  obligatorio: string;
  descripcion: string;
  extensiones: string;
  formatoBase: string;
  mecanismoCompraID: string | null;
}
