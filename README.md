# React Stats Map

A template-based monorepo for generating React map visualization packages. Contains a core package and auto-generated country-specific packages.

## Structure

```
.
├── packages/
│   ├── react-stats-map/        # Core package (hand-written)
│   ├── react-{country}-stats-map/  # Country packages (GENERATED from templates)
├── maps/                       # GeoJSON/TopoJSON files
├── templates/                  # Package templates
├── config/maps.config.json    # Configuration for all maps
└── example/                    # Demo app
```

## Setup

```bash
pnpm install
pnpm generate    # Generate country packages from templates
pnpm build:all
```

## Usage Example

```tsx
import { FRMap } from '@dkkoval/react-fr-stats-map';

const data = [
  { code: 'IDF', value: 12.2, label: 'Île-de-France' },
  { code: 'ARA', value: 8.0, label: 'Auvergne-Rhône-Alpes' },
];

<FRMap
  data={data}
  colorScale={['#fff', '#00f']}
  width={600}
  height={400}
/>
```

## Available Packages

- `react-stats-map` - Core package
- `react-ua-stats-map` - Ukraine
- `react-pl-stats-map` - Poland
- `react-md-stats-map` - Moldova
- `react-eu-stats-map` - Europe
- `react-fr-stats-map` - France

## Scripts

```bash
pnpm generate       # Generate packages from templates
pnpm build:all      # Build everything
pnpm verify         # Check packages are up-to-date
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a new country.

## License

Apache-2.0
