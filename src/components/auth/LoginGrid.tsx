'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  email: string;
  password: string;
  nombre: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  nombre?: string;
}

export const LoginGrid = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    nombre: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): FormErrors => {
    let formErrors: FormErrors = {};
    if (!formData.email) {
      formErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      formErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.nombre) {
      formErrors.nombre = "El nombre es requerido";
    }

    return formErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        name: formData.nombre,
        redirect: false,
      });

      if (!res?.ok) {
        console.log("error");
      }

      router.push("/");

      setFormData({
        email: "",
        password: "",
        nombre: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

