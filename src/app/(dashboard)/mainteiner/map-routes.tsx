
import {
  FaBalanceScaleLeft,
  FaRegUser,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { MdEventNote } from "react-icons/md";
import { GrDocument } from "react-icons/gr";

export const manteinerRoutes = [
  {
    href: "/mainteiner/clasificacion-compra",
    title: "Clasificación compra",
    detail: "Configura y administra los tipos de compras del sistema.",
    icon: <BiPurchaseTag size={30} />,
  },
  {
    href: "/mainteiner/mecanismo-compra",
    title: "Mecanismo de compra",
    detail: "Configura y administra las compras del sistema.",
    icon: <MdEventNote size={30} />,
  },
  {
    href: "/mainteiner/requisito",
    title: "Requisitos",
    detail: "Configura y administra los requisitos del sistema.",
    icon: <GrDocument size={30} />,
  },
  {
    href: "/mainteiner/money",
    title: "Moneda",
    detail: "Configura y administra las monedas del sistema.",
    icon: <FaRegMoneyBillAlt size={30} />,
  },
  {
    href: "/mainteiner/unidad",
    title: "Unidad de medida",
    detail: "Configura y administra las unidades de medidad del sistema.",
    icon: <FaBalanceScaleLeft size={30} />,
  },
  {
    href: "/mainteiner/funcionario",
    title: "Funcionario",
    detail: "Configura y administra los funcionarios del sistema.",
    icon: <FaRegUser size={30} />,
  },
];
