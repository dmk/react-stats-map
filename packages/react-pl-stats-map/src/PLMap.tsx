import * as topojson from 'topojson-client';

import { VoivodeshipCode } from '@/types';

import topology from './assets/maps/pl-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = topojson.feature(
  topology,
  topology.objects.POL_adm1
) as topojson.FeatureCollection;

export interface PLMapProps {
  width: number;
  height: number;
  data: Record<VoivodeshipCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function PLMap(props: PLMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => f.properties.VARNAME_1}
      codeAccessor={(f) => f.properties.CODE_1}
    />
  )
}
