"use server"

import { ISessionAPI } from "@/interfaces/session";

const headers = {
  "Content-Type": "application/json",
};

export const logIn = async <T>(data: T): Promise<ISessionAPI | undefined> => {

  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/auth/authenticate`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      }
    );
    const session = await response.json()
    console.log(session);
    

    return session
  } catch (error) {
    return undefined
  }
};

export const register = async <T>(data: T): Promise<ISessionAPI | undefined> => {

  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/auth/register`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    return undefined;
  }
};
