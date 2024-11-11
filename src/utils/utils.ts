export const handleformatCurrency = (value: string) => {
  // Remover caracteres que no sean números o coma.
  value = value.replace(/[^0-9,]/g, "");

  // Reemplazar coma por punto para el cálculo interno.
  value = value.replace(",", ".");

  const number = parseFloat(value);
  if (isNaN(number)) return "";

  // Formatear de vuelta usando la configuración local.
  return number
    .toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(".", ",");
};