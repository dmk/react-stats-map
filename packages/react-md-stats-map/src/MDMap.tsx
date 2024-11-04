import * as topojson from 'topojson-client';

import { RaionCode } from '@/types';

import topology from './assets/maps/md-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = topojson.feature(
  topology,
  topology.objects.moldova
) as topojson.FeatureCollection;

export interface MDMapProps {
  width: number;
  height: number;
  data: Record<RaionCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function MDMap(props: MDMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => f.properties.shapeName}
      codeAccessor={(f) => f.properties.shapeISO}
    />
  )
}
