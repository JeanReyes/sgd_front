
import {
  FaBalanceScaleLeft,
  FaRegUser,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

export const menuConfig = [
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
