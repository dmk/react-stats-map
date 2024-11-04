import * as topojson from 'topojson-client';

import { CountryCode } from '@/types';

import topology from './assets/maps/eu.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = topojson.feature(
  topology,
  topology.objects.europe
) as topojson.FeatureCollection;

export interface EUMapProps {
  width: number;
  height: number;
  data: Record<CountryCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function EUMap(props: EUMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => f.properties.NAME}
      codeAccessor={(f) => f.id}
    />
  )
}
