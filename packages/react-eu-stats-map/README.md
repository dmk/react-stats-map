# @dkkoval/react-eu-stats-map

A React component for visualizing data on a map of Europe by country.

## Installation

```bash
npm install @dkkoval/react-eu-stats-map
# or
yarn add @dkkoval/react-eu-stats-map
```

## Usage

```tsx
import EUMap from '@dkkoval/react-eu-stats-map';
import { CountryCode } from '@dkkoval/react-eu-stats-map';

function App() {
  const data: Record<CountryCode, number> = {
    // Your data here
  };

  return (
    <EUMap
      width={800}
      height={600}
      data={data}
      valueName="Population"
      title="Europe Statistics"
    />
  );
}
```

## API

### Props

- `width`: number - Width of the map component
- `height`: number - Height of the map component
- `data`: Record<CountryCode, number> - Statistical data for each region
- `valueName`: string - Name of the value being displayed
- `title`: string - Title of the map
- `hideLegend?`: boolean - Whether to hide the legend (default: false)
- `hideTitle?`: boolean - Whether to hide the title (default: false)
- `mapStyle?`: MapStyle - Custom styling options
- `thresholdColors?`: ThresholdColor[] - Custom color thresholds

## License

Apache-2.0
