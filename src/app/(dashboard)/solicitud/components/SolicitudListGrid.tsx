"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DataClasificacion } from '@/interfaces/clasificacion-compra';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';

interface Props {
  clasificaciones: DataClasificacion[];
}

export const SolicitudListGrid = ({ clasificaciones }: Props) => {
  const router = useRouter();
  const [openCreateSolicitud, setOpenCreateSolicitud] = useState(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4  gap-3">
      MOSTRAR TABLA DE SOLICITUDES DEL USUARIO
      <Button className="h-full" onClick={() => setOpenCreateSolicitud(true)}>
        crear solicitud
      </Button>
      <AlertDialog
        open={openCreateSolicitud}
        onOpenChange={setOpenCreateSolicitud}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Crear Solitud</AlertDialogTitle>
              <AlertDialogCancel>
                <AiOutlineClose />
              </AlertDialogCancel>
            </div>
            {clasificaciones.map((clasificacion: DataClasificacion) => {
              return (
                <Card
                  key={clasificacion.idClasificacion}
                  className="flex flex-row justify-between items-center sm:h-full"
                >
                  <CardHeader className="flex flex-row p-5">
                    <div>
                      <CardTitle className="flex items-center justify-center">
                        <span className="text-md">
                          {clasificacion.nombre}
                        </span>
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardFooter className="flex p-5">
                    <Button
                      className="h-full"
                      onClick={() =>
                        router.push(`/solicitud/create/${clasificacion.path}`)
                      }
                    >
                      <CiLogin size={20} />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
