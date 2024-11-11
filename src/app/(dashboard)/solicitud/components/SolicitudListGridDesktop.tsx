import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataClasificacion } from "@/interfaces/clasificacion-compra";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";

export interface Props {
  clasificaciones: DataClasificacion[];
}

export const SolicitudListGridDesktop = ({ clasificaciones }: Props) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4  gap-3">
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
    </div>
  );
}
