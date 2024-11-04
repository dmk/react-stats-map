import { OblastCode } from './types';

// Helper function to convert oblast names to codes
export function getOblastCode(oblastName: string): OblastCode | undefined {
  const oblastMapping: Record<OblastCode, string[]> = {
    'CK': ['черкаська', 'cherkasy'],
    'CH': ['чернігівська', 'chernihiv'],
    'CV': ['чернівецька', 'chernivtsi'],
    'KR': ['автономна республіка крим', 'крим', 'crimea'],
    'DP': ['дніпропетровська', 'dnipropetrovsk'],
    'DT': ['донецька', 'donetsk'],
    'IF': ['івано-франківська', 'ivano-frankivsk'],
    'KK': ['харківська', 'kharkiv'],
    'KS': ['херсонська', 'kherson'],
    'KM': ['хмельницька', 'khmelnytskyi'],
    'KV': ['київська', 'kyivska'],
    'KC': ['київ', 'kyiv'],
    'KH': ['кіровоградська', 'kirovohrad'],
    'LH': ['луганська', 'luhansk'],
    'LV': ['львівська', 'lviv'],
    'MY': ['миколаївська', 'mykolaiv'],
    'OD': ['одеська', 'odesa'],
    'PL': ['полтавська', 'poltava'],
    'RV': ['рівненська', 'rivne'],
    'SC': ['севастополь', 'sevastopol'],
    'SM': ['сумська', 'sumy'],
    'TP': ['тернопільська', 'ternopil'],
    'ZK': ['закарпатська', 'zakarpattia'],
    'VI': ['вінницька', 'vinnytsia'],
    'VO': ['волинська', 'volyn'],
    'ZP': ['запорізька', 'zaporizhzhia'],
    'ZT': ['житомирська', 'zhytomyr']
  };

  const normalizedOblastName = oblastName
    .toLowerCase()
    .replace(/[.,]/g, '') // Remove punctuation
    .replace(/\s*(область|обл)\s*/g, '') // Remove 'область' or 'обл'
    .trim();

  return (
    Object.entries(oblastMapping)
          .find(([, names]) => names.includes(normalizedOblastName))?.[0] 
  ) as OblastCode | undefined;
}
