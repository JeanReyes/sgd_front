"use client";

import * as React from "react";
import {Frame} from "lucide-react";
import { NavProjects } from "./NavProjects";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { CiHome } from "react-icons/ci";
import { IoCheckboxOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  home: [
    {
      name: "Inicio",
      url: "/",
      icon: CiHome,
    },
  ],
  navMain: [
    {
      title: "Solicitudes",
      url: "/solicitud",
      icon: IoCheckboxOutline,
      isActive: true,
      items: [
        {
          title: "Ingresar solicitudes",
          url: "/solicitud",
        },
        {
          title: "Ver solicitudes",
          url: "/solicitud",
        },
        {
          title: "Historial de solcitudes",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Mantenedores",
      url: "/mainteiner",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { open, setOpen } = useSidebar();
   const {session} = props

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 flex justify-center items-center">
          {open ? (
            <h1 className=" flex justify-center items-center bg-slate-950 font-bold text-md lg:text-md bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
              "Logo Municipal"
            </h1>
          ) : (
            <Avatar className="h-8 w-8 rounded-lg">
              {/* <AvatarImage src={""} alt={""} /> */}
              <AvatarFallback className="rounded-lg">
                LM
              </AvatarFallback>
            </Avatar>
          )}
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.home}/>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} titleNav="Configuraciones"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
