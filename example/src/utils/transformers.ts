import { getRaionCode, RaionCode } from "@dkkoval/react-md-stats-map";
import { getOblastCode, OblastCode } from "@dkkoval/react-ua-stats-map";
import { getVoivodeshipCode, VoivodeshipCode } from "@dkkoval/react-pl-stats-map";
import { getCountryCode } from "@dkkoval/react-eu-stats-map";

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

export function transformPLDataKeys(data: Record<string, number>): Record<VoivodeshipCode, number> {
  const transformedData: Partial<Record<VoivodeshipCode, number>> = {};

  Object.entries(data).forEach(([key, value]) => {
    const code = getVoivodeshipCode(key);
    if (code) {
      transformedData[code] = value;
    }
  });

  return transformedData as Record<VoivodeshipCode, number>;
}

export function transformEUDataKeys(data: Record<string, number>): Record<VoivodeshipCode, number> {
  const transformedData: Partial<Record<VoivodeshipCode, number>> = {};

  Object.entries(data).forEach(([key, value]) => {
    const code = getCountryCode(key);
    if (code) {
      transformedData[code] = value;
    }
  });

  return transformedData as Record<VoivodeshipCode, number>;
}
