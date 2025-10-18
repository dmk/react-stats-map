# @dkkoval/react-fr-stats-map

A React component for visualizing data on a map of France by region.

## Installation

```bash
npm install @dkkoval/react-fr-stats-map
# or
yarn add @dkkoval/react-fr-stats-map
```

## Usage

```tsx
import FRMap from '@dkkoval/react-fr-stats-map';
import { RegionCode } from '@dkkoval/react-fr-stats-map';

function App() {
  const data: Record<RegionCode, number> = {
    // Your data here
  };

  return (
    <FRMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="France Statistics"
    />
  );
}
```

## API

### Props

- `width`: number - Width of the map component
- `height`: number - Height of the map component
- `data`: Record<RegionCode, number> - Statistical data for each region
- `valueName`: string - Name of the value being displayed
- `title`: string - Title of the map
- `hideLegend?`: boolean - Whether to hide the legend (default: false)
- `hideTitle?`: boolean - Whether to hide the title (default: false)
- `mapStyle?`: MapStyle - Custom styling options
- `thresholdColors?`: ThresholdColor[] - Custom color thresholds

## License

Apache-2.0
