# @dkkoval/react-nl-stats-map

A React component for visualizing data on a map of the Netherlands by province.

## Installation

```bash
npm install @dkkoval/react-nl-stats-map
# or
yarn add @dkkoval/react-nl-stats-map
```

## Usage

```tsx
import NLMap from '@dkkoval/react-nl-stats-map';
import { ProvinceCode } from '@dkkoval/react-nl-stats-map';

function App() {
  const data: Record<ProvinceCode, number> = {
    // Your data here
  };

  return (
    <NLMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="Netherlands Statistics"
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
