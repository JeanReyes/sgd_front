import { Status } from "@/interfaces/generic-api";


export interface ApiAllSector {
  status: Status;
  data: Sector[];
}

export interface Sector {
  id: string;
  nombre: string;
  descripcion: string;
}
