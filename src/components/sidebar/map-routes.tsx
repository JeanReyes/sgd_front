import { IoAddCircleSharp, IoCalendarOutline, IoCheckboxOutline } from 'react-icons/io5';
import { GrConfigure } from "react-icons/gr";
import { CgComponents } from "react-icons/cg";

export const sidebarRoutes = [
  {
    href: "/",
    title: "Home",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    href: "/solicitud",
    title: "Solicitudes",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    href: "/chadcn",
    title: "Componentes",
    icon: <CgComponents size={30} />,
  },
  {
    href: "/mainteiner",
    title: "Mantenedor",
    icon: <GrConfigure size={30} />,
  },
];