import React from 'react';
import { feature } from 'topojson-client';

import { RaionCode } from '@/types';

import topology from './assets/maps/md-adm1.json';
import StatsMap, { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';

const { features } = feature(
  topology as any,
  topology.objects.moldova as any
) as any;

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
