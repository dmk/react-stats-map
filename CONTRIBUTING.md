# Contributing Guide

Thank you for your interest in contributing to React Stats Map! This guide will help you understand the template-based architecture and how to make changes.

## 🏗️ Understanding the Architecture

This project uses a **template-based generation system**. Country-specific packages are **automatically generated** from:

1. **Templates** (`templates/` directory)
2. **Configuration** (`config/maps.config.json`)
3. **GeoJSON files** (`maps/` directory)

### What Gets Committed to Git

✅ **DO commit:**
- `templates/` - All template files
- `config/maps.config.json` - Map configurations
- `maps/` - GeoJSON/TopoJSON files
- `packages/react-stats-map/` - Core package (hand-written)
- `example/` - Example application
- `scripts/` - Generation scripts
- `configs/` - Shared build configurations

❌ **DO NOT commit:**
- `packages/react-{country}-stats-map/` - These are generated!
  - Exception: Screenshots in `docs/images/` should be committed
  - Exception: `LICENSE.txt` files should be committed

### Generated vs Hand-Written Code

| Directory | Type | Editable? |
|-----------|------|-----------|
| `packages/react-stats-map/` | Hand-written | ✅ Yes, edit directly |
| `packages/react-ua-stats-map/` | Generated | ❌ No, edit templates instead |
| `packages/react-pl-stats-map/` | Generated | ❌ No, edit templates instead |
| `packages/react-md-stats-map/` | Generated | ❌ No, edit templates instead |
| `packages/react-eu-stats-map/` | Generated | ❌ No, edit templates instead |
| `templates/` | Hand-written | ✅ Yes, these are the source |
| `config/maps.config.json` | Hand-written | ✅ Yes, this defines packages |

## 🛠️ Common Contribution Scenarios

### Scenario 1: Adding a New Country Map

**Example: Adding France**

1. **Prepare your GeoJSON file:**
   ```bash
   # Add your TopoJSON/GeoJSON file
   cp france-regions.json maps/fr-adm1.json
   ```

2. **Add configuration:**
   Edit `config/maps.config.json` and add:
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
     "regionCodes": ["IDF", "ARA", "BFC", "CVL", "GES", "HDF", "NOR", "NAQ", "OCC", "PDL", "PAC", "BRE", "COR"],
     "accessors": {
       "name": "properties.name",
       "code": "properties.code"
     },
     "helperFunction": {
       "name": "getRegionCode",
       "mapping": {
         "IDF": ["île-de-france", "paris"],
         "ARA": ["auvergne-rhône-alpes"],
         "BFC": ["bourgogne-franche-comté"]
         // ... more regions
       },
       "normalization": "toLowerCase().replace(/[.,]/g, '').replace(/\\s*(région|region)\\s*/g, '').trim()"
     },
     "description": "A React component for visualizing data on a map of France by region.",
     "keywords": ["react", "typescript", "map", "france", "d3", "visx", "data-visualisation"]
   }
   ```

3. **Generate the package:**
   ```bash
   npm run generate
   ```

4. **Test it:**
   ```bash
   npm install
   cd packages/react-fr-stats-map
   npm run build
   ```

5. **Commit your changes:**
   ```bash
   git add maps/fr-adm1.json
   git add config/maps.config.json
   git commit -m "feat: add France map package"
   ```

### Scenario 2: Fixing a Bug in All Country Packages

**Example: Fixing a typo in the component**

1. **Edit the template:**
   ```bash
   # Open and edit the template file
   vim templates/Component.tsx.template
   ```

2. **Regenerate all packages:**
   ```bash
   npm run generate
   ```

3. **Verify the fix:**
   ```bash
   # Check the generated files
   cat packages/react-ua-stats-map/src/UAMap.tsx
   cat packages/react-pl-stats-map/src/PLMap.tsx
   ```

4. **Commit only the template:**
   ```bash
   git add templates/Component.tsx.template
   git commit -m "fix: correct typo in map component template"
   ```

### Scenario 3: Updating the Core Package

**Example: Adding a new feature to StatsMap**

1. **Edit the core package directly:**
   ```bash
   cd packages/react-stats-map
   vim src/components/StatsMap.tsx
   ```

2. **Build and test:**
   ```bash
   npm run build
   ```

3. **Update version if publishing:**
   ```bash
   # Edit packages/react-stats-map/package.json
   # Bump version: 0.1.3 -> 0.1.4
   ```

4. **Regenerate country packages to use new core version:**
   ```bash
   cd ../..
   npm run generate
   ```

5. **Commit:**
   ```bash
   git add packages/react-stats-map/
   git add config/maps.config.json  # If you updated CORE_VERSION
   git commit -m "feat: add zoom capability to core map component"
   ```

### Scenario 4: Changing Build Configuration

**Example: Adding a new Rollup plugin**

1. **Update the base config:**
   ```bash
   vim configs/rollup.config.base.js
   ```

2. **Update the template:**
   ```bash
   vim templates/rollup.config.js.template
   ```

3. **Regenerate packages:**
   ```bash
   npm run generate
   ```

4. **Commit:**
   ```bash
   git add configs/rollup.config.base.js
   git add templates/rollup.config.js.template
   git commit -m "chore: add new rollup plugin for optimization"
   ```

## 🧪 Testing Your Changes

### Before Submitting a PR

1. **Regenerate all packages:**
   ```bash
   npm run generate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build everything:**
   ```bash
   npm run build:all
   ```

4. **Test in the example app:**
   ```bash
   cd example
   npm start
   # Manually test your changes
   ```

5. **Check generated files look correct:**
   ```bash
   # Spot-check a few generated files
   cat packages/react-ua-stats-map/src/UAMap.tsx
   cat packages/react-pl-stats-map/package.json
   ```

## 📋 Configuration Schema Reference

### `maps.config.json` Fields

```typescript
interface MapConfig {
  id: string;                    // Short ID (e.g., "ua", "pl", "fr")
  name: string;                  // Full name (e.g., "Ukraine", "France")
  packageName: string;           // NPM package name
  componentName: string;         // React component name (e.g., "UAMap")
  propsName: string;             // Props interface name (e.g., "UAMapProps")
  geojsonFile: string;           // Filename in maps/ directory
  topojsonObject: string;        // Object name in TopoJSON file
  regionType: string;            // Region type name (e.g., "Oblast", "Region")
  regionCodeType: string;        // TypeScript type name (e.g., "OblastCode")
  regionCodes: string[];         // Array of region codes
  accessors: {
    name: string;                // Property path for region name
    code: string;                // Property path for region code
  };
  helperFunction: {
    name: string;                // Function name (e.g., "getOblastCode")
    mapping: Record<string, string[]>;  // Code to name variations mapping
    normalization: string;       // String normalization chain
  };
  description: string;           // Package description
  keywords: string[];            // NPM keywords
}
```

### GeoJSON Requirements

Your GeoJSON/TopoJSON file should:

1. Be a valid TopoJSON file
2. Have a named object (referenced by `topojsonObject`)
3. Each feature should have properties accessible via the `accessors` paths
4. Region codes should match those in `regionCodes` array

## 🔍 Troubleshooting

### "My changes aren't showing up!"

- Did you edit a generated file instead of the template? ❌
- Re-run `npm run generate` after changing templates ✅

### "Build is failing in a country package"

1. Check if the error is in the template
2. Fix the template, not the generated file
3. Regenerate: `npm run generate`

### "I want to add a custom feature to just one country"

The template system is designed for consistency. If you need country-specific logic:

1. Add a configuration flag in `maps.config.json`
2. Update the template to conditionally include that logic
3. Or consider if the feature should be in the core package instead

## 📦 Publishing Packages

### Publishing the Core Package

```bash
cd packages/react-stats-map
npm version patch  # or minor, major
npm publish
```

### Publishing Country Packages

```bash
# Update version in template
vim templates/package.json.template

# Regenerate
npm run generate

# Publish each
cd packages/react-ua-stats-map && npm publish
cd ../react-pl-stats-map && npm publish
# ... etc
```

## 🎯 Best Practices

1. **Always regenerate before committing** - Run `npm run generate` to ensure consistency
2. **Test in example app** - Use `example/` to verify your changes work
3. **Keep templates simple** - Complex logic belongs in the core package
4. **Document config changes** - If you add new fields to `maps.config.json`, update this guide
5. **One feature per PR** - Easier to review and revert if needed

## 🤝 Getting Help

- Open an issue on GitHub
- Check existing issues for similar problems
- Review the main README.md for architecture overview

Thank you for contributing! 🎉
