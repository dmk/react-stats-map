#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Discovers all packages in the packages directory
 */
function discoverPackages() {
  const packagesDir = path.join(__dirname, '..', 'packages');

  if (!fs.existsSync(packagesDir)) {
    console.error('❌ Packages directory not found!');
    process.exit(1);
  }

  const allPackages = fs.readdirSync(packagesDir)
    .filter(name => {
      const packagePath = path.join(packagesDir, name);
      return fs.statSync(packagePath).isDirectory() &&
             fs.existsSync(path.join(packagePath, 'package.json'));
    })
    .sort();

  return allPackages;
}

function cleanPackage(packageName) {
  const packagePath = path.join(__dirname, '..', 'packages', packageName);
  console.log(`🧹 Cleaning ${packageName}...`);

  try {
    execSync('pnpm clean', {
      cwd: packagePath,
      stdio: 'inherit'
    });
    console.log(`✅ ${packageName} cleaned`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to clean ${packageName}`);
    return false;
  }
}

console.log('🧹 Cleaning all packages...\n');

const packages = discoverPackages();
console.log(`📋 Found ${packages.length} package(s): ${packages.join(', ')}\n`);

for (const pkg of packages) {
  cleanPackage(pkg);
}

console.log('\n✨ All packages cleaned!');

