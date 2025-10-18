#!/usr/bin/env node

/**
 * Verifies that generated packages are up-to-date with templates and configuration
 * Returns exit code 1 if packages need regeneration
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.join(__dirname, '..');
const CONFIG_FILE = path.join(ROOT_DIR, 'config', 'maps.config.json');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates');
const MAPS_DIR = path.join(ROOT_DIR, 'maps');
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');

// Read maps configuration
const mapsConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

// Helper to calculate hash of a file
function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('md5').update(content).digest('hex');
}

// Helper to calculate hash of directory (all files combined)
function getDirHash(dirPath, extension = null) {
  if (!fs.existsSync(dirPath)) return null;
  
  const files = fs.readdirSync(dirPath)
    .filter(f => !extension || f.endsWith(extension))
    .sort();
  
  const combinedContent = files.map(f => {
    const content = fs.readFileSync(path.join(dirPath, f), 'utf8');
    return `${f}:${content}`;
  }).join('\n');
  
  return crypto.createHash('md5').update(combinedContent).digest('hex');
}

console.log('🔍 Verifying package generation status...\n');

let needsRegeneration = false;
const issues = [];

// 1. Check if all template files exist
console.log('📋 Checking templates...');
const requiredTemplates = [
  'Component.tsx.template',
  'types.ts.template',
  'utils.ts.template',
  'index.ts.template',
  'package.json.template',
  'rollup.config.js.template',
  'tsconfig.json.template',
  'README.md.template'
];

requiredTemplates.forEach(template => {
  const templatePath = path.join(TEMPLATES_DIR, template);
  if (!fs.existsSync(templatePath)) {
    issues.push(`  ❌ Template missing: ${template}`);
    needsRegeneration = true;
  }
});

// 2. Check each package configuration
console.log('📦 Checking packages...');

mapsConfig.forEach(config => {
  const packageDir = `react-${config.id}-stats-map`;
  const packagePath = path.join(PACKAGES_DIR, packageDir);
  
  // Check if package directory exists
  if (!fs.existsSync(packagePath)) {
    issues.push(`  ❌ Package directory missing: ${packageDir}`);
    needsRegeneration = true;
    return;
  }
  
  // Check if geojson file exists in package
  const geojsonPath = path.join(packagePath, 'src', 'assets', 'maps', config.geojsonFile);
  if (!fs.existsSync(geojsonPath)) {
    issues.push(`  ❌ GeoJSON missing in ${packageDir}: ${config.geojsonFile}`);
    needsRegeneration = true;
  }
  
  // Check if all required generated files exist
  const requiredFiles = [
    `src/${config.componentName}.tsx`,
    'src/types.ts',
    'src/utils.ts',
    'src/index.ts',
    'package.json',
    'rollup.config.js',
    'tsconfig.json',
    'README.md'
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(packagePath, file);
    if (!fs.existsSync(filePath)) {
      issues.push(`  ❌ Generated file missing in ${packageDir}: ${file}`);
      needsRegeneration = true;
    }
  });
});

// 3. Check if source files (templates, config, maps) have been modified
//    since last generation by comparing with a stored hash
const hashFile = path.join(ROOT_DIR, '.generation-hash');
const currentHashes = {
  config: getFileHash(CONFIG_FILE),
  templates: getDirHash(TEMPLATES_DIR, '.template'),
  maps: getDirHash(MAPS_DIR, '.json')
};

const currentHashString = JSON.stringify(currentHashes);

if (fs.existsSync(hashFile)) {
  const storedHashString = fs.readFileSync(hashFile, 'utf8');
  if (currentHashString !== storedHashString) {
    issues.push('  ⚠️  Templates, configuration, or maps have changed since last generation');
    needsRegeneration = true;
  }
} else {
  issues.push('  ⚠️  No generation hash found - packages may be out of date');
  needsRegeneration = true;
}

// Report results
console.log('');
if (needsRegeneration) {
  console.log('❌ VERIFICATION FAILED\n');
  console.log('Issues found:');
  issues.forEach(issue => console.log(issue));
  console.log('\n💡 Run the following command to regenerate packages:');
  console.log('   pnpm generate');
  process.exit(1);
} else {
  console.log('✅ All packages are up-to-date!\n');
  process.exit(0);
}

