import React from 'react';
import { feature } from 'topojson-client';

import { StateCode } from '@/types';

import topology from './assets/maps/us-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.states as any
) as any;

export interface USMapProps {
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

export function USMap(props: USMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => (f.properties?.name ?? '') as string}
      codeAccessor={(f) => (f.id ?? '') as string}
      projectionType="albersUsa"
    />
  )
}
