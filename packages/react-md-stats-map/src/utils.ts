import { RaionCode } from './types';

// Helper function to convert raion names to codes
export function getRaionCode(raionName: string): RaionCode | undefined {
  const raionMapping: Record<RaionCode, string[]> = {
    'CA': ["cahul"],
    'GA': ["găgăuzia"],
    'TA': ["taraclia"],
    'CT': ["cantemir"],
    'BS': ["basarabeasca"],
    'LE': ["leova"],
    'CM': ["cimișlia"],
    'SV': ["ștefan vodă"],
    'BD': ["bender"],
    'CS': ["căușeni"],
    'HI': ["hîncești"],
    'IA': ["ialoveni"],
    'NI': ["nisporeni"],
    'CU': ["chișinău"],
    'AN': ["anenii noi"],
    'CR': ["criuleni"],
    'ST': ["strășeni"],
    'UN': ["ungheni"],
    'DU': ["dubăsari"],
    'CL': ["călărași"],
    'SN': ["transnistria"],
    'FA': ["fălești"],
    'OR': ["orhei"],
    'GL': ["glodeni"],
    'BA': ["bălți"],
    'TE': ["telenești"],
    'SI': ["sîngerei"],
    'RI': ["rîșcani"],
    'RE': ["rezina"],
    'SD': ["șoldănești"],
    'FL': ["florești"],
    'DR': ["drochia"],
    'ED': ["edineț"],
    'BR': ["briceni"],
    'SO': ["soroca"],
    'DO': ["dondușeni"],
    'OC': ["ocnița"]
  };

  const normalizedRaionName = raionName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*(region|raion)\s*/g, '')
    .trim();

  return (
    Object.entries(raionMapping)
          .find(([, names]) => names.includes(normalizedRaionName))?.[0] 
  ) as RaionCode | undefined;
}
