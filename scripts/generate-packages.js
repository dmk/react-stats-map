#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Paths
const ROOT_DIR = path.join(__dirname, '..');
const CONFIG_FILE = path.join(ROOT_DIR, 'config', 'maps.config.json');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates');
const MAPS_DIR = path.join(ROOT_DIR, 'maps');
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');

// Read core package version
const corePackageJson = require(path.join(PACKAGES_DIR, 'react-stats-map', 'package.json'));
const CORE_VERSION = corePackageJson.version;

console.log('🚀 Starting package generation...\n');

// Read maps configuration
const mapsConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

// Helper to replace template variables
function replaceVariables(content, variables) {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

// Generate region codes string for types.ts
function generateRegionCodesString(codes) {
  // Format as TypeScript union type with proper line breaks
  const quotedCodes = codes.map(code => `'${code}'`);
  
  if (quotedCodes.length <= 10) {
    return `  ${quotedCodes.join(' | ')}`;
  }
  
  // Break into multiple lines for readability
  const lines = [];
  for (let i = 0; i < quotedCodes.length; i += 10) {
    lines.push('  ' + quotedCodes.slice(i, i + 10).join(' | '));
  }
  return lines.join(' |\n');
}

// Generate mapping object for utils.ts
function generateMappingObject(mapping) {
  const entries = Object.entries(mapping).map(([code, names]) => {
    const namesArray = names.map(name => `"${name}"`).join(', ');
    return `    '${code}': [${namesArray}]`;
  });
  return '{\n' + entries.join(',\n') + '\n  }';
}

// Parse accessor path (e.g., "properties.name" -> "properties.name")
function parseAccessor(accessor) {
  return accessor;
}

// Generate normalization chain
function generateNormalizationChain(normalization) {
  // Format the normalization chain with proper line breaks
  // Add a dot before the first method if it doesn't have one (it's being called on a variable)
  const withDot = normalization.startsWith('.') ? normalization : '.' + normalization;
  // Split on method calls but keep the full call intact
  const indent = '\n    ';
  const methodPattern = /\.(toLowerCase|replace|trim|normalize)/g;
  const formatted = withDot.replace(methodPattern, `${indent}.$1`);
  return formatted.startsWith(indent) ? formatted.substring(indent.length) : formatted;
}

// Process each map configuration
mapsConfig.forEach((config) => {
  console.log(`📦 Generating package: ${config.packageName}`);
  
  const packageDir = `react-${config.id}-stats-map`;
  const packagePath = path.join(PACKAGES_DIR, packageDir);
  
  // Create package directory structure
  fs.ensureDirSync(path.join(packagePath, 'src', 'assets', 'maps'));
  fs.ensureDirSync(path.join(packagePath, 'docs', 'images'));
  
  // Copy geojson file
  const geojsonSource = path.join(MAPS_DIR, config.geojsonFile);
  const geojsonDest = path.join(packagePath, 'src', 'assets', 'maps', config.geojsonFile);
  fs.copyFileSync(geojsonSource, geojsonDest);
  console.log(`  ✓ Copied ${config.geojsonFile}`);
  
  // Prepare template variables
  const variables = {
    PACKAGE_NAME: config.packageName,
    PACKAGE_DIR: packageDir,
    VERSION: '0.1.2', // Keep existing version
    CORE_VERSION: CORE_VERSION,
    DESCRIPTION: config.description,
    KEYWORDS: JSON.stringify(config.keywords),
    COMPONENT_NAME: config.componentName,
    PROPS_NAME: config.propsName,
    GEOJSON_FILE: config.geojsonFile,
    TOPOJSON_OBJECT: config.topojsonObject,
    REGION_TYPE: config.regionType,
    REGION_TYPE_LOWER: config.regionType.toLowerCase(),
    REGION_CODE_TYPE: config.regionCodeType,
    REGION_CODES: generateRegionCodesString(config.regionCodes),
    NAME_ACCESSOR: parseAccessor(config.accessors.name),
    CODE_ACCESSOR: parseAccessor(config.accessors.code),
    HELPER_FUNCTION_NAME: config.helperFunction.name,
    MAPPING_OBJECT: generateMappingObject(config.helperFunction.mapping),
    NORMALIZATION_CHAIN: generateNormalizationChain(config.helperFunction.normalization),
    NAME: config.name,
  };
  
  // Generate files from templates
  const templates = {
    'Component.tsx.template': `src/${config.componentName}.tsx`,
    'types.ts.template': 'src/types.ts',
    'utils.ts.template': 'src/utils.ts',
    'index.ts.template': 'src/index.ts',
    'package.json.template': 'package.json',
    'rollup.config.js.template': 'rollup.config.js',
    'tsconfig.json.template': 'tsconfig.json',
    'README.md.template': 'README.md',
  };
  
  Object.entries(templates).forEach(([templateFile, outputFile]) => {
    const templatePath = path.join(TEMPLATES_DIR, templateFile);
    const outputPath = path.join(packagePath, outputFile);
    
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const generatedContent = replaceVariables(templateContent, variables);
    
    fs.writeFileSync(outputPath, generatedContent);
    console.log(`  ✓ Generated ${outputFile}`);
  });
  
  // Copy LICENSE.txt if it exists from an existing package
  const licenseSource = path.join(PACKAGES_DIR, 'react-ua-stats-map', 'LICENSE.txt');
  const licenseDest = path.join(packagePath, 'LICENSE.txt');
  if (fs.existsSync(licenseSource)) {
    fs.copyFileSync(licenseSource, licenseDest);
    console.log(`  ✓ Copied LICENSE.txt`);
  }
  
  // Copy screenshot if it exists
  const screenshotSource = path.join(PACKAGES_DIR, `react-${config.id}-stats-map`, 'docs', 'images', 'screenshot.png');
  const screenshotDest = path.join(packagePath, 'docs', 'images', 'screenshot.png');
  if (fs.existsSync(screenshotSource)) {
    fs.copyFileSync(screenshotSource, screenshotDest);
    console.log(`  ✓ Copied screenshot.png`);
  }
  
  console.log(`  ✅ Package ${config.packageName} generated successfully!\n`);
});

// Save generation hash to track if regeneration is needed
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('md5').update(content).digest('hex');
}

function getDirHash(dirPath, extension = null) {

  const files = fs.readdirSync(dirPath)
    .filter(f => !extension || f.endsWith(extension))
    .sort();
  
  const combinedContent = files.map(f => {
    const content = fs.readFileSync(path.join(dirPath, f), 'utf8');
    return `${f}:${content}`;
  }).join('\n');
  
  return crypto.createHash('md5').update(combinedContent).digest('hex');
}

const hashes = {
  config: getFileHash(CONFIG_FILE),
  templates: getDirHash(TEMPLATES_DIR, '.template'),
  maps: getDirHash(MAPS_DIR, '.json')
};

const hashFile = path.join(ROOT_DIR, '.generation-hash');
fs.writeFileSync(hashFile, JSON.stringify(hashes));
console.log('  ✓ Saved generation hash');

console.log('\n🎉 All packages generated successfully!');
console.log('\n📝 Next steps:');
console.log('  1. Run: pnpm install (to set up workspaces)');
console.log('  2. Run: pnpm build:all (to build all packages)');
console.log('\n💡 To add a new map:');
console.log('  1. Add the geojson file to maps/');
console.log('  2. Add configuration to config/maps.config.json');
console.log('  3. Run: pnpm generate');
