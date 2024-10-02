import { Session } from "@/interfaces/session";
import { setCookie, deleteCookie } from "cookies-next";

export const initSession = (user: Session) => {
  setCookie("auth", JSON.stringify(user));
};

export const removeSession = () => {
  deleteCookie("auth");
};
