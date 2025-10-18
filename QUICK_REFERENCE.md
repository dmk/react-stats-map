# Quick Reference Guide

## 🚀 Common Commands

```bash
# Generate all packages from templates
npm run generate

# Build all packages
npm run build:all

# Clean all build artifacts
npm run clean:all

# Install dependencies (after git clone)
npm install
```

## 📁 Directory Guide

| Directory | Purpose | Edit? |
|-----------|---------|-------|
| `templates/` | Source templates for packages | ✅ YES |
| `config/` | Package configuration | ✅ YES |
| `maps/` | GeoJSON files | ✅ YES |
| `scripts/` | Build scripts | ✅ YES |
| `packages/react-stats-map/` | Core package | ✅ YES |
| `packages/react-*-stats-map/` | Generated packages | ❌ NO (regenerate instead) |
| `example/` | Example app | ✅ YES |

## ➕ Adding a New Country

### Example: Adding France

**1. Add GeoJSON file** (2 minutes)
```bash
cp france-regions.json maps/fr-adm1.json
```

**2. Add configuration** (2 minutes)

Edit `config/maps.config.json`, add:
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
      "IDF": ["île-de-france", "paris region"],
      "ARA": ["auvergne-rhône-alpes"],
      "BFC": ["bourgogne-franche-comté"]
    },
    "normalization": "toLowerCase().replace(/[.,]/g, '').trim()"
  },
  "description": "A React component for visualizing data on a map of France by region.",
  "keywords": ["react", "typescript", "map", "france", "d3", "visx", "data-visualisation"]
}
```

**3. Generate** (< 1 minute)
```bash
npm run generate
npm install
npm run build:all
```

**Done!** ✅ Package `@dkkoval/react-fr-stats-map` is ready.

## 🔧 Fixing Bugs

### Bug in ALL packages

**1. Edit template**
```bash
vim templates/Component.tsx.template
```

**2. Regenerate**
```bash
npm run generate
npm run build:all
```

**3. Commit template only**
```bash
git add templates/
git commit -m "fix: bug description"
```

### Bug in CORE package

**1. Edit core**
```bash
cd packages/react-stats-map
vim src/components/StatsMap.tsx
```

**2. Build**
```bash
npm run build
```

**3. Commit**
```bash
git add packages/react-stats-map/
git commit -m "fix: bug description"
```

## 📦 Publishing

### Publish Core Package

```bash
cd packages/react-stats-map
npm version patch  # or minor, major
npm publish
```

### Publish Country Package

```bash
# Update version in template
vim templates/package.json.template

# Regenerate
npm run generate

# Publish
cd packages/react-ua-stats-map
npm publish
```

## 🎯 Configuration Fields

### Required Fields

```json
{
  "id": "XX",                    // Short code (2-3 chars)
  "name": "Country Name",
  "packageName": "@scope/react-XX-stats-map",
  "componentName": "XXMap",
  "propsName": "XXMapProps",
  "geojsonFile": "xx-adm1.json",
  "topojsonObject": "objectName", // From TopoJSON file
  "regionType": "Region",         // e.g., Oblast, State, Province
  "regionCodeType": "RegionCode",
  "regionCodes": ["A", "B", "C"], // All region codes
  "accessors": {
    "name": "properties.name",    // Path to region name
    "code": "properties.code"     // Path to region code
  },
  "helperFunction": {
    "name": "getRegionCode",      // Function name
    "mapping": {                  // Code -> name variations
      "A": ["name1", "name2"]
    },
    "normalization": "toLowerCase().trim()"
  },
  "description": "Package description",
  "keywords": ["keyword1", "keyword2"]
}
```

## 🔍 Finding GeoJSON Data

Good sources for GeoJSON/TopoJSON:

- **Natural Earth Data**: https://www.naturalearthdata.com/
- **Geojson.xyz**: http://geojson.xyz/
- **DataHub**: https://datahub.io/collections/geo
- **GitHub**: Search for "[country] geojson"

### Converting Shapefile to TopoJSON

```bash
# Install tools
npm install -g shapefile topojson

# Convert
shp2json input.shp | geo2topo > output.json
```

## 🧪 Testing

### Test Generation

```bash
npm run generate
```

Verify output:
- ✅ No errors
- ✅ All packages created
- ✅ Files look correct

### Test Build

```bash
npm run build:all
```

Verify:
- ✅ No TypeScript errors
- ✅ Dist folders created
- ✅ Types generated

### Test in Example App

```bash
cd example
npm start
```

Manually verify:
- ✅ Maps render
- ✅ Data displays
- ✅ Tooltips work

## 🐛 Troubleshooting

### "Package not found"

```bash
# After adding new package, run:
npm install
```

### "Types are wrong"

```bash
# Check regionCodes in config match GeoJSON
# Regenerate:
npm run generate
```

### "Build fails"

```bash
# Clean and rebuild
npm run clean:all
npm run build:all
```

### "Generation script fails"

```bash
# Check config syntax
cat config/maps.config.json | node -e "console.log(JSON.parse(require('fs').readFileSync(0)))"

# Check file exists
ls maps/your-file.json
```

## 📚 Full Documentation

- 📖 **README.md** - Project overview
- 🤝 **CONTRIBUTING.md** - Contribution guide  
- 🔄 **MIGRATION.md** - Migration guide
- 🔧 **TEMPLATE_SYSTEM.md** - Technical docs
- ✅ **IMPLEMENTATION_SUMMARY.md** - What was built

## 💡 Tips

1. **Always regenerate** after changing templates
2. **Test in example/** before publishing
3. **Keep config alphabetically sorted** for readability
4. **Use descriptive region codes** (2-3 chars)
5. **Include variations in mapping** for better UX
6. **Document custom normalizations**

## ⚠️ Common Mistakes

❌ Editing generated files directly
✅ Edit templates instead

❌ Committing generated files after changes
✅ Only commit templates/config

❌ Forgetting to regenerate
✅ Always run `npm run generate`

❌ Using incorrect accessor paths
✅ Inspect GeoJSON to find correct paths

## 🎯 Cheat Sheet

```bash
# Full workflow
vim templates/Component.tsx.template
npm run generate
npm run build:all
cd example && npm start

# Add country
vim maps/new.json
vim config/maps.config.json
npm run generate

# Commit
git add templates/ config/ maps/
git commit -m "feat: description"
```

---

**Need more help?** Check the full documentation in the repo! 📚
