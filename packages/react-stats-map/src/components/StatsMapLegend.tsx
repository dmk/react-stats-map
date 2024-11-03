import { ScaleThreshold } from 'd3-scale';
import { LegendItem, LegendLabel, LegendThreshold } from '@visx/legend';

export interface StatsMapLegendProps {
  width: number;
  height: number;
  colorScale: ScaleThreshold<number, string>;
}

export default function StatsMapLegend({ width, height, colorScale }: StatsMapLegendProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height,
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
                    marginLeft: '.5rem',
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
  );
}
