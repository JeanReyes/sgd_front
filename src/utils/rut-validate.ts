
export const validarRUT = (rut: string): boolean => {
  // Eliminar puntos, guiones, espacios y cualquier carácter que no sea número o 'k/K'
  const cleanRUT = rut.replace(/[^0-9kK]/g, "");

  // Verificar que el RUT tenga entre 8 y 9 caracteres
  if (cleanRUT.length < 8 || cleanRUT.length > 9) return false;

  // Si el RUT tiene exactamente 8 caracteres, se validan tanto como RUT largo incompleto o corto
  if (cleanRUT.length === 8) {
    return validarRutLargo(cleanRUT) || validarRutCorto(cleanRUT);
  }

  // Si el RUT tiene exactamente 9 caracteres, debe ser un RUT largo completo
  if (cleanRUT.length === 9) {
    return validarRutLargo(cleanRUT);
  }

  return false;
};

// Validar RUT largo (8 dígitos + 1 DV)
const validarRutLargo = (cleanRUT: string) => {
  const cuerpo = cleanRUT.slice(0, 8); // Primeros 8 caracteres como cuerpo
  const dvIngresado = cleanRUT.slice(-1).toUpperCase(); // Último carácter es el DV

  // Verificar si el cuerpo tiene 8 dígitos
  if (!/^\d{8}$/.test(cuerpo)) return false; // Si el cuerpo no tiene 8 dígitos, es inválido

  // Validar el DV
  return validarDV(cuerpo, dvIngresado);
};

// Validar RUT corto (7 dígitos + 1 DV)
const validarRutCorto = (cleanRUT: string) => {
  const cuerpo = cleanRUT.slice(0, 7); // Primeros 7 caracteres como cuerpo
  const dvIngresado = cleanRUT.slice(-1).toUpperCase(); // Último carácter es el DV

  // Verificar si el cuerpo tiene 7 dígitos
  if (!/^\d{7}$/.test(cuerpo)) return false; // Si el cuerpo no tiene 7 dígitos, es inválido

  // Validar el DV
  return validarDV(cuerpo, dvIngresado);
};

// Función auxiliar para calcular y validar el DV
const validarDV = (cuerpo: string, dvIngresado: string): boolean => {
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplicador * parseInt(cuerpo[i], 10);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const residuo = 11 - (suma % 11);
  const dvCalculado =
    residuo === 11 ? "0" : residuo === 10 ? "K" : residuo.toString();

  return dvCalculado === dvIngresado;
};



  export const formatRUT = (rut: string) => {
    let cleanRut = rut.replace(/[^0-9kK]/g, "");

    if (cleanRut.length > 1) {
      let cuerpo = cleanRut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      let dv = cleanRut.slice(-1).toUpperCase();
      cleanRut = `${cuerpo}-${dv}`;
    }

    return cleanRut;
  };

  export const cleanRut = (rut: string) => {
    return rut.replace(/[.-]/g, "").replace(/[^0-9kK]/g, "");
  }
