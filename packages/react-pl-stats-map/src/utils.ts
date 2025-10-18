import { VoivodeshipCode } from './types';

// Helper function to convert voivodeship names to codes
export function getVoivodeshipCode(voivodeshipName: string): VoivodeshipCode | undefined {
  const voivodeshipMapping: Record<VoivodeshipCode, string[]> = {
    'LD': ["lódzkie", "lódź"],
    'SK': ["swietokrzyskie", "swiętokrzyskie"],
    'WP': ["wielkopolskie", "greater poland"],
    'KP': ["kujawsko-pomorskie", "kuyavian-pomeranian"],
    'MA': ["malopolskie", "lesser poland"],
    'DS': ["dolnoslaskie", "lower silesian"],
    'LU': ["lubelskie", "lublin"],
    'LB': ["lubuskie", "lubusz"],
    'MZ': ["mazowieckie", "masovian"],
    'OP': ["opolskie", "opole"],
    'PD': ["podlaskie", "podlachian"],
    'PM': ["pomorskie", "pomeranian"],
    'SL': ["slaskie", "silesian"],
    'PK': ["podkarpackie", "subcarpathian"],
    'WN': ["warminsko-mazurskie", "warmian-masurian"],
    'ZP': ["zachodniopomorskie", "west pomeranian"]
  };

  const normalizedVoivodeshipName = voivodeshipName
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s*([Ww]ojewództwo|[Vv]oivodeship|[Pp]rovince)\s*/g, '')
    .trim();

  return (
    Object.entries(voivodeshipMapping)
          .find(([, names]) => names.includes(normalizedVoivodeshipName))?.[0] 
  ) as VoivodeshipCode | undefined;
}
