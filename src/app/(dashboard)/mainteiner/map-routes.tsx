
import {
  FaBalanceScaleLeft,
  FaRegUser,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { MdEventNote } from "react-icons/md";
import { GrDocument } from "react-icons/gr";
import { BsTextareaResize } from "react-icons/bs";
import { AiOutlineNodeIndex } from "react-icons/ai";

export const manteinerRoutes = [
  {
    url: "/mainteiner/clasificacion-compra",
    title: "Clasificación compra",
    detail: "Configura y administra los tipos de compras del sistema.",
    icon: <BiPurchaseTag size={30} />,
  },
  {
    url: "/mainteiner/mecanismo-compra",
    title: "Mecanismo de compra",
    detail: "Configura y administra las compras del sistema.",
    icon: <MdEventNote size={30} />,
  },
  {
    url: "/mainteiner/requisito",
    title: "Requisitos",
    detail: "Configura y administra los requisitos del sistema.",
    icon: <GrDocument size={30} />,
  },
  {
    url: "/mainteiner/money",
    title: "Moneda",
    detail: "Configura y administra las monedas del sistema.",
    icon: <FaRegMoneyBillAlt size={30} />,
  },
  {
    url: "/mainteiner/unidad",
    title: "Unidad de medida",
    detail: "Configura y administra las unidades de medidad del sistema.",
    icon: <FaBalanceScaleLeft size={30} />,
  },
  {
    url: "/mainteiner/funcionario",
    title: "Funcionario",
    detail: "Configura y administra los funcionarios del sistema.",
    icon: <FaRegUser size={30} />,
  },
  {
    url: "/mainteiner/dependencia",
    title: "Dependencia",
    detail: "Configura y administra las dependencias del sistema.",
    icon: <BsTextareaResize size={30} />,
  },
  {
    url: "/mainteiner/tipo-dependencia",
    title: "Tipo Dependencia",
    detail: "Configura y administra los tipos de dependencias del sistema.",
    icon: <BsTextareaResize size={30} />,
  },
  {
    url: "/mainteiner/sector",
    title: "Sector",
    detail: "Configura y administra los sectores del sistema.",
    icon: <BsTextareaResize size={30} />,
  },
  {
    url: "/mainteiner/indice-presupuestario",
    title: "Indice Presupuestario",
    detail: "Configura y administra los Indices Presupuestarios del sistema.",
    icon: <AiOutlineNodeIndex size={30} />,
  },
];
