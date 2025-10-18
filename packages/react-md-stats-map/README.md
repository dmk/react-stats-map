# @dkkoval/react-md-stats-map

A React component for visualizing data on a map of Moldova by raion.

## Installation

```bash
npm install @dkkoval/react-md-stats-map
# or
yarn add @dkkoval/react-md-stats-map
```

## Usage

```tsx
import MDMap from '@dkkoval/react-md-stats-map';
import { RaionCode } from '@dkkoval/react-md-stats-map';

function App() {
  const data: Record<RaionCode, number> = {
    // Your data here
  };

  return (
    <MDMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="Moldova Statistics"
    />
  );
}
```

## API

### Props

- `width`: number - Width of the map component
- `height`: number - Height of the map component
- `data`: Record<RaionCode, number> - Statistical data for each region
- `valueName`: string - Name of the value being displayed
- `title`: string - Title of the map
- `hideLegend?`: boolean - Whether to hide the legend (default: false)
- `hideTitle?`: boolean - Whether to hide the title (default: false)
- `mapStyle?`: MapStyle - Custom styling options
- `thresholdColors?`: ThresholdColor[] - Custom color thresholds

## License

Apache-2.0
