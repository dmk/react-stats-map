import React, { useMemo } from 'react';
import { geoPath, geoMercator } from '@visx/vendor/d3-geo';
import * as topojson from 'topojson-client';
import topology from '../assets/maps/ua-adm1.json';
import { motion } from 'framer-motion';
import { TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { scaleThreshold } from '@visx/scale';
import { LegendItem, LegendLabel, LegendThreshold } from '@visx/legend';

// Define types for props
export interface UAMapProps {
  width: number;
  height: number;
  data: Record<string, number>;
  valueName: string;
  title: string;
}

const { features } = topojson.feature(topology, topology.objects.ukraine) as topojson.FeatureCollection;

export function UAMap({
  width, height, 
  data,
  valueName,
  title,
}: UAMapProps) {
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  const centerX = width / 2;
  const centerY = height / 2 - 65;
  const scale = (height < 700 ? height : width) / .4; // Adjust the scale to fit the width and height more flexibly

  // Create a projection for Ukraine
  const projection = useMemo(() => (
    geoMercator()
      .scale(scale) // Use a smaller scale initially
      .center([31, 49]) // Center projection roughly on Ukraine (Longitude, Latitude)
      .translate([centerX, centerY]) // Translate the map to the center of the SVG
  ), [scale, centerX, centerY]);

  // Create a path generator using the projection
  const pathGenerator = useMemo(() => (
    geoPath().projection(projection)
  ), [projection]);

  const maxValue = useMemo(() => (
    Math.max(...Object.values(data))
  ), [data]);

  // Create levels automatically
  const stepSize = maxValue / 5;
  const thresholdLevels = Array.from({ length: 5 }, (_, i) => Math.round((i + 1) * stepSize));

  const colorScale = useMemo(() => (
    scaleThreshold<number, string>()
      .domain(thresholdLevels)
      .range(['#34d399', '#10b981', '#059669', '#047857', '#065f46'])
  ), [thresholdLevels]);

  const paths = useMemo(() => (
    features.map((feature) => pathGenerator(feature))
  ), [pathGenerator]);

  if (width < 420) return null;

  return (
    <>
      <div className='flex justify-center text-md'>
        {title}
      </div>

      <svg width={width} height={height}>
        {features.map((feature, i) => {
          return (
            <React.Fragment key={`map-feature-${i}`}>
              <motion.path
                key={`map-feature-${i}`}
                d={paths[i] || ''}
                fill={colorScale(data[feature.properties?.name as string]) || '#cbd5e1'}
                stroke='#EBF4F3'
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
                onMouseMove={({ clientX, clientY }) => {
                  showTooltip({
                    tooltipData: (
                      <div className='p-1 flex flex-row gap-2'>
                        <svg width={16} height={16}>
                          <circle fill={colorScale(data[feature.properties?.name as string]) || '#cbd5e1'} r={8} cx={8} cy={8} />
                        </svg>

                        {feature.properties?.name}:&nbsp;
                        {data[feature.properties?.name as string] ? (
                          <>{data[feature.properties?.name as string]} {valueName}</>
                        ) : (
                          <>дані відсутні</>
                        )}
                      </div>
                    ),
                    tooltipLeft: clientX,
                    tooltipTop: clientY,
                  });
                }}
              />
            </React.Fragment>
          )
        })}
      </svg>

      <div
        style={{
          marginTop: '-3rrem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
          <LegendThreshold scale={colorScale}>
          {(labels) =>
            <div className='flex flex-row gap-4 md:gap-8'>
              {labels.reverse().map((label, i) => (
                <LegendItem
                  key={`legend-quantile-${i}`}
                  margin="1px 0"
                >
                  <svg width={18} height={18}>
                    <circle fill={label.value} r={9} cx={9} cy={9} />
                  </svg>
                  <LegendLabel align="left" margin="2px 0 0 8px" className='text-sm'>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          }
        </LegendThreshold>
      </div>

      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
        >
          {tooltipData as React.ReactNode}
        </TooltipWithBounds>
      )}
    </>
  );
}
