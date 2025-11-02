# @dkkoval/react-us-stats-map

A React component for visualizing data on a map of the United States by state.

## Installation

```bash
npm install @dkkoval/react-us-stats-map
# or
yarn add @dkkoval/react-us-stats-map
```

## Usage

```tsx
import USMap from '@dkkoval/react-us-stats-map';
import { StateCode } from '@dkkoval/react-us-stats-map';

function App() {
  const data: Record<StateCode, number> = {
    // Your data here
  };

  return (
    <USMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="United States Statistics"
    />
  );
}
```

## API

### Props

- `width`: number - Width of the map component
- `height`: number - Height of the map component
- `data`: Record<StateCode, number> - Statistical data for each region
- `valueName`: string - Name of the value being displayed
- `title`: string - Title of the map
- `hideLegend?`: boolean - Whether to hide the legend (default: false)
- `hideTitle?`: boolean - Whether to hide the title (default: false)
- `mapStyle?`: MapStyle - Custom styling options
- `thresholdColors?`: ThresholdColor[] - Custom color thresholds

## License

Apache-2.0
