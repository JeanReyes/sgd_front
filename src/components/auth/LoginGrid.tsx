'use client'

import { apiLoginFake } from "@/actions/auth/actions";
import { SessionSgd } from "@/interfaces/session";
import { useSession } from "@/store/session/session.store";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  dni: string;
  password: string;
  name: string;
}

interface FormErrors {
  dni?: string;
  password?: string;
  name?: string;
}

export const LoginGrid = () => {
  const [formData, setFormData] = useState<FormData>({
    dni: "176295813",
    password: "123456",
    name: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const signIn = useSession((store) => store.signIn)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): FormErrors => {
    let formErrors: FormErrors = {};
    if (!formData.dni) {
      formErrors.dni = "El dni es requerido";
    } 

    if (!formData.dni) {
      formErrors.dni = "La contraseña es requerida";
    } else if (formData.dni.length < 6) {
      formErrors.dni = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.dni) {
      formErrors.dni = "El nombre es requerido";
    }

    return formErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

    const res = await apiLoginFake({
      dni: formData.dni,
      password: formData.password,
      name: formData.name,
    });
    signIn(res as SessionSgd)
    
    router.push("/")

      setFormData({
        dni: "",
        password: "",
        name: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sm:w-3/4">
      <h1 className="text-4xl mb-8">Acceso</h1>
      <div className="w-full mb-4">
        <label htmlFor="dni" className="block  mb-2">
          DNI
        </label>
        <input
          type="text"
          id="dni"
          name="dni"
          className="w-full p-3 border border-gray-200 dark:bg-gray-700  rounded-lg focus:outline-none"
          value={formData.dni}
          onChange={handleChange}
        />
      </div>
      <div className="w-full mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-3 border border-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="w-full mb-4">
        <label htmlFor="name" className="block  mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 border border-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>

        <button className="w-full p-3 dark:bg-red-600 bg-sky-700 text-white rounded-lg mt-4 dark:hover:bg-red-700">
          Continuar
        </button>
        <a href="#" className="dark:text-red-500  mt-4 hover:underline">
          ¿Olvidaste Tu Contraseña?
        </a>
      </div>
    </form>
  );
}

