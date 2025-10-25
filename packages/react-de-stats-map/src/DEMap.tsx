import React from 'react';
import { feature } from 'topojson-client';

import { StateCode } from '@/types';

import topology from './assets/maps/de-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.germany as any
) as any;

export interface DEMapProps {
  width: number;
  height: number;
  data: Record<StateCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function DEMap(props: DEMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => (f.properties?.name ?? '') as string}
      codeAccessor={(f) => (f.properties?.id ?? '') as string}
    />
  )
}
