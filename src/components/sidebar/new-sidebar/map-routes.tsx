import { IoAddCircleSharp, IoCalendarOutline, IoCheckboxOutline } from 'react-icons/io5';
import { GrConfigure } from "react-icons/gr";
import { CiHome } from 'react-icons/ci';

export const sidebarRoutes = [
  {
    url: "/",
    title: "Inicio",
    icon: <CiHome size={30} />,
  },
  {
    url: "/solicitud",
    title: "Solicitudes",
    icon: <IoCheckboxOutline size={30} />,
  },
  // {
  //   href: "/chadcn",
  //   title: "Componentes",
  //   icon: <CgComponents size={30} />,
  // },
  {
    url: "/mainteiner",
    title: "Mantenedores",
    icon: <GrConfigure size={30} />,
  },
];