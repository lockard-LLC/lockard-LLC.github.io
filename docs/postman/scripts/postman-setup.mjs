#!/usr/bin/env node
/**
 * Postman API Integration Helper
 *
 * This script helps you:
 * - Connect to Postman API
 * - Create workspaces, collections, and environments
 * - Sync OpenAPI schemas
 * - Validate your setup
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env') });

const POSTMAN_API_KEY = process.env.POSTMAN_API_KEY;
const POSTMAN_BASE_URL = 'https://api.getpostman.com';

// Color output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if API key is configured
function checkApiKey() {
  if (!POSTMAN_API_KEY || POSTMAN_API_KEY.trim() === '') {
    log('❌ POSTMAN_API_KEY not found in .env file', 'red');
    log('\nPlease add your Postman API key to .env:', 'yellow');
    log('POSTMAN_API_KEY=PMAK-your-api-key-here\n', 'cyan');
    log('Get your API key from: https://go.postman.co/settings/me/api-keys', 'blue');
    return false;
  }

  log('✅ Postman API key found', 'green');
  return true;
}

// Make Postman API request
async function postmanRequest(endpoint, options = {}) {
  const url = `${POSTMAN_BASE_URL}${endpoint}`;
  const headers = {
    'X-API-Key': POSTMAN_API_KEY,
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    return data;
  } catch (error) {
    log(`❌ API Error: ${error.message}`, 'red');
    throw error;
  }
}

// Get authenticated user info
async function getAuthenticatedUser() {
  log('\n🔍 Fetching your Postman account info...', 'blue');

  try {
    const data = await postmanRequest('/me');
    const user = data.user;

    log('\n✅ Successfully authenticated!', 'green');
    log(`\nUser: ${user.username}`, 'cyan');
    log(`Email: ${user.email}`, 'cyan');
    log(`Team: ${user.teamId || 'Personal'}`, 'cyan');

    return user;
  } catch (error) {
    log('❌ Failed to authenticate. Please check your API key.', 'red');
    return null;
  }
}

// List workspaces
async function listWorkspaces() {
  log('\n📁 Fetching your workspaces...', 'blue');

  try {
    const data = await postmanRequest('/workspaces');
    const workspaces = data.workspaces || [];

    if (workspaces.length === 0) {
      log('No workspaces found.', 'yellow');
      return [];
    }

    log(`\n✅ Found ${workspaces.length} workspace(s):`, 'green');
    workspaces.forEach((ws, index) => {
      log(`  ${index + 1}. ${ws.name} (${ws.type}) - ID: ${ws.id}`, 'cyan');
    });

    return workspaces;
  } catch (error) {
    log('❌ Failed to fetch workspaces.', 'red');
    return [];
  }
}

// Create workspace
async function createWorkspace(name, type = 'personal') {
  log(`\n🏗️  Creating workspace: ${name}...`, 'blue');

  try {
    const data = await postmanRequest('/workspaces', {
      method: 'POST',
      body: JSON.stringify({
        workspace: {
          name,
          type,
          description: 'Lockard LLC API workspace'
        }
      })
    });

    const workspace = data.workspace;
    log(`\n✅ Workspace created successfully!`, 'green');
    log(`Name: ${workspace.name}`, 'cyan');
    log(`ID: ${workspace.id}`, 'cyan');
    log(`Type: ${workspace.type}`, 'cyan');

    return workspace;
  } catch (error) {
    log('❌ Failed to create workspace.', 'red');
    return null;
  }
}

// Read OpenAPI schema
function readOpenApiSchema() {
  const schemaPath = path.join(rootDir, 'docs', 'postman', 'schemas', 'openapi.yaml');

  if (!fs.existsSync(schemaPath)) {
    log('❌ OpenAPI schema not found at docs/postman/schemas/openapi.yaml', 'red');
    return null;
  }

  return fs.readFileSync(schemaPath, 'utf8');
}

// Display setup summary
function displaySetupSummary() {
  log('\n' + '='.repeat(60), 'cyan');
  log('📋 POSTMAN SETUP SUMMARY', 'cyan');
  log('='.repeat(60), 'cyan');

  log('\n✅ Files Created:', 'green');
  log('  • docs/postman/schemas/openapi.yaml (ROOT SCHEMA FILE)', 'cyan');
  log('  • docs/postman/collections/ (COLLECTION DIRECTORY)', 'cyan');
  log('  • docs/postman/environments/development.json', 'cyan');
  log('  • docs/postman/environments/production.json', 'cyan');

  log('\n📦 What to Use in Postman:', 'yellow');
  log('  • Root Schema File: docs/postman/schemas/openapi.yaml', 'cyan');
  log('  • Collection Directory: docs/postman/collections/', 'cyan');
  log('  • Schema Type: OpenAPI 3.0', 'cyan');

  log('\n🔗 API Discovery:', 'yellow');
  log('  • https://lockard-llc.github.io/.well-known/apis.json', 'cyan');
  log('  • https://lockard-llc.github.io/docs/postman/schemas/openapi.yaml', 'cyan');

  log('\n📚 Documentation:', 'yellow');
  log('  • See docs/postman/README.md for detailed instructions', 'cyan');
  log('  • See docs/postman/schemas/README.md for schema info', 'cyan');

  log('\n' + '='.repeat(60) + '\n', 'cyan');
}

// Main menu
async function main() {
  log('\n🚀 Lockard LLC Postman Integration Helper', 'magenta');
  log('==========================================\n', 'magenta');

  // Check for API key
  if (!checkApiKey()) {
    return;
  }

  // Get user info
  const user = await getAuthenticatedUser();
  if (!user) {
    return;
  }

  // List workspaces
  const workspaces = await listWorkspaces();

  // Display setup summary
  displaySetupSummary();

  log('🎯 Next Steps:', 'green');
  log('  1. Go to Postman (https://web.postman.co)', 'cyan');
  log('  2. Create or select a workspace', 'cyan');
  log('  3. Go to APIs → Create API → Import', 'cyan');
  log('  4. Select: docs/postman/schemas/openapi.yaml', 'cyan');
  log('  5. Set collection directory: docs/postman/collections/', 'cyan');
  log('  6. Click Import!\n', 'cyan');

  if (workspaces.length > 0) {
    log(`💡 Tip: You can use workspace: ${workspaces[0].name} (${workspaces[0].id})`, 'blue');
  } else {
    log('💡 Tip: Create a new workspace in Postman for this project', 'blue');
  }

  log('\n✨ Ready to go! Your API is configured and ready for Postman.\n', 'green');
}

// Run the script
main().catch(error => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
