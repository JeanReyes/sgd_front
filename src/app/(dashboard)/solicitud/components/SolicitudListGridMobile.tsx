import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";

export interface Props {
  clasificaciones: DataClasificacion[];
}

export const SolicitudListGridMobile = ({ clasificaciones }: Props) => {
  const router = useRouter();
  const [openCreateSolicitud, setOpenCreateSolicitud] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-1  gap-3">
      <div className="w-full flex justify-end">
        {/* <Button
          className="h-full flex "
          onClick={() => setOpenCreateSolicitud(true)}
        >
          crear solicitud
        </Button> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setOpenCreateSolicitud(true)}>
                <IoMdAddCircleOutline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Crear nueva solicitud</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
                        <span className="text-md">{clasificacion.nombre}</span>
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
