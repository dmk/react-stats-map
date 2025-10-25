# @dkkoval/react-de-stats-map

A React component for visualizing data on a map of Germany by state.

## Installation

```bash
npm install @dkkoval/react-de-stats-map
# or
yarn add @dkkoval/react-de-stats-map
```

## Usage

```tsx
import DEMap from '@dkkoval/react-de-stats-map';
import { StateCode } from '@dkkoval/react-de-stats-map';

function App() {
  const data: Record<StateCode, number> = {
    // Your data here
  };

  return (
    <DEMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="Germany Statistics"
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
