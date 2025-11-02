# @dkkoval/react-be-stats-map

A React component for visualizing data on a map of Belgium by province.

## Installation

```bash
npm install @dkkoval/react-be-stats-map
# or
yarn add @dkkoval/react-be-stats-map
```

## Usage

```tsx
import BEMap from '@dkkoval/react-be-stats-map';
import { ProvinceCode } from '@dkkoval/react-be-stats-map';

function App() {
  const data: Record<ProvinceCode, number> = {
    // Your data here
  };

  return (
    <BEMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="Belgium Statistics"
    />
  );
}
```

## API

### Props

- `width`: number - Width of the map component
- `height`: number - Height of the map component
- `data`: Record<ProvinceCode, number> - Statistical data for each region
- `valueName`: string - Name of the value being displayed
- `title`: string - Title of the map
- `hideLegend?`: boolean - Whether to hide the legend (default: false)
- `hideTitle?`: boolean - Whether to hide the title (default: false)
- `mapStyle?`: MapStyle - Custom styling options
- `thresholdColors?`: ThresholdColor[] - Custom color thresholds

## License

Apache-2.0
