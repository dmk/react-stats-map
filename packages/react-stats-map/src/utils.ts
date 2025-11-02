import { interpolateRgb } from '@visx/vendor/d3-interpolate';

export function buildColorScale(
  startColor: string,
  endColor: string,
  steps: number
): string[] {
  const colorInterpolator = interpolateRgb(startColor, endColor);
  const colorScale: string[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // Normalized value between 0 and 1
    colorScale.push(colorInterpolator(t));
  }

  return colorScale;
}

/**
 * Intelligently round a number to remove floating point precision issues
 * while preserving meaningful decimal places.
 */
function smartRound(value: number): number {
  // If it's an integer or very close to one, return it as integer
  if (Math.abs(value - Math.round(value)) < 0.0001) {
    return Math.round(value);
  }

  // Determine appropriate decimal places based on magnitude
  const magnitude = Math.abs(value);
  let decimals = 2;

  if (magnitude < 1) {
    decimals = 3;
  } else if (magnitude < 10) {
    decimals = 2;
  } else if (magnitude < 100) {
    decimals = 1;
  } else {
    decimals = 0;
  }

  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Calculate quantile-based thresholds from data values.
 * This ensures each bucket contains approximately the same number of data points,
 * providing better distribution than equal-interval bucketing.
 *
 * @param dataValues - Array of numerical data values
 * @param numberOfBuckets - Number of color buckets to create (default: 5)
 * @returns Array of threshold values at quantile boundaries
 */
export function calculateQuantileThresholds(
  dataValues: number[],
  numberOfBuckets: number = 5
): number[] {
  // Filter out any undefined/null values and sort
  const sortedValues = dataValues
    .filter(val => val !== undefined && val !== null && !isNaN(val))
    .sort((a, b) => a - b);

  if (sortedValues.length === 0) {
    return [];
  }

  const thresholds: number[] = [];

  // Calculate quantile positions
  for (let i = 1; i < numberOfBuckets; i++) {
    const quantile = i / numberOfBuckets;
    const position = quantile * (sortedValues.length - 1);
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    const weight = position - lower;

    // Linear interpolation between values at floor and ceil positions
    const threshold = sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
    thresholds.push(smartRound(threshold));
  }

  return thresholds;
}
