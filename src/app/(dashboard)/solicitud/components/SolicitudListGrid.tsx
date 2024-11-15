"use client";

import { useDevice } from '@/hooks/useDevise';
import { DataClasificacion } from '@/interfaces/clasificacion-compra';
import { SolicitudListGridMobile } from './SolicitudListGridMobile';
import { SolicitudListGridDesktop } from './SolicitudListGridDesktop';

export interface Props {
  clasificaciones: DataClasificacion[];
}


export const SolicitudListGrid = ({ clasificaciones }: Props) => {
  const isMobile = useDevice();
  
  return (
    <>
      <SolicitudListGridMobile clasificaciones={clasificaciones} />
      {/* {  
        isMobile
          ? <SolicitudListGridMobile clasificaciones={clasificaciones} />
          : <SolicitudListGridDesktop clasificaciones={clasificaciones} />
      } */}
    </>
  );
};
