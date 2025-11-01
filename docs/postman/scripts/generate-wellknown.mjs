#!/usr/bin/env node
/**
 * Script to generate and validate .well-known directory files
 * Usage: node docs/postman/scripts/generate-wellknown.mjs [--validate]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');
const wellKnownDir = path.join(rootDir, '.well-known');

// Check if validation mode
const validateMode = process.argv.includes('--validate');

/**
 * Validate security.txt file
 */
function validateSecurityTxt() {
  const filePath = path.join(wellKnownDir, 'security.txt');

  if (!fs.existsSync(filePath)) {
    console.error('❌ security.txt not found');
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const expiresMatch = content.match(/Expires: (.+)/);

  if (!expiresMatch) {
    console.error('❌ security.txt missing Expires field');
    return false;
  }

  const expiresDate = new Date(expiresMatch[1]);
  const now = new Date();

  if (expiresDate <= now) {
    console.error('❌ security.txt has expired');
    return false;
  }

  // Warn if expiring within 30 days
  const daysUntilExpiry = (expiresDate - now) / (1000 * 60 * 60 * 24);
  if (daysUntilExpiry < 30) {
    console.warn(`⚠️  security.txt expires in ${Math.floor(daysUntilExpiry)} days`);
  }

  console.log('✅ security.txt is valid');
  return true;
}

/**
 * Validate JSON files
 */
function validateJsonFile(filename) {
  const filePath = path.join(wellKnownDir, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${filename} not found`);
    return false;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`✅ ${filename} is valid JSON`);
    return true;
  } catch (error) {
    console.error(`❌ ${filename} is invalid: ${error.message}`);
    return false;
  }
}

/**
 * Check for exposed secrets
 */
function checkForSecrets() {
  const configPath = path.join(wellKnownDir, 'config.json');

  if (fs.existsSync(configPath)) {
    console.error('❌ config.json should not be committed (use config.template.json)');
    return false;
  }

  // Check postman.json for actual API keys
  const postmanPath = path.join(wellKnownDir, 'postman.json');
  if (fs.existsSync(postmanPath)) {
    const content = fs.readFileSync(postmanPath, 'utf8');
    if (content.includes('PMAK-') && !content.includes('{{POSTMAN_API_KEY}}')) {
      console.warn('⚠️  postman.json may contain actual API keys');
      return false;
    }
  }

  console.log('✅ No exposed secrets detected');
  return true;
}

/**
 * Main validation function
 */
function validate() {
  console.log('Validating .well-known directory...\n');

  const results = [
    validateSecurityTxt(),
    validateJsonFile('apis.json'),
    validateJsonFile('postman.json'),
    validateJsonFile('config.template.json'),
    checkForSecrets()
  ];

  const allValid = results.every(r => r);

  console.log('\n' + (allValid ? '✅ All validations passed' : '❌ Some validations failed'));
  process.exit(allValid ? 0 : 1);
}

/**
 * Update security.txt expiration date
 */
function updateSecurityTxtExpiration() {
  const filePath = path.join(wellKnownDir, 'security.txt');

  if (!fs.existsSync(filePath)) {
    console.error('❌ security.txt not found');
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  const newContent = content.replace(
    /Expires: .+/,
    `Expires: ${nextYear.toISOString().split('.')[0]}.000Z`
  );

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Updated security.txt expiration to ${nextYear.toISOString()}`);
  return true;
}

/**
 * Ensure .well-known directory exists
 */
function ensureWellKnownDir() {
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
    console.log('✅ Created .well-known directory');
  }
}

// Main execution
if (validateMode) {
  validate();
} else {
  ensureWellKnownDir();
  console.log('✅ .well-known directory ready');
  console.log('\nRun with --validate to check files');
}
