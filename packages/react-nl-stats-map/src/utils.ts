import { ProvinceCode } from './types';

// Helper function to convert province names to codes
export function getProvinceCode(provinceName: string): ProvinceCode | undefined {
  const provinceMapping: Record<ProvinceCode, string[]> = {
    'NLDR': ["drenthe"],
    'NLFL': ["flevoland"],
    'NLFR': ["friesland", "fryslân"],
    'NLGE': ["gelderland"],
    'NLGR': ["groningen"],
    'NLLI': ["limburg"],
    'NLNB': ["noord-brabant", "north brabant", "brabant"],
    'NLNH': ["noord-holland", "north holland"],
    'NLOV': ["overijssel"],
    'NLUT': ["utrecht"],
    'NLZE': ["zeeland"],
    'NLZH': ["zuid-holland", "south holland"]
  };

  const normalizedProvinceName = provinceName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*(provincie|province)\s*/g, '')
    .trim();

  return (
    Object.entries(provinceMapping)
          .find(([, names]) => names.includes(normalizedProvinceName))?.[0] 
  ) as ProvinceCode | undefined;
}
