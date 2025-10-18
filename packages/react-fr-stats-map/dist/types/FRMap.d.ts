import React from 'react';
import { RegionCode } from '@/types';
import { MapStyle, ThresholdColor } from '@dkkoval/react-stats-map';
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
export declare function FRMap(props: FRMapProps): React.JSX.Element;
