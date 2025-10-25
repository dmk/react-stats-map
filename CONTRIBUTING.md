# Contributing

## How to Add a New Country

1. **Add GeoJSON file** to `maps/`:
   ```bash
   cp your-map.json maps/fr-adm1.json
   ```

2. **Add config** to `config/maps.config.json`:
   ```jsonc
   {
     "id": "fr",
     "name": "France",
     "packageName": "@dkkoval/react-fr-stats-map",
     "componentName": "FRMap",
     "propsName": "FRMapProps",
     "geojsonFile": "fr-adm1.json",
     // Object key in TopoJSON file (check your .json file structure)
     "topojsonObject": "france",
     "regionType": "Region",
     "regionCodeType": "RegionCode",
     // All valid region codes for TypeScript types
     "regionCodes": ["IDF", "ARA", "BFC", "CVL", "GES", ...],
     // Paths to extract data from GeoJSON feature properties
     "accessors": {
       "name": "properties.name",  // Where to find region name
       "code": "properties.code"   // Where to find region code
     },
     // Optional: Helper to map messy input names to clean codes
     "helperFunction": {
       "name": "getRegionCode",
       // Maps each code to possible name variations
       "mapping": {
         "IDF": ["île-de-france", "paris"],
         "ARA": ["auvergne-rhône-alpes"],
         ...
       },
       // JavaScript string manipulation to normalize input
       "normalization": "toLowerCase().trim()"
     },
     "description": "React component for France map visualization",
     "keywords": ["react", "map", "france", "d3", "visx"]
   }
   ```

3. **Generate and build**:
   ```bash
   pnpm generate
   pnpm install
   pnpm build:all
   ```

4. **Commit**:
   ```bash
   git add maps/fr-adm1.json config/maps.config.json
   git commit -m "feat: add France map"
   ```

## Other Changes

### Edit Templates
Country packages are auto-generated. To modify them:
- Edit `templates/*`
- Run `pnpm generate`
- Commit only templates, not generated files

### Edit Core Package
`packages/react-stats-map/` is hand-written:
```bash
cd packages/react-stats-map
# Edit files
pnpm build
```

## Config Fields

- `id` - Short code (e.g., "fr")
- `componentName` - Component name (e.g., "FRMap")
- `geojsonFile` - File in `maps/`
- `topojsonObject` - Object name in TopoJSON
- `regionCodes` - Array of region codes
- `accessors` - Property paths in GeoJSON features
- `helperFunction.mapping` - Maps region names to codes
- `helperFunction.normalization` - String normalization logic

## What to Commit

✅ Commit:
- `templates/`, `config/`, `maps/`
- `packages/react-stats-map/`

❌ Don't commit:
- `packages/react-{country}-stats-map/` (generated)
