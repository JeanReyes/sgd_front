import { Title } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { menuConfig } from "./map-config";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";

export default function HomeConfig() {
  return (
    <div>
      <Title
        title="Configuración"
        subTitle="Aquí puede ver, agregar, actualizar y eliminar propiedades de la solicitud"
      />
      <div className="grid grid-cols-1 sm:grid-cols-4  gap-3">
        {menuConfig.map((config) => (
          <Card key={config.href}>
            <CardHeader className="flex flex-row">
              <div>
                <CardTitle className="flex items-center">
                  {config.title} <span className="ml-2">{config.icon}</span>
                </CardTitle>
                <CardDescription>{config.detail}</CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-end">
              <Link href={config.href}>
                <Button>
                  <CiLogin size={20} />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
