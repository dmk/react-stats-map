# Migration Guide: Template-Based Architecture

This document explains the migration from the old manual structure to the new template-based generation system.

## What Changed?

### Before (Manual)

```
react-stats-map/
├── packages/
│   ├── react-stats-map/          # Core (hand-written)
│   ├── react-ua-stats-map/       # Hand-written, duplicated code
│   │   ├── src/
│   │   │   ├── UAMap.tsx         # 95% identical to other countries
│   │   │   ├── types.ts
│   │   │   ├── utils.ts
│   │   │   └── assets/maps/ua-adm1.json
│   │   ├── package.json          # 95% identical
│   │   ├── rollup.config.js      # 100% identical
│   │   └── tsconfig.json         # 100% identical
│   ├── react-pl-stats-map/       # Hand-written, duplicated code
│   └── ...
├── package.json (private: true)
└── 7 separate yarn.lock files! ❌
```

**Problems:**
- 🔴 Heavy code duplication
- 🔴 Inconsistent structure across packages
- 🔴 Adding a new country = copying entire package structure
- 🔴 Bug fixes need to be applied to each package manually
- 🔴 No monorepo tooling (7 separate yarn.lock files!)

### After (Template-Based)

```
react-stats-map/
├── packages/
│   ├── react-stats-map/          # Core (hand-written)
│   ├── react-ua-stats-map/       # ✨ GENERATED
│   ├── react-pl-stats-map/       # ✨ GENERATED
│   └── ...
├── maps/                          # ✨ NEW: Centralized GeoJSON
│   ├── ua-adm1.json
│   ├── pl-adm1.json
│   └── ...
├── templates/                     # ✨ NEW: Single source of truth
│   ├── Component.tsx.template
│   ├── types.ts.template
│   ├── utils.ts.template
│   └── ...
├── config/
│   └── maps.config.json          # ✨ NEW: Metadata for all maps
├── scripts/
│   └── generate-packages.js      # ✨ NEW: Generation script
├── configs/                       # ✨ NEW: Shared configs
│   ├── rollup.config.base.js
│   └── tsconfig.base.json
└── package.json                   # ✨ Workspaces enabled
```

**Benefits:**
- ✅ Zero code duplication
- ✅ Perfect consistency across packages
- ✅ Add new country in < 5 minutes
- ✅ Fix bugs once, apply everywhere
- ✅ Proper monorepo with single yarn.lock

## For Existing Contributors

### If You Were Working on a Country Package

**OLD Workflow:**
```bash
cd packages/react-ua-stats-map
vim src/UAMap.tsx              # Edit directly
npm run build
git commit -am "fix: some bug"
```

**NEW Workflow:**
```bash
vim templates/Component.tsx.template  # Edit template
npm run generate                      # Regenerate all packages
npm run build:all                     # Build all
git add templates/                    # Commit template only
git commit -m "fix: some bug"
```

### If You Were Adding a New Country

**OLD Workflow (30-60 minutes):**
1. Copy existing package
2. Find/replace all country-specific names
3. Update package.json manually
4. Copy GeoJSON file
5. Update types manually
6. Update utils manually
7. Test build
8. Fix inconsistencies
9. Commit everything

**NEW Workflow (< 5 minutes):**
1. Add GeoJSON to `maps/`
2. Add entry to `config/maps.config.json`
3. Run `npm run generate`
4. Done! ✨

### If You Were Fixing Core Package

**No change!** The core package (`packages/react-stats-map/`) is still hand-written and works exactly the same way.

## Migration Checklist

If you have local changes:

- [ ] **Commit or stash** any work in progress
- [ ] **Pull** the latest changes with the new template system
- [ ] **Run** `npm install` (sets up workspaces)
- [ ] **Run** `npm run generate` (generates all packages)
- [ ] **Run** `npm run build:all` (builds everything)
- [ ] **Review** the CONTRIBUTING.md guide
- [ ] **Update** your mental model:
  - ✅ Edit templates, not generated files
  - ✅ Run `npm run generate` after template changes
  - ✅ Only commit templates and config

## What to Commit Now?

### ✅ Always Commit

- `templates/` - All template files
- `config/maps.config.json` - Map configurations
- `maps/` - GeoJSON/TopoJSON files
- `packages/react-stats-map/` - Core package
- `example/` - Example app
- `scripts/` - Generation scripts
- `configs/` - Shared configs
- Screenshots and LICENSE files in generated packages

### ❌ Never Commit (Generated)

- `packages/react-ua-stats-map/src/`
- `packages/react-ua-stats-map/package.json`
- `packages/react-ua-stats-map/rollup.config.js`
- `packages/react-ua-stats-map/tsconfig.json`
- `packages/react-ua-stats-map/README.md`
- (Same for all other country packages)

**Exception:** Screenshots (`docs/images/`) and `LICENSE.txt` files should be committed even in generated packages.

## Common Mistakes

### ❌ Mistake 1: Editing Generated Files

```bash
vim packages/react-ua-stats-map/src/UAMap.tsx  # ❌ Will be overwritten!
```

**Solution:**
```bash
vim templates/Component.tsx.template  # ✅ Edit the template
npm run generate                       # ✅ Regenerate
```

### ❌ Mistake 2: Committing Generated Files

```bash
git add packages/react-ua-stats-map/src/UAMap.tsx  # ❌ Don't commit generated code
```

**Solution:**
```bash
git add templates/Component.tsx.template  # ✅ Commit the template
```

### ❌ Mistake 3: Forgetting to Regenerate

```bash
vim templates/types.ts.template
git commit                      # ❌ Didn't regenerate!
```

**Solution:**
```bash
vim templates/types.ts.template
npm run generate                # ✅ Regenerate first
npm run build:all               # ✅ Test it builds
git add templates/
git commit
```

## FAQ

**Q: Can I still customize individual country packages?**

A: Yes, but through configuration in `maps.config.json`, not by editing the generated files directly. If you need country-specific logic, add it to the template with conditional logic based on config.

**Q: What if I need to make a hotfix to just one country package?**

A: You have two options:
1. Edit the template and regenerate all (preferred - keeps consistency)
2. Manually edit the generated file, test it, then update the template to match

**Q: Do I need to commit the generated packages to git?**

A: We still commit them for now (for npm publishing and CI/CD), but they're marked as `linguist-generated=true` in `.gitattributes` so GitHub knows they're generated.

**Q: What happens to my open PRs?**

A: If your PR modifies generated files, you'll need to:
1. Close the PR
2. Make the same changes in the templates
3. Run `npm run generate`
4. Open a new PR with template changes

**Q: Can I go back to the old way?**

A: The old packages are still in git history, but the template system is the new standard. It's much better! Give it a try.

## Need Help?

- Read [README.md](./README.md) for architecture overview
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed workflow
- Open an issue on GitHub
- Check existing issues for similar questions

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| Add new country | 30-60 min, manual copy | < 5 min, automatic |
| Fix bug | Edit 4 packages | Edit 1 template |
| Code duplication | ~95% | 0% |
| Consistency | Manual, error-prone | Automatic, perfect |
| Monorepo tooling | None (7 yarn.lock!) | Workspaces (1 yarn.lock) |
| Learning curve | Low | Medium |
| Scalability | Poor | Excellent |
| Maintainability | Poor | Excellent |

Welcome to the new system! 🎉
