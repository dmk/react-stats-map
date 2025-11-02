import { StateCode } from './types';

// Helper function to convert state names to codes
export function getStateCode(stateName: string): StateCode | undefined {
  const stateMapping: Record<StateCode, string[]> = {
    '10': ["delaware", "de"],
    '11': ["district of columbia", "dc", "washington dc"],
    '12': ["florida", "fl"],
    '13': ["georgia", "ga"],
    '15': ["hawaii", "hi"],
    '16': ["idaho", "id"],
    '17': ["illinois", "il"],
    '18': ["indiana", "in"],
    '19': ["iowa", "ia"],
    '20': ["kansas", "ks"],
    '21': ["kentucky", "ky"],
    '22': ["louisiana", "la"],
    '23': ["maine", "me"],
    '24': ["maryland", "md"],
    '25': ["massachusetts", "ma"],
    '26': ["michigan", "mi"],
    '27': ["minnesota", "mn"],
    '28': ["mississippi", "ms"],
    '29': ["missouri", "mo"],
    '30': ["montana", "mt"],
    '31': ["nebraska", "ne"],
    '32': ["nevada", "nv"],
    '33': ["new hampshire", "nh"],
    '34': ["new jersey", "nj"],
    '35': ["new mexico", "nm"],
    '36': ["new york", "ny"],
    '37': ["north carolina", "nc"],
    '38': ["north dakota", "nd"],
    '39': ["ohio", "oh"],
    '40': ["oklahoma", "ok"],
    '41': ["oregon", "or"],
    '42': ["pennsylvania", "pa"],
    '44': ["rhode island", "ri"],
    '45': ["south carolina", "sc"],
    '46': ["south dakota", "sd"],
    '47': ["tennessee", "tn"],
    '48': ["texas", "tx"],
    '49': ["utah", "ut"],
    '50': ["vermont", "vt"],
    '51': ["virginia", "va"],
    '53': ["washington", "wa"],
    '54': ["west virginia", "wv"],
    '55': ["wisconsin", "wi"],
    '56': ["wyoming", "wy"],
    '01': ["alabama", "al"],
    '02': ["alaska", "ak"],
    '04': ["arizona", "az"],
    '05': ["arkansas", "ar"],
    '06': ["california", "ca"],
    '08': ["colorado", "co"],
    '09': ["connecticut", "ct"]
  };

  const normalizedStateName = stateName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*(state|st)\s*/g, '')
    .trim();

  return (
    Object.entries(stateMapping)
          .find(([, names]) => names.includes(normalizedStateName))?.[0] 
  ) as StateCode | undefined;
}
