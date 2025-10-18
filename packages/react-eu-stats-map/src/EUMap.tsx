import React from 'react';
import { feature } from 'topojson-client';

import { CountryCode } from '@/types';

import topology from './assets/maps/eu.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.europe as any
) as any;

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
      nameAccessor={(f) => (f.properties?.NAME ?? '') as string}
      codeAccessor={(f) => (f.id ?? '') as string}
    />
  )
}
