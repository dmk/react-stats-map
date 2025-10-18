# CI/CD and Pre-commit Hooks Setup

This document describes the Continuous Integration (CI) setup and pre-commit hooks for the react-stats-map monorepo.

## Overview

To ensure that generated packages are always in sync with templates and configuration, we've implemented:

1. **Pre-commit hooks** - Automatically verify packages before commits
2. **GitHub Actions CI** - Run comprehensive checks on every PR and push
3. **Verification script** - Check if regeneration is needed

## Pre-commit Hooks

### Setup

After cloning the repository or pulling these changes, run:

```bash
pnpm install
```

This will automatically set up Husky and install the pre-commit hooks (via the `prepare` script).

### How It Works

The pre-commit hook automatically runs when you try to commit. It:

1. **Detects changes** to critical files:
   - `templates/*.template`
   - `config/maps.config.json`
   - `maps/*.json`

2. **Verifies generation status** if changes are detected:
   - Compares current templates/config with last generation
   - Checks that all packages exist and are up-to-date

3. **Blocks the commit** if packages need regeneration:
   - Provides clear instructions to run `pnpm generate`
   - Ensures you don't forget to regenerate packages

### Example Workflow

```bash
# 1. Modify a template
vim templates/Component.tsx.template

# 2. Try to commit
git add templates/Component.tsx.template
git commit -m "Update component template"

# ❌ Pre-commit hook fails with message:
# "Templates have changed, but generated packages are out of date.
#  Please run: pnpm generate"

# 3. Regenerate packages
pnpm generate

# 4. Commit all changes
git add .
git commit -m "Update component template and regenerate packages"

# ✅ Commit succeeds!
```

### Bypassing Hooks (Not Recommended)

In rare cases where you need to bypass the hooks:

```bash
git commit --no-verify
```

**Warning:** Only use this if you're absolutely sure what you're doing!

## GitHub Actions CI

### Workflows

We have two main workflows:

#### 1. CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main`/`master` branches.

**Jobs:**

1. **verify-generation**
   - Checks if generated packages are up-to-date
   - Fails if regeneration is needed
   - Runs first to fail fast

2. **build-and-test**
   - Installs dependencies
   - Builds all packages
   - Runs tests
   - Builds example app
   - Verifies build artifacts exist

3. **lint-templates**
   - Checks template syntax
   - Validates `maps.config.json`
   - Verifies all map files exist

4. **check-consistency**
   - Validates workspace structure
   - Checks package.json consistency
   - Ensures all configured packages exist

#### 2. Publish Workflow (`.github/workflows/publish.yml`)

Manual workflow for publishing packages to npm.

**Features:**
- Can publish all packages or a specific one
- Supports dry-run mode (default)
- Requires `NPM_TOKEN` secret to be set

**Usage:**
1. Go to Actions tab in GitHub
2. Select "Publish Packages" workflow
3. Click "Run workflow"
4. Choose options:
   - Package name (optional, leave empty for all)
   - Dry run (checkbox, default: true)

### Setting Up Secrets

For the publish workflow to work, you need to add an npm token:

1. Generate an npm token at https://www.npmjs.com/settings/tokens
2. Add it as a GitHub secret named `NPM_TOKEN`:
   - Go to repository Settings
   - Secrets and variables → Actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: your npm token

## Verification Script

### Manual Verification

You can manually check if packages need regeneration:

```bash
pnpm verify
```

This script (`scripts/verify-packages.js`):
- ✅ Returns exit code 0 if packages are up-to-date
- ❌ Returns exit code 1 if regeneration is needed
- Provides detailed output about what's wrong

### What It Checks

1. **Template existence** - All required templates exist
2. **Package directories** - All configured packages exist
3. **Generated files** - All expected files are present
4. **Change detection** - Compares hash of templates/config with last generation

### Generation Hash

The generation process creates a `.generation-hash` file that stores:
- Hash of all templates
- Hash of `maps.config.json`
- Hash of all map files

This file is used to detect if regeneration is needed.

**Important:** The `.generation-hash` file MUST be committed to the repository so that CI can verify packages are up-to-date.

## Best Practices

### For Developers

1. **Always regenerate after template changes:**
   ```bash
   pnpm generate
   ```

2. **Verify before committing:**
   ```bash
   pnpm verify
   ```

3. **Run full build before pushing:**
   ```bash
   pnpm build:all
   ```

4. **Check CI status** before merging PRs

### For Maintainers

1. **Keep dependencies updated:**
   ```bash
   pnpm update
   ```

2. **Review generated code** in PRs that modify templates

3. **Test publish workflow** in dry-run mode before actual publish

4. **Monitor CI failures** and fix promptly

## Troubleshooting

### Pre-commit Hook Not Running

```bash
# Reinstall hooks
rm -rf .husky
pnpm install
```

### CI Fails on "Verify Package Generation"

```bash
# Regenerate locally
pnpm generate

# Commit the changes
git add .
git commit -m "Regenerate packages"
```

### Build Fails in CI

```bash
# Clean and rebuild locally
pnpm clean:packages
pnpm build:all

# Check for TypeScript errors
cd packages/react-XX-stats-map
pnpm build
```

### Verification Script False Positive

```bash
# Force regeneration
pnpm generate

# This will update the .generation-hash file
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `pnpm generate` | Generate all packages from templates |
| `pnpm verify` | Check if packages need regeneration |
| `pnpm build:packages` | Build all packages |
| `pnpm build:all` | Build packages and example app |
| `pnpm clean:packages` | Clean build artifacts |

## Files Overview

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml           # Main CI workflow
│       └── publish.yml       # Package publishing workflow
├── .husky/
│   ├── _/
│   │   └── husky.sh         # Husky helper script
│   ├── pre-commit           # Pre-commit hook
│   └── prepare-commit-msg   # Commit message helper
├── scripts/
│   ├── generate-packages.js # Package generation script
│   └── verify-packages.js   # Verification script
├── .generation-hash         # Generation tracking (gitignored)
└── package.json             # Root package with scripts
```

## Contributing

When contributing to this project:

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Make your changes
4. If you modify templates/config, run: `pnpm generate`
5. Verify changes: `pnpm verify`
6. Build and test: `pnpm build:all`
7. Commit and push (pre-commit hooks will run automatically)
8. Open a Pull Request

The CI will automatically verify your changes before they can be merged.

