import { getRaionCode, RaionCode } from "@dkkoval/react-md-map";
import { getOblastCode, OblastCode } from "@dkkoval/react-ua-map";

export function transformUADataKeys(data: Record<string, number>): Record<OblastCode, number> {
  const transformedData: Partial<Record<OblastCode, number>> = {};

  Object.entries(data).forEach(([key, value]) => {
    const code = getOblastCode(key);
    if (code) {
      transformedData[code] = value;
    }
  });

  return transformedData as Record<OblastCode, number>;
}

export function transformMDDataKeys(data: Record<string, number>): Record<RaionCode, number> {
  const transformedData: Partial<Record<RaionCode, number>> = {}; 

  Object.entries(data).forEach(([key, value]) => {
    const code = getRaionCode(key);
    if (code) {
      transformedData[code] = value;
    }
  });

  return transformedData as Record<RaionCode, number>;
}
