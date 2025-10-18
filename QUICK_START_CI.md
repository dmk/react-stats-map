# Quick Start: CI/CD Features

## 🎯 What's New

Your monorepo now has **automatic verification** to ensure generated packages stay in sync with templates!

## 🚦 Quick Test

```bash
# 1. Install dependencies (sets up hooks)
pnpm install

# 2. Verify current status
pnpm verify

# 3. If needed, generate packages
pnpm generate

# 4. Try making a commit!
```

## 🛡️ Pre-commit Protection

The pre-commit hook will **automatically stop you** if:
- You changed templates but forgot to regenerate
- You modified config but didn't run `pnpm generate`
- You updated maps but packages are out of sync

### Example:

```bash
# Edit a template
echo "// comment" >> templates/Component.tsx.template

# Try to commit
git add templates/Component.tsx.template
git commit -m "Update template"

# ❌ BLOCKED! Message shown:
# "Please run: pnpm generate"

# Fix it
pnpm generate
git add .
git commit -m "Update template and regenerate"

# ✅ SUCCESS!
```

## 🤖 GitHub Actions

Every push and PR will:
1. ✅ Verify packages are up-to-date
2. ✅ Build all packages  
3. ✅ Validate templates and config
4. ✅ Check package consistency

See results in the **Actions** tab on GitHub.

## 📝 Common Commands

| Command | What it does |
|---------|-------------|
| `pnpm verify` | Check if regeneration needed |
| `pnpm generate` | Regenerate all packages |
| `pnpm build:all` | Build everything |
| `git commit --no-verify` | Skip hooks (emergency only!) |

## 📚 Full Documentation

- **[CI_SETUP.md](./CI_SETUP.md)** - Complete documentation
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Detailed setup guide
- **[CI_SUMMARY.md](./CI_SUMMARY.md)** - Technical overview

## ⚡ That's It!

You're protected from forgetting to regenerate packages. The CI will catch any issues automatically.

Happy coding! 🚀

