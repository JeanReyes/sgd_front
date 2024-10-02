"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sidebarRoutes } from "../sidebar/map-routes";
import { manteinerRoutes } from "@/app/(dashboard)/mainteiner/map-routes";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const allRoutes = [
  ...sidebarRoutes,
  ...manteinerRoutes
];

export function BreadcrumbGrid() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [isMounted, setIsMounted] = useState(false);

  const setRoutes = (segment: string) => {
    const path = allRoutes.find((route) => {
      const arrayRoute = route.href.split("/").filter(Boolean);
      const occurrences = arrayRoute.filter((item) => item === segment).length;
      
      if (occurrences === 1) {
        return route
      }     
    })
    if (path) {
      return path.title
    }
    
    return null
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const generateBreadcrumb = () => {
    return segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");

      return (
        <span key={path} className="flex items-center">
          <BreadcrumbItem>
            <Link
              href={path}
              className={index === segments.length - 1 ? "font-extrabold text-white" : ""}
            >
              {setRoutes(segment) ? setRoutes(segment) : capitalize(segment)}
            </Link>
          </BreadcrumbItem>
          {index < segments.length - 1 && <BreadcrumbSeparator />}
        </span>
      );
    });
  };

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        <span className="flex items-center">
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          {segments.length > 0 && <BreadcrumbSeparator />}
        </span>

        {/* Generar Breadcrumb dinámico */}
        {generateBreadcrumb()}

        {/* {segments.length > 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="font-extrabold">
              {setRoutes(segments[segments.length - 1])
                ? setRoutes(segments[segments.length - 1])
                : capitalize(segments[segments.length - 1])}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )} */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
