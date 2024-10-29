import React, { useMemo } from 'react';

import { motion } from 'framer-motion';

import * as topojson from 'topojson-client';

import { scaleThreshold } from '@visx/scale';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { geoMercator, geoPath } from '@visx/vendor/d3-geo';

import UAMapLegend from './UAMapLegend';
import UAMapTitle from './UAMapTitle';
import { OblastCode } from '@/types';

import topology from '../assets/maps/ua-adm1.json';

const { features } = topojson.feature(
  topology,
  topology.objects.ukraine
) as topojson.FeatureCollection;

export type ThresholdColor = {
  threshold: number;
  color: string;
};

export interface MapStyle {
  padding?: number;
  borderColor?: string;
  defaultFillColor?: string;
}

export interface UAMapProps {
  width: number;
  height: number;
  data: Record<OblastCode, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
}

export function UAMap({
  width,
  height,
  data,
  valueName,
  title,
  hideTitle = false,
  hideLegend = false,
  mapStyle = {},
  thresholdColors,
}: UAMapProps) {
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  const {
    padding = 10,
    borderColor = '#ebf4f3',
    defaultFillColor = '#cbd5e1',
  } = mapStyle;

  // Adjust heights based on whether Title and Legend are hidden
  const titleHeight = hideTitle ? 0 : height * 0.1;
  const legendHeight = hideLegend ? 0 : height * 0.1;
  const mapHeight = height - titleHeight - legendHeight;

  // Create a projection for Ukraine using fitExtent
  const projection = useMemo(() => {
    const proj = geoMercator().fitExtent(
      [
        [padding, padding],
        [width - padding, mapHeight - padding],
      ],
      {
        type: 'FeatureCollection',
        features,
      }
    );
    return proj;
  }, [width, mapHeight, padding]); // Added padding to dependencies

  // Create a path generator using the projection
  const pathGenerator = useMemo(() => geoPath().projection(projection), [
    projection,
  ]);

  const maxValue = useMemo(() => Math.max(...Object.values(data)), [data]);

  // Default thresholds and colors if the user doesn't provide any
  const defaultThresholdColors: ThresholdColor[] = useMemo(() => {
    const stepSize = maxValue / 5;
    const defaultColors = ['#34d399', '#10b981', '#059669', '#047857', '#065f46'];

    return Array.from({ length: 5 }, (_, i) => ({
      threshold: Math.round((i + 1) * stepSize),
      color: defaultColors[i],
    }));
  }, [maxValue]);

  const usedThresholdColors = thresholdColors || defaultThresholdColors;

  // Ensure thresholds are sorted in ascending order
  usedThresholdColors.sort((a, b) => a.threshold - b.threshold);

  // Extract thresholds and colors from the array
  const usedThresholds = usedThresholdColors.map(tc => tc.threshold);
  const usedColors = usedThresholdColors.map(tc => tc.color);

  // For scaleThreshold, the number of colors should be one more than the number of thresholds
  // Include a color for values below the first threshold
  const colorScale = useMemo(
    () =>
      scaleThreshold<number, string>()
        .domain(usedThresholds)
        .range(usedColors),
    [usedThresholds, usedColors]
  );

  const paths = useMemo(
    () => features.map((feature) => pathGenerator(feature)),
    [pathGenerator]
  );

  if (width < 300) return null;

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: width,
          height: height,
          overflow: 'hidden',
        }}
      >
        {/* Map Title */}
        {!hideTitle && (
          <UAMapTitle width={width} height={titleHeight} title={title} />
        )}

        {/* Map Container */}
        <div
          style={{
            position: 'absolute',
            top: titleHeight,
            left: 0,
            width: width,
            height: mapHeight,
          }}
        >
          <svg width={width} height={mapHeight}>
            {features.map((feature, i) => {
              const name = feature.properties.name;
              const code: OblastCode = feature.properties.code;
              const value = data[code];

              return (
                <React.Fragment key={`map-feature-${i}`}>
                  <motion.path
                    d={paths[i] || ''}
                    fill={colorScale(value) || defaultFillColor}
                    stroke={borderColor}
                    strokeWidth={1}
                    whileHover={{
                      strokeWidth: 2,
                      scale: 1.01,
                    }}
                    onMouseEnter={(event) => {
                      const element = event.target as SVGPathElement;
                      (element.parentNode as Node).appendChild(element);
                    }}
                    onMouseLeave={hideTooltip}
                    onMouseMove={(event) => {
                      const { clientX, clientY } = event;
                      showTooltip({
                        tooltipData: (
                          <div
                            style={{
                              padding: '4px',
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '8px',
                            }}
                          >
                            <svg width={16} height={16}>
                              <circle
                                fill={colorScale(value) || defaultFillColor}
                                r={8}
                                cx={8}
                                cy={8}
                              />
                            </svg>
                            {name}:&nbsp;
                            {value ? (
                              <>
                                {value} {valueName}
                              </>
                            ) : (
                              <>дані відсутні</>
                            )}
                          </div>
                        ),
                        tooltipLeft: clientX + 10,
                        tooltipTop: clientY + 10,
                      });
                    }}
                  />
                </React.Fragment>
              );
            })}
          </svg>
        </div>

        {/* Legend Container */}
        {!hideLegend && (
          <UAMapLegend
            width={width}
            height={legendHeight}
            colorScale={colorScale}
          />
        )}
      </div>

      {tooltipData && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
          {tooltipData as React.ReactNode}
        </TooltipWithBounds>
      )}
    </>
  );
}
