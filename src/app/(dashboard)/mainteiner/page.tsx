import { Title } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { manteinerRoutes } from "./map-routes";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";

export default function HomeConfig() {
  return (
    <div>
      <Title
        title="Mantenedor"
      />
      <div className="grid grid-cols-1 sm:grid-cols-4  gap-3">
        {manteinerRoutes.map((config) => (
          <Card
            key={config.url}
            className="flex flex-row sm:flex-col justify-between h-[130px] sm:h-full"
          >
            <CardHeader className="flex flex-row p-3">
              <div>
                <CardTitle className="flex items-center">
                  <span>{config.icon}</span>
                  <span className="ml-2 text-sm">{config.title} </span>
                </CardTitle>
                <CardDescription>{config.detail}</CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex p-3">
              <Link href={config.url}>
                <Button className="h-full">
                  <CiLogin size={24} />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
