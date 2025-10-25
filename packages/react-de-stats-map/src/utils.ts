import { StateCode } from './types';

// Helper function to convert state names to codes
export function getStateCode(stateName: string): StateCode | undefined {
  const stateMapping: Record<StateCode, string[]> = {
    'DE-BW': ["baden-württemberg", "baden-wurttemberg", "baden wurttemberg"],
    'DE-BY': ["bayern", "bavaria"],
    'DE-BE': ["berlin"],
    'DE-BB': ["brandenburg"],
    'DE-HB': ["bremen"],
    'DE-HH': ["hamburg"],
    'DE-HE': ["hessen", "hesse"],
    'DE-MV': ["mecklenburg-vorpommern", "mecklenburg vorpommern"],
    'DE-NI': ["niedersachsen", "lower saxony"],
    'DE-NW': ["nordrhein-westfalen", "nordrhein westfalen", "north rhine-westphalia"],
    'DE-RP': ["rheinland-pfalz", "rheinland pfalz", "rhineland-palatinate"],
    'DE-SL': ["saarland"],
    'DE-SN': ["sachsen", "saxony"],
    'DE-ST': ["sachsen-anhalt", "sachsen anhalt", "saxony-anhalt"],
    'DE-SH': ["schleswig-holstein", "schleswig holstein"],
    'DE-TH': ["thüringen", "thuringen", "thuringia"]
  };

  const normalizedStateName = stateName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*(land|state|bundesland)\s*/g, '')
    .trim();

  return (
    Object.entries(stateMapping)
          .find(([, names]) => names.includes(normalizedStateName))?.[0] 
  ) as StateCode | undefined;
}
