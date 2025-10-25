import React from 'react';
import { feature } from 'topojson-client';

import { CountryCode } from '@/types';

import topology from './assets/maps/world.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.countries as any
) as any;

export interface WorldMapProps {
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

export function WorldMap(props: WorldMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => (f.properties?.name ?? '') as string}
      codeAccessor={(f) => (f.properties?.["ISO3166-1-Alpha-2"] ?? '') as string}
    />
  )
}
