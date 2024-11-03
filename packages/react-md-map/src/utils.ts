import { RaionCode } from './types';

// Helper function to convert raion names to codes
export function getRaionCode(raionName: string): RaionCode | undefined {
  const raionMapping: Record<RaionCode, string[]> = {
    "CA": ["cahul"],
    "GA": ["gagauzia"],
    "TA": ["taraclia"],
    "CT": ["cantemir"],
    "BS": ["basarabeasca"],
    "LE": ["leova"],
    "CM": ["cimislia"],
    "SV": ["stefan voda"],
    "BD": ["bender"],
    "CS": ["causeni"],
    "HI": ["hincesti"],
    "IA": ["ialoveni"],
    "NI": ["nisporeni"],
    "CU": ["chisinau"],
    "AN": ["anenii noi"],
    "CR": ["criuleni"],
    "ST": ["straseni"],
    "UN": ["ungheni"],
    "DU": ["dubasari"],
    "CL": ["calarasi"],
    "SN": ["transnistria"],
    "FA": ["falesti"],
    "OR": ["orhei"],
    "GL": ["glodeni"],
    "BA": ["balti"],
    "TE": ["telenesti"],
    "SI": ["singerei"],
    "RI": ["riscani"],
    "RE": ["rezina"],
    "SD": ["soldanesti"],
    "FL": ["floresti"],
    "DR": ["drochia"],
    "ED": ["edinet"],
    "BR": ["briceni"],
    "SO": ["soroca"],
    "DO": ["donduseni"],
    "OC": ["ocnita"],
  };

  const normalizedRaionName = raionName
    .toLowerCase()
    .replace(/[.,]/g, '') // Remove punctuation
    .replace(/\s*(region|raion)\s*/g, '')
    .trim();

  return (
    Object.entries(raionMapping)
      .find(([, names]) => names.includes(normalizedRaionName))?.[0]
  ) as RaionCode | undefined;
}
