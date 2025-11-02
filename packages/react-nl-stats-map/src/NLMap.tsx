import React from 'react';
import { feature } from 'topojson-client';

import { ProvinceCode } from '@/types';

import topology from './assets/maps/nl-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.netherlands as any
) as any;

export interface NLMapProps {
  width: number;
  height: number;
  data: Record<ProvinceCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function NLMap(props: NLMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => (f.properties?.name ?? '') as string}
      codeAccessor={(f) => (f.properties?.id ?? '') as string}
    />
  )
}
