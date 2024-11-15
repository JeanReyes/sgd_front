import { Indicators } from "@/interfaces/money";

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

const selectIndicator = (
  IndicatorsValues: Indicators[],
  indicator: string
) => {
  return IndicatorsValues.find((m) => m.cod === indicator);
};

export const handleTransformItemToMoney = (total: number, IndicatorsValues: Indicators[] = [], moneySelected: string): number | undefined => {

  const utmValue = Number(selectIndicator(IndicatorsValues, "UTM")?.value)

  //valor de la moneda seleccionada
  const valueMoneySelectd = selectIndicator(IndicatorsValues, moneySelected)?.value;

  if (!valueMoneySelectd) return;

  // calculo total de la moneda seleccionada a peso
  const transormedValueToPeso = total * valueMoneySelectd;

  // valor final en UTM
  const calculatePesoToUTM = transormedValueToPeso / utmValue;

  return calculatePesoToUTM;
  //tranformar 
} 

export const transformStringsToNumbers = (data: any) => {
  const transformedData = { ...data };
  for (const key in transformedData) {
    if (
      typeof transformedData[key] === "string" &&
      !isNaN(Number(transformedData[key]))
    ) {
      transformedData[key] = Number(transformedData[key]);
    } else if (Array.isArray(transformedData[key])) {
      transformedData[key] = transformedData[key].map((item: any) =>
        transformStringsToNumbers(item)
      );
    } else if (
      typeof transformedData[key] === "object" &&
      transformedData[key] !== null
    ) {
      transformedData[key] = transformStringsToNumbers(transformedData[key]);
    }
  }
  return transformedData;
};
 