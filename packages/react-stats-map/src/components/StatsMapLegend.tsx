import { ScaleThreshold } from 'd3-scale';
import { LegendItem, LegendLabel } from '@visx/legend';

export interface StatsMapLegendProps {
  width: number;
  height: number;
  colorScale: ScaleThreshold<number, string>;
}

interface LegendEntry {
  color: string;
  label: string;
}

function formatNumber(value: number): string {
  // Format number to avoid floating point issues while preserving meaningful decimals
  if (Math.abs(value - Math.round(value)) < 0.0001) {
    return Math.round(value).toString();
  }

  // Use up to 3 decimal places, but remove trailing zeros
  return value.toFixed(3).replace(/\.?0+$/, '');
}

export default function StatsMapLegend({ width, height, colorScale }: StatsMapLegendProps) {
  const thresholds = colorScale.domain();
  const colors = colorScale.range();

  // Build legend entries with proper ranges
  const legendEntries: LegendEntry[] = [];

  // Add entries for each color bucket
  for (let i = 0; i < colors.length; i++) {
    let label: string;

    if (i === 0) {
      // First bucket: "Less than X"
      label = `Less than ${formatNumber(thresholds[0])}`;
    } else if (i === colors.length - 1) {
      // Last bucket: "More than X"
      label = `More than ${formatNumber(thresholds[thresholds.length - 1])}`;
    } else {
      // Middle buckets: "X to Y"
      label = `${formatNumber(thresholds[i - 1])} to ${formatNumber(thresholds[i])}`;
    }

    legendEntries.push({
      color: colors[i],
      label,
    });
  }

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.2rem',
        }}
      >
        {legendEntries.reverse().map((entry, i) => (
          <LegendItem key={`legend-quantile-${i}`}>
            <svg width={18} height={18}>
              <circle fill={entry.color} r={9} cx={9} cy={9} />
            </svg>
            <LegendLabel
              style={{
                fontSize: '0.875rem',
                marginLeft: '.5rem',
              }}
            >
              {entry.label}
            </LegendLabel>
          </LegendItem>
        ))}
      </div>
    </div>
  );
}
