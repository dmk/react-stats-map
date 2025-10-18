# PNPM Workspace Migration

This project has been successfully migrated from Yarn Workspaces to PNPM Workspaces.

## What Changed

### Package Manager
- **Before:** Yarn Workspaces
- **After:** PNPM Workspaces v10.18.3

### Key Benefits
- **Faster installs:** Up to 2x faster than Yarn
- **Disk space:** Efficient content-addressable storage
- **Strict dependencies:** Prevents phantom dependencies
- **Better for monorepos:** Superior workspace protocol handling

### Files Modified

#### New Files
- `pnpm-workspace.yaml` - PNPM workspace configuration
- `.pnpmrc` - PNPM settings
- `pnpm-lock.yaml` - PNPM lockfile

#### Removed Files
- All `yarn.lock` files (root and packages)

#### Updated Files
- `package.json` - Changed scripts from `yarn` to `pnpm`
- `scripts/build-packages.js` - Changed from `yarn build` to `pnpm build`
- `scripts/generate-packages.js` - Updated instructions
- `templates/package.json.template` - Uses `workspace:*` protocol
- `templates/Component.tsx.template` - Added null-safe accessors
- `templates/tsconfig.json.template` - Updated to ES2017 for Object.entries support
- `config/maps.config.json` - Updated accessors to use optional chaining
- `example/package.json` - Internal dependencies use `workspace:*`
- `packages/react-stats-map/package.json` - Added missing dependencies (d3-scale, @types/d3-scale, @types/geojson, tslib)

## Usage

### Install Dependencies
```bash
pnpm install
```

### Build Packages
```bash
pnpm build:packages
```

### Generate New Map Packages
```bash
pnpm generate
```

### Run Example App
```bash
pnpm dev
```

## Workspace Protocol

Internal package dependencies now use the `workspace:*` protocol:
```json
{
  "dependencies": {
    "@dkkoval/react-stats-map": "workspace:*"
  }
}
```

When publishing, PNPM automatically replaces `workspace:*` with the actual version number.

## Adding New Map Packages

The workflow remains the same:
1. Add your GeoJSON file to `maps/`
2. Add configuration to `config/maps.config.json`
3. Run `pnpm generate`
4. Run `pnpm install` to link workspace dependencies
5. Run `pnpm build:packages` to build

## Troubleshooting

### Phantom Dependencies
If you get "module not found" errors, make sure dependencies are declared in the package's `package.json`, not just in the root or parent package.

### Workspace Dependencies Not Resolving
Run `pnpm install` after generating new packages to ensure workspace links are created.

### Build Failures
Ensure all packages are built in the correct order. The build script already handles this (base package first, then map packages).

