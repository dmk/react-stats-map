import { RegionCode } from './types';

// Helper function to convert region names to codes
export function getRegionCode(regionName: string): RegionCode | undefined {
  const regionMapping: Record<RegionCode, string[]> = {
    '11': ["île-de-france", "ile-de-france", "paris"],
    '24': ["centre-val de loire", "centre"],
    '27': ["bourgogne-franche-comté", "bourgogne-franche-comte"],
    '28': ["normandie", "normandy"],
    '32': ["hauts-de-france"],
    '44': ["grand est"],
    '52': ["pays de la loire"],
    '53': ["bretagne", "brittany"],
    '75': ["nouvelle-aquitaine"],
    '76': ["occitanie"],
    '84': ["auvergne-rhône-alpes", "auvergne-rhone-alpes"],
    '93': ["provence-alpes-côte d'azur", "provence-alpes-cote d'azur", "paca"],
    '94': ["corse", "corsica"]
  };

  const normalizedRegionName = regionName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*(région|region)\s*/g, '')
    .trim();

  return (
    Object.entries(regionMapping)
          .find(([, names]) => names.includes(normalizedRegionName))?.[0] 
  ) as RegionCode | undefined;
}
