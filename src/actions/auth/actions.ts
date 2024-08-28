import { SessionSgd, UserLogin } from "@/interfaces/session";
import { setCookie, deleteCookie } from "cookies-next";

export const initSession = (user: SessionSgd) => {
  setCookie("auth", JSON.stringify(user))
};

export const removeSession = () => {
  deleteCookie("auth"); 
}

export const apiLoginFake = async (user: UserLogin) => {
  return new Promise((resolve) => {
    resolve({
      user: {
        ...user,
        roles: ["admin", "super admin"],
      },
    } as SessionSgd);
  });
};
