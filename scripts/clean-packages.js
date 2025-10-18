#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const packages = [
  'react-stats-map',
  'react-ua-stats-map',
  'react-md-stats-map',
  'react-pl-stats-map',
  'react-eu-stats-map'
];

function cleanPackage(packageName) {
  const packagePath = path.join(__dirname, '..', 'packages', packageName);
  console.log(`🧹 Cleaning ${packageName}...`);
  
  try {
    execSync('yarn clean', {
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

for (const pkg of packages) {
  cleanPackage(pkg);
}

console.log('\n✨ All packages cleaned!');

