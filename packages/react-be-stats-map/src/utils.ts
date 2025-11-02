import { ProvinceCode } from './types';

// Helper function to convert province names to codes
export function getProvinceCode(provinceName: string): ProvinceCode | undefined {
  const provinceMapping: Record<ProvinceCode, string[]> = {
    'BEBRU': ["brussels", "bruxelles", "brussel"],
    'BEVAN': ["antwerp", "antwerpen", "anvers"],
    'BEVBR': ["flemish brabant", "vlaams-brabant", "brabant flamand"],
    'BEVLI': ["limburg"],
    'BEVOV': ["east flanders", "oost-vlaanderen", "flandre orientale"],
    'BEVWV': ["west flanders", "west-vlaanderen", "flandre occidentale"],
    'BEWBR': ["walloon brabant", "waals-brabant", "brabant wallon"],
    'BEWHT': ["hainaut", "henegouwen"],
    'BEWLG': ["liege", "liège", "luik"],
    'BEWLX': ["luxembourg", "luxemburg"],
    'BEWNA': ["namur", "namen"]
  };

  const normalizedProvinceName = provinceName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*(province|provincie)\s*/g, '')
    .trim();

  return (
    Object.entries(provinceMapping)
          .find(([, names]) => names.includes(normalizedProvinceName))?.[0] 
  ) as ProvinceCode | undefined;
}
