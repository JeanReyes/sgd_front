"use server";

import { ApiAllSector } from "@/interfaces/sector";
import { cookies } from "next/headers";

const headers = () => {
  const cookieStore = cookies();
  const session = cookieStore.get("auth")?.value
    ? JSON.parse(cookieStore.get("auth")!.value)
    : null;

  const token = session.access_token;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Añades el token en la cabecera
  };
};

export const getAllSector = async <T>(data?: T): Promise<ApiAllSector> => {
  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/sector/findAll`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const res = await response.json(); // Verifica la respuesta de la API
    return res;

    return res;
  } catch (error) {
    return {
      status: {
        code: 404,
        hasError: true,
      },
      data: [],
    };
  }
};

export const addSector = async <T>(data?: T): Promise<any> => {
  console.log("data: ", data);

  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/sector/save`,
      {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    return undefined;
  }
};

export const updateSector = async <T>(data?: T): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/sector/update`,
      {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();

    return res;
  } catch (error) {
    return undefined;
  }
};

export const deleteSector = async (id: number): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/sector/deleteById/${id}`,
      {
        method: "DELETE",
        headers: headers(),
      }
    );
    const res = await response.json();

    return res;
  } catch (error) {
    return undefined;
  }
};
