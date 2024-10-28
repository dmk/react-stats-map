// Define types for oblasts
export type OblastCode =
  | 'CK' | 'CH' | 'CV' | 'KR' | 'DP' | 'DT' | 'IF' | 'KK' | 'KS' | 'KM'
  | 'KV' | 'KC' | 'KH' | 'LH' | 'LV' | 'MY' | 'OD' | 'PL' | 'RV' | 'SC'
  | 'SM' | 'TP' | 'ZK' | 'VI' | 'VO' | 'ZP' | 'ZT';

// Define types for props
export interface UAMapProps {
  width: number;
  height: number;
  data: Record<OblastCode, number>;
  valueName: string;
  title: string;
}
