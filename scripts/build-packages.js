#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Discovers all packages in the packages directory
 * Ensures base package (react-stats-map) is built first
 */
function discoverPackages() {
  const packagesDir = path.join(__dirname, '..', 'packages');
  const basePackage = 'react-stats-map';

  if (!fs.existsSync(packagesDir)) {
    console.error('❌ Packages directory not found!');
    process.exit(1);
  }

  const allPackages = fs.readdirSync(packagesDir)
    .filter(name => {
      const packagePath = path.join(packagesDir, name);
      return fs.statSync(packagePath).isDirectory() &&
             fs.existsSync(path.join(packagePath, 'package.json'));
    });

  // Sort packages: base package first, then alphabetically
  const otherPackages = allPackages
    .filter(pkg => pkg !== basePackage)
    .sort();

  return [basePackage, ...otherPackages];
}

function buildPackage(packageName) {
  const packagePath = path.join(__dirname, '..', 'packages', packageName);
  console.log(`\n📦 Building ${packageName}...`);

  try {
    execSync('pnpm build', {
      cwd: packagePath,
      stdio: 'inherit'
    });
    console.log(`✅ ${packageName} built successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to build ${packageName}`);
    return false;
  }
}

console.log('🚀 Building all packages...\n');

const packages = discoverPackages();
console.log(`📋 Found ${packages.length} package(s): ${packages.join(', ')}\n`);

let allSuccessful = true;
for (const pkg of packages) {
  if (!buildPackage(pkg)) {
    allSuccessful = false;
    process.exit(1);
  }
}

if (allSuccessful) {
  console.log('\n✨ All packages built successfully!');
}

