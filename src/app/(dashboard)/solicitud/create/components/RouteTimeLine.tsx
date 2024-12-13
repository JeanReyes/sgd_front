import { Dependencia } from "@/interfaces/dependencia";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BsFiletypeExe } from "react-icons/bs";
// import { DependenciaDetails } from "./DependenciaDetails";

interface RouteTimelineProps {
  routes: Dependencia[];
}

export function RouteTimeline({ routes }: RouteTimelineProps) {
  return (
    <div>
      <span className="flex items-center gap-1">
        <BsFiletypeExe className="w-4 h-4" />
        Flujo de aprobación
      </span>
      <Card className="w-full max-w-4xl mx-auto mt-4">
        <CardHeader>
          <CardDescription>
            {/* Proceso de aprobación de la solicitud */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Badge>{index + 1}</Badge>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">{item.nombre}</h3>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
