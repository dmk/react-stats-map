#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const packages = [
  'react-stats-map',      // Base package must be built first
  'react-ua-stats-map',
  'react-md-stats-map',
  'react-pl-stats-map',
  'react-eu-stats-map'
];

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

