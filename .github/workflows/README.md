# GitHub Actions Workflows

This directory contains automated workflows for the react-stats-map monorepo.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:** Push to main/master, Pull Requests

**Purpose:** Ensure code quality and package consistency

**Jobs:**
- `verify-generation` - Fast-fail if packages need regeneration
- `build-and-test` - Build all packages and example app
- `lint-templates` - Validate templates and configuration
- `check-consistency` - Verify package structure

**Typical duration:** 3-5 minutes

### 2. Publish Workflow (`publish.yml`)

**Triggers:** Manual (workflow_dispatch)

**Purpose:** Publish packages to npm

**Options:**
- Package name (optional, leave empty for all)
- Dry run (default: true)

**Requirements:**
- `NPM_TOKEN` secret must be set

### 3. Deploy Example (`deploy-example.yml`)

**Triggers:** Push to main/master (if exists)

**Purpose:** Deploy example app to GitHub Pages

## Status Badges

Add to README.md:

```markdown
![CI](https://github.com/YOUR_USERNAME/react-stats-map/actions/workflows/ci.yml/badge.svg)
```

## Secrets Required

| Secret | Purpose | How to get |
|--------|---------|------------|
| `NPM_TOKEN` | Publishing to npm | https://www.npmjs.com/settings/tokens |

## Troubleshooting

### CI Fails: "Packages out of date"

Run locally:
```bash
pnpm generate
git add .
git commit -m "Regenerate packages"
```

### Publish Fails: "No NPM_TOKEN"

1. Go to repository Settings
2. Secrets and variables → Actions
3. Add `NPM_TOKEN` with your npm token

## Maintenance

Update Node.js version in all workflows:
```yaml
node-version: '18'  # Change to desired version
```

Update pnpm version:
```yaml
pnpm:
  version: 8  # Change to desired version
```
