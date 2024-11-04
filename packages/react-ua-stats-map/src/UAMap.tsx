import * as topojson from 'topojson-client';

import { OblastCode } from '@/types';

import topology from './assets/maps/ua-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = topojson.feature(
  topology,
  topology.objects.ukraine
) as topojson.FeatureCollection;

export interface UAMapProps {
  width: number;
  height: number;
  data: Record<OblastCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function UAMap(props: UAMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => f.properties.name}
      codeAccessor={(f) => f.properties.code}
    />
  )
}
