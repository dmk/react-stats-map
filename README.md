# React Stats Map

A collection of React components for displaying statistical data on interactive maps. This repository includes the base package `react-stats-map`, as well as per-country map components that build on top of the base one.

## 🏗️ Architecture

This is a **template-based monorepo** that generates multiple NPM packages from a core library and configuration files.

### Repository Structure

```
.
├── packages/
│   ├── react-stats-map/     # Core package (base for all country packages)
│   ├── react-ua-stats-map/  # Ukraine map component (GENERATED)
│   ├── react-pl-stats-map/  # Poland map component (GENERATED)
│   ├── react-md-stats-map/  # Moldova map component (GENERATED)
│   └── react-eu-stats-map/  # Europe map component (GENERATED)
├── maps/                     # Centralized GeoJSON/TopoJSON files
│   ├── ua-adm1.json
│   ├── pl-adm1.json
│   ├── md-adm1.json
│   └── eu.json
├── templates/                # Templates for generating packages
│   ├── Component.tsx.template
│   ├── types.ts.template
│   ├── utils.ts.template
│   ├── package.json.template
│   └── ...
├── config/
│   └── maps.config.json     # Metadata for all maps
├── configs/                  # Shared build configurations
│   ├── rollup.config.base.js
│   └── tsconfig.base.json
├── scripts/
│   └── generate-packages.js # Package generation script
├── example/                  # Example React app (+playground)
└── package.json              # Workspace configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or use asdf: `asdf install`)
- npm or yarn

### Installation

```bash
# Install dependencies for all packages
npm install

# Generate all country-specific packages from templates
npm run generate

# Build all packages
npm run build:all
```

## 📦 Packages

### Core Package: `react-stats-map`

The foundational package providing components and utilities for creating statistical maps. All country-specific packages depend on this.

**Location:** `packages/react-stats-map/`

### Country-Specific Packages (Generated)

These packages are **automatically generated** from templates and should not be manually edited:

- **[react-ua-stats-map](./packages/react-ua-stats-map/)** - Ukraine map by oblast
- **[react-md-stats-map](./packages/react-md-stats-map/)** - Moldova map by raion
- **[react-pl-stats-map](./packages/react-pl-stats-map/)** - Poland map by voivodeship
- **[react-eu-stats-map](./packages/react-eu-stats-map/)** - Europe map by country

## 🛠️ Development Workflow

### Adding a New Map/Country

1. **Add the GeoJSON file** to `maps/` directory:
   ```bash
   cp your-country.json maps/
   ```

2. **Update the configuration** in `config/maps.config.json`:
   ```json
   {
     "id": "fr",
     "name": "France",
     "packageName": "@dkkoval/react-fr-stats-map",
     "componentName": "FRMap",
     "propsName": "FRMapProps",
     "geojsonFile": "fr-adm1.json",
     "topojsonObject": "france",
     "regionType": "Region",
     "regionCodeType": "RegionCode",
     "regionCodes": ["IDF", "ARA", "BFC", ...],
     "accessors": {
       "name": "properties.name",
       "code": "properties.code"
     },
     "helperFunction": {
       "name": "getRegionCode",
       "mapping": {
         "IDF": ["île-de-france", "paris"],
         ...
       },
       "normalization": "toLowerCase().trim()"
     },
     "description": "A React component for visualizing data on a map of France by region.",
     "keywords": ["react", "map", "france", "d3", "visx"]
   }
   ```

3. **Generate the package**:
   ```bash
   npm run generate
   ```

4. **Install dependencies and build**:
   ```bash
   npm install
   npm run build:all
   ```

That's it! Your new package is ready to publish.

### Modifying Existing Packages

**⚠️ Important:** Country-specific packages are generated from templates. To modify them:

1. **Edit the templates** in `templates/` directory
2. **Or update** `config/maps.config.json` for configuration changes
3. **Re-generate** packages: `npm run generate`
4. **Rebuild** packages: `npm run build:all`

**DO NOT** manually edit files in generated packages - your changes will be overwritten!

### Modifying the Core Package

The core package (`packages/react-stats-map/`) is **not generated** and can be edited directly:

```bash
cd packages/react-stats-map
# Make your changes
npm run build
```

## 📜 Available Scripts

From the root directory:

```bash
npm run generate    # Generate all packages from templates
npm run build:all   # Build all packages
npm run clean:all   # Clean all build artifacts
```

## 🔧 Configuration Reference

See `config/maps.config.json` for the complete configuration schema. Key fields:

- `id`: Short identifier (e.g., "ua", "pl")
- `componentName`: React component name (e.g., "UAMap")
- `geojsonFile`: Filename in `maps/` directory
- `topojsonObject`: Object name in TopoJSON file
- `regionCodeType`: TypeScript type for region codes
- `accessors`: Property paths for extracting name and code from GeoJSON features
- `helperFunction`: Optional utility function configuration

## 🎨 Example Application

The `example/` directory contains a React playground for testing map components:

```bash
cd example
npm start
```

## 📄 License

Apache-2.0

## 👤 Author

Dmytro Koval

## 🤝 Contributing

1. For core functionality changes, edit `packages/react-stats-map/`
2. For template changes, edit `templates/` and regenerate
3. For new maps, add to `config/maps.config.json` and regenerate
4. Submit pull requests to the main repository

## 📊 Benefits of This Architecture

- ✅ **DRY (Don't Repeat Yourself)**: Single template for all country packages
- ✅ **Consistency**: All packages have identical structure
- ✅ **Easy Scaling**: Add new countries in minutes, not hours
- ✅ **Maintainability**: Update all packages by changing one template
- ✅ **Type Safety**: Generated TypeScript types for each country
- ✅ **Monorepo Benefits**: Shared dependencies, unified tooling
