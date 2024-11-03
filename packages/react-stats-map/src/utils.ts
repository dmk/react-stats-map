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
