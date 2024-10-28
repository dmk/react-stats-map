import React, { useEffect, useMemo } from 'react';
import { geoPath, geoMercator } from '@visx/vendor/d3-geo';
import * as topojson from 'topojson-client';
import topology from '../assets/maps/ua-adm1.json';
import { motion } from 'framer-motion';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { scaleThreshold } from '@visx/scale';
import { LegendItem, LegendLabel, LegendThreshold } from '@visx/legend';
import { OblastCode, UAMapProps } from '../types';

const { features } = topojson.feature(
  topology,
  topology.objects.ukraine
) as topojson.FeatureCollection;

export function UAMap({ width, height, data, valueName, title }: UAMapProps) {
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip();

  // Allocate space for title and legend
  const titleHeight = height * 0.1;
  const legendHeight = height * 0.1;
  const mapHeight = height - titleHeight - legendHeight;

  const centerX = width / 2;
  const centerY = mapHeight / 2;

  // Create a projection for Ukraine using fitSize
  const projection = useMemo(() => {
    const proj = geoMercator().fitSize(
      [width, mapHeight],
      { type: 'FeatureCollection', features }
    );
    return proj;
  }, [width, mapHeight]);

  // Create a path generator using the projection
  const pathGenerator = useMemo(() => geoPath().projection(projection), [
    projection,
  ]);

  const maxValue = useMemo(() => Math.max(...Object.values(data)), [data]);

  // Create levels automatically
  const stepSize = maxValue / 5;
  const thresholdLevels = Array.from(
    { length: 5 },
    (_, i) => Math.round((i + 1) * stepSize)
  );

  const colorScale = useMemo(
    () =>
      scaleThreshold<number, string>()
        .domain(thresholdLevels)
        .range(['#34d399', '#10b981', '#059669', '#047857', '#065f46']),
    [thresholdLevels]
  );

  const paths = useMemo(
    () => features.map((feature) => pathGenerator(feature)),
    [pathGenerator]
  );

  if (width < 420) return null;

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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            height: titleHeight,
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            lineHeight: `${titleHeight}px`,
          }}
        >
          {title}
        </div>

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
                    fill={colorScale(value) || '#cbd5e1'}
                    stroke="#EBF4F3"
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
                              <circle fill={colorScale(value) || '#cbd5e1'} r={8} cx={8} cy={8} />
                            </svg>
                            {name}:&nbsp;
                            {value ? (<>{value} {valueName}</>) : (<>дані відсутні</>)}
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
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: width,
            height: legendHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LegendThreshold scale={colorScale}>
            {(labels) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.2rem',
                }}
              >
                {labels.reverse().map((label, i) => (
                  <LegendItem key={`legend-quantile-${i}`}>
                    <svg width={18} height={18}>
                      <circle fill={label.value} r={9} cx={9} cy={9} />
                    </svg>
                    <LegendLabel
                      style={{
                        fontSize: '0.875rem',
                        marginLeft: '.5rem'
                      }}
                    >
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                ))}
              </div>
            )}
          </LegendThreshold>
        </div>
      </div>


      {tooltipData && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
          {tooltipData as React.ReactNode}
        </TooltipWithBounds>
      )}
    </>
  );
}
