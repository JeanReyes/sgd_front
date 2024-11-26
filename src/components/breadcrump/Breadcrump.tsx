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
import { sidebarRoutes } from "../sidebar/new-sidebar/map-routes";
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
      const arrayRoute = route.url.split("/").filter(Boolean);
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
        <span key={path} className="flex items-center ">
          <BreadcrumbItem >
            <Link
              href={path}
              className={`${
                index === segments.length - 1
                  ? "font-extrabold dark:text-white text-black"
                  : ""
              } text-xs md:text-sm`}
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
    // <Breadcrumb className="mb-5">
    <Breadcrumb className="flex items-center">
      <BreadcrumbList>
        <span className="flex items-center">
          <BreadcrumbItem>
            <Link href="/">Inicio</Link>
          </BreadcrumbItem>
          {segments.length > 0 && <BreadcrumbSeparator />}
        </span>
        {generateBreadcrumb()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
