# Setup Instructions for CI/CD and Pre-commit Hooks

## Quick Start

After pulling these changes, run:

```bash
# 1. Install dependencies (this will set up husky)
pnpm install

# 2. Generate the baseline hash (if needed)
pnpm generate

# 3. Verify everything is working
pnpm verify
```

That's it! The pre-commit hooks are now active.

## What Was Added

### 1. Verification Script (`scripts/verify-packages.js`)

A Node.js script that checks if generated packages are in sync with templates and configuration.

**Usage:**
```bash
pnpm verify
```

**What it checks:**
- All template files exist
- All configured packages exist
- All generated files are present
- Templates/config haven't changed since last generation

### 2. Pre-commit Hooks (`.husky/`)

Automatically runs before every commit to ensure you don't forget to regenerate packages.

**Files:**
- `.husky/pre-commit` - Main verification hook
- `.husky/prepare-commit-msg` - Adds hints to commit messages
- `.husky/_/husky.sh` - Husky helper script

**How it works:**
1. Detects if you changed templates, config, or maps
2. If yes, runs `verify-packages.js`
3. If verification fails, blocks the commit with helpful message
4. If verification passes, allows the commit

### 3. GitHub Actions Workflows (`.github/workflows/`)

#### CI Workflow (`ci.yml`)

Runs on every push and PR to main/master:

**Jobs:**
- ✅ **verify-generation** - Ensures packages are up-to-date
- ✅ **build-and-test** - Builds all packages and example app
- ✅ **lint-templates** - Validates templates and configuration
- ✅ **check-consistency** - Verifies package structure

#### Publish Workflow (`publish.yml`)

Manual workflow for publishing to npm:
- Supports publishing all or specific packages
- Has dry-run mode for testing
- Requires `NPM_TOKEN` secret

### 4. Updated `package.json`

New scripts:
```json
{
  "verify": "node scripts/verify-packages.js",
  "prepare": "husky install",
  "precommit": "node scripts/verify-packages.js"
}
```

New dependency:
```json
{
  "husky": "^8.0.3"
}
```

### 5. Updated `.gitignore`

Added:
```
.generation-hash
```

This file stores hashes of templates/config and is used to detect changes.

### 6. Enhanced `generate-packages.js`

Now saves a `.generation-hash` file after successful generation. This allows the verification script to detect if regeneration is needed.

## Testing the Setup

### Test 1: Pre-commit Hook

```bash
# 1. Modify a template
echo "// test comment" >> templates/Component.tsx.template

# 2. Try to commit without regenerating
git add templates/Component.tsx.template
git commit -m "Test commit"

# Expected: ❌ Commit blocked with message to run pnpm generate

# 3. Regenerate and commit
pnpm generate
git add .
git commit -m "Test commit"

# Expected: ✅ Commit succeeds
```

### Test 2: Verification Script

```bash
# Should pass if everything is up-to-date
pnpm verify

# Expected output:
# 🔍 Verifying package generation status...
# 📋 Checking templates...
# 📦 Checking packages...
# ✅ All packages are up-to-date!
```

### Test 3: CI Workflow (GitHub)

1. Push changes to a branch
2. Open a Pull Request
3. Check the Actions tab
4. All CI jobs should pass ✅

## Common Scenarios

### Scenario 1: Adding a New Map

```bash
# 1. Add the GeoJSON file
cp new-map.json maps/

# 2. Update configuration
vim config/maps.config.json
# Add your map configuration

# 3. Generate packages
pnpm generate

# 4. Build and test
pnpm build:all

# 5. Commit everything
git add .
git commit -m "Add new map for Country X"
# ✅ Pre-commit hook verifies and allows commit
```

### Scenario 2: Modifying Templates

```bash
# 1. Edit template
vim templates/Component.tsx.template

# 2. Regenerate immediately
pnpm generate

# 3. Commit all changes
git add .
git commit -m "Update component template"
# ✅ Pre-commit hook allows commit
```

### Scenario 3: Quick Fix (No Template Changes)

```bash
# 1. Fix a bug in example app
vim example/src/App.tsx

# 2. Commit
git add example/src/App.tsx
git commit -m "Fix bug in example"
# ℹ️ Pre-commit hook skips verification (no template changes)
# ✅ Commit succeeds quickly
```

## Troubleshooting

### Hook Not Running

If pre-commit hook doesn't run:

```bash
# Reinstall husky
rm -rf .husky
pnpm install

# Make scripts executable
chmod +x .husky/pre-commit
chmod +x .husky/prepare-commit-msg
chmod +x .husky/_/husky.sh
```

### Verification Fails Unexpectedly

```bash
# Force regeneration
pnpm generate

# This updates the .generation-hash file
```

### Want to Skip Hook (Emergency)

```bash
# Only use in emergencies!
git commit --no-verify
```

## Benefits

✅ **Never forget to regenerate** - Pre-commit hook prevents mistakes

✅ **Fast feedback** - CI catches issues early

✅ **Consistent packages** - Always in sync with templates

✅ **Easier code review** - Reviewers know packages are up-to-date

✅ **Automated publishing** - Simple workflow for releases

## Next Steps

1. Test the setup locally
2. Push to GitHub and verify CI works
3. Set up `NPM_TOKEN` secret for publishing (if needed)
4. Update team documentation to mention new workflows

## Questions?

See `CI_SETUP.md` for detailed documentation.

