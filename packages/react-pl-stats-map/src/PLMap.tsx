import React from 'react';
import { feature } from 'topojson-client';

import { VoivodeshipCode } from '@/types';

import topology from './assets/maps/pl-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.POL_adm1 as any
) as any;

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
      nameAccessor={(f) => (f.properties?.VARNAME_1 ?? '') as string}
      codeAccessor={(f) => (f.properties?.CODE_1 ?? '') as string}
    />
  )
}
