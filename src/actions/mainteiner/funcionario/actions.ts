"use server"

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


export const getAllFuncionario = async <T>( data?: T,): Promise<any> => {

  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/Funcionario/findAll`,
      {
        method: "GET",
        headers: headers(),
      }
    )
   
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const res = await response.json(); // Verifica la respuesta de la API
    return res;
    
    return res;
  } catch (error) {
    return undefined;
  }
};

export const addFuncionario = async <T>( data?: T): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.BACK_URL_FOR_FRONT}/api/v1/Funcionario/save`,
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
}

export const updateFuncionario = async <T>( data?: T): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/Funcionario/update`,
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

export const deleteFuncionario = async (id: number): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.BACK_URL_FOR_FRONT}/api/v1/Funcionario/deleteById/${id}`,
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
