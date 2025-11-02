import React from 'react';
import { feature } from 'topojson-client';

import { ProvinceCode } from '@/types';

import topology from './assets/maps/be-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.belgium as any
) as any;

export interface BEMapProps {
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

export function BEMap(props: BEMapProps) {
  return (
    <StatsMap
      {...props}
      topojsonFeatures={features}
      nameAccessor={(f) => (f.properties?.name ?? '') as string}
      codeAccessor={(f) => (f.properties?.id ?? '') as string}
    />
  )
}
