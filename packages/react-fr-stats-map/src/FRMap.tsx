import React from 'react';
import { feature } from 'topojson-client';

import { RegionCode } from '@/types';

import topology from './assets/maps/fr-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.france as any
) as any;

export interface FRMapProps {
  width: number;
  height: number;
  data: Record<RegionCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function FRMap(props: FRMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => (f.properties?.nom ?? '') as string}
      codeAccessor={(f) => (f.properties?.code ?? '') as string}
    />
  )
}
