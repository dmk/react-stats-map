import { CountryCode } from './types';

// Helper function to convert country names to codes
export function getCountryCode(countryName: string): CountryCode | undefined {
  const countryMapping: Record<CountryCode, string[]> = {
    "AZ": ["azerbaijan"],
    "AL": ["albania"],
    "AM": ["armenia"],
    "BA": ["bosnia and herzegovina"],
    "BG": ["bulgaria"],
    "CY": ["cyprus"],
    "DK": ["denmark"],
    "IE": ["ireland"],
    "EE": ["estonia"],
    "AT": ["austria"],
    "CZ": ["czech republic"],
    "FI": ["finland"],
    "FR": ["france"],
    "GE": ["georgia"],
    "DE": ["germany"],
    "GR": ["greece"],
    "HR": ["croatia"],
    "HU": ["hungary"],
    "IS": ["iceland"],
    "IL": ["israel"],
    "IT": ["italy"],
    "LV": ["latvia"],
    "BY": ["belarus"],
    "LT": ["lithuania",],
    "SK": ["slovakia"],
    "LI": ["liechtenstein"],
    "MK": ["macedonia", "north macedonia", "the former tugoslav republic of macedonia"],
    "MT": ["malta"],
    "BE": ["belgium"],
    "FO": ["faroe islands"],
    "AD": ["andorra"],
    "LU": ["luxembourg"],
    "MC": ["monaco"],
    "ME": ["montenegro"],
    "NL": ["netherlands"],
    "NO": ["norway"],
    "PL": ["poland"],
    "PT": ["portugal"],
    "RO": ["romania"],
    "MD": ["moldova", "republic of moldova"],
    "SI": ["slovenia"],
    "ES": ["spain"],
    "SE": ["sweden"],
    "CH": ["switzerland"],
    "TR": ["turkey"],
    "GB": ["united kingdom"],
    "UA": ["ukraine"],
    "SM": ["san marino"],
    "RS": ["serbia"],
    "VA": ["vatican city", "holy see"],
  };

  const normalizedCountryName = countryName
    .toLowerCase()
    .replace(/[.,]/g, '') // Remove punctuation
    .trim();

  return (
    Object.entries(countryMapping)
      .find(([, names]) => names.includes(normalizedCountryName))?.[0]
  ) as CountryCode | undefined;
}
