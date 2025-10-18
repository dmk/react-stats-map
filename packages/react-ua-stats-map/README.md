# @dkkoval/react-ua-stats-map

A React component for visualizing data on a map of Ukraine by oblast.

## Installation

```bash
npm install @dkkoval/react-ua-stats-map
# or
yarn add @dkkoval/react-ua-stats-map
```

## Usage

```tsx
import UAMap from '@dkkoval/react-ua-stats-map';
import { OblastCode } from '@dkkoval/react-ua-stats-map';

function App() {
  const data: Record<OblastCode, number> = {
    // Your data here
  };

  return (
    <UAMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="Ukraine Statistics"
    />
  );
}
```

## API

### Props

- `width`: number - Width of the map component
- `height`: number - Height of the map component
- `data`: Record<OblastCode, number> - Statistical data for each region
- `valueName`: string - Name of the value being displayed
- `title`: string - Title of the map
- `hideLegend?`: boolean - Whether to hide the legend (default: false)
- `hideTitle?`: boolean - Whether to hide the title (default: false)
- `mapStyle?`: MapStyle - Custom styling options
- `thresholdColors?`: ThresholdColor[] - Custom color thresholds

## License

Apache-2.0
