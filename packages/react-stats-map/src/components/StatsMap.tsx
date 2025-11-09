import React, { useMemo } from 'react';

import type { Feature, FeatureCollection } from 'geojson';

import { scaleThreshold } from '@visx/scale';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { geoMercator, geoPath, geoAlbersUsa } from '@visx/vendor/d3-geo';

import StatsMapLegend from './StatsMapLegend';
import StatsMapTitle from './StatsMapTitle';
import { calculateQuantileThresholds } from '../utils';

export type ThresholdColor = {
  threshold: number;
  color: string;
};

export type ProjectionType = 'mercator' | 'albersUsa';

export interface HoverStyle {
  /** Whether to enable hover effects (default: true) */
  enabled?: boolean;
  /** CSS styles to apply on hover */
  styles?: React.CSSProperties;
  /** CSS styles to reset to on mouse leave (optional, defaults to clearing hover styles) */
  resetStyles?: React.CSSProperties;
  /** Transition duration in milliseconds (default: 200) */
  transitionDuration?: number;
  /** Transition timing function (default: 'ease') */
  transitionTiming?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  /** CSS properties to transition (default: 'all') */
  transitionProperties?: string;
}

export interface MapStyle {
  padding?: number;
  borderColor?: string;
  defaultFillColor?: string;
  hoverStyle?: HoverStyle;
}

export interface StatsMapProps {
  topojsonFeatures: Feature[];
  width: number;
  height: number;
  data: Record<string, number>;
  valueName: string;
  title: string;
  hideLegend?: boolean;
  hideTitle?: boolean;
  mapStyle?: MapStyle;
  thresholdColors?: ThresholdColor[];
  nameAccessor: (feature: Feature) => string;
  codeAccessor: (feature: Feature) => string;
  projectionType?: ProjectionType;
}

export function StatsMap({
  topojsonFeatures,
  width,
  height,
  data,
  valueName,
  title,
  nameAccessor = (feature: Feature): string => feature.properties.name,
  codeAccessor = (feature: Feature): string => feature.properties.code,
  hideTitle = false,
  hideLegend = false,
  mapStyle = {},
  thresholdColors,
  projectionType = 'mercator',
}: StatsMapProps) {
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  const {
    padding = 10,
    borderColor = '#ebf4f3',
    defaultFillColor = '#cbd5e1',
    hoverStyle = {},
  } = mapStyle;

  // Destructure hover style with defaults
  const {
    enabled: hoverEnabled = true,
    styles: hoverStyles = {
      strokeWidth: 2,
      transform: 'scale(1.01)',
    },
    resetStyles: hoverResetStyles,
    transitionDuration = 200,
    transitionTiming = 'ease',
    transitionProperties = 'all',
  } = hoverStyle;

  // Adjust heights based on whether Title and Legend are hidden
  const titleHeight = hideTitle ? 0 : height * 0.1;
  const legendHeight = hideLegend ? 0 : height * 0.1;
  const mapHeight = height - titleHeight - legendHeight;

  // Create a projection based on the projection type
  const projection = useMemo(() => {
    const baseProj = projectionType === 'albersUsa' ? geoAlbersUsa() : geoMercator();

    const proj = baseProj.fitExtent(
      [
        [padding, padding],
        [width - padding, mapHeight - padding],
      ],
      {
        type: 'FeatureCollection',
        features: topojsonFeatures,
      }
    );
    return proj;
  }, [width, mapHeight, padding, projectionType, topojsonFeatures]);

  // Create a path generator using the projection
  const pathGenerator = useMemo(() => geoPath().projection(projection), [
    projection,
  ]);

  const maxValue = useMemo(() => Math.max(...Object.values(data)), [data]);

  // Default thresholds and colors if the user doesn't provide any
  // Uses quantile-based bucketing to ensure equal distribution of data points across buckets
  const defaultThresholdColors: ThresholdColor[] = useMemo(() => {
    const defaultColors = ['#34d399', '#10b981', '#059669', '#047857', '#065f46'];
    const dataValues = Object.values(data);
    const quantileThresholds = calculateQuantileThresholds(dataValues, defaultColors.length);

    // For scaleThreshold: N thresholds need N+1 colors
    // Each threshold marks the start of the next color (colors[i+1])
    return quantileThresholds.map((threshold, i) => ({
      threshold,
      color: defaultColors[i + 1],
    }));
  }, [data]);

  const usedThresholdColors = (thresholdColors || defaultThresholdColors).slice().sort((a, b) => a.threshold - b.threshold);

  // Extract thresholds and colors from the array
  const usedThresholds = usedThresholdColors.map(tc => tc.threshold);
  const usedColors = usedThresholdColors.map(tc => tc.color);

  // For scaleThreshold, we need N+1 colors for N thresholds
  // Prepend the first color (for values below the first threshold)
  const colorScale = useMemo(
    () => {
      const allColors = ['#34d399', ...usedColors];
      return scaleThreshold<number, string>()
        .domain(usedThresholds)
        .range(allColors);
    },
    [usedThresholds, usedColors]
  );

  const paths = useMemo(
    () => topojsonFeatures.map((feature) => pathGenerator(feature)),
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
          <StatsMapTitle width={width} height={titleHeight} title={title} />
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
            {topojsonFeatures.map((feature, i) => {
              const name = nameAccessor(feature);
              const code: string = codeAccessor(feature);
              const value = data[code];

              return (
                <React.Fragment key={`map-feature-${i}`}>
                  <path
                    d={paths[i] || ''}
                    fill={colorScale(value) || defaultFillColor}
                    stroke={borderColor}
                    strokeWidth={1}
                    style={{
                      transition: hoverEnabled
                        ? `${transitionProperties} ${transitionDuration}ms ${transitionTiming}`
                        : 'none',
                      transformBox: 'fill-box',
                      transformOrigin: 'center center',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(event) => {
                      const element = event.target as SVGPathElement;

                      // Bring the hovered region to the front first
                      (element.parentNode as Node).appendChild(element);

                      // Force a style recalculation so browser sees default state after DOM change
                      if (hoverEnabled) {
                        void element.getBoundingClientRect();

                        // Apply hover styles - CSS transitions will animate
                        Object.assign(element.style, hoverStyles);
                      }
                    }}
                    onMouseLeave={(event) => {
                      const element = event.target as SVGPathElement;

                      // Reset styles - CSS transitions handle the animation
                      if (hoverEnabled) {
                        if (hoverResetStyles) {
                          // Use explicit reset styles if provided
                          Object.assign(element.style, hoverResetStyles);
                        } else {
                          // Clear hover styles by setting them to empty strings
                          Object.keys(hoverStyles).forEach(key => {
                            (element.style as any)[key] = '';
                          });
                        }
                      }
                      hideTooltip();
                    }}
                    onMouseMove={(event) => {
                      const svgElement = event.currentTarget.ownerSVGElement;
                      if (!svgElement) return;

                      const svgRect = svgElement.getBoundingClientRect();
                      const { clientX, clientY } = event;

                      // Calculate position relative to the SVG container
                      const x = clientX - svgRect.left;
                      const y = clientY - svgRect.top;

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
                        tooltipLeft: x + 10,
                        tooltipTop: y + titleHeight + 10,
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
          <StatsMapLegend
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
