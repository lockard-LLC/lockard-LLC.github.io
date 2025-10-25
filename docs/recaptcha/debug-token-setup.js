/**
 * reCAPTCHA Enterprise Debug Token Setup
 * This file helps you configure and use the debug token for development
 */

// Debug token configuration
const DEBUG_TOKEN = process.env.RECAPTCHA_DEBUG_TOKEN || 'YOUR_DEBUG_TOKEN_HERE';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';

/**
 * Configure reCAPTCHA for development with debug token
 * Call this function in your development environment
 */
function setupDebugToken() {
  if (!IS_DEVELOPMENT) {
    console.warn('Debug token should only be used in development environment');
    return;
  }

  if (!DEBUG_TOKEN) {
    console.error('Debug token not found. Set RECAPTCHA_DEBUG_TOKEN in your .env file');
    return;
  }

  console.log('🔧 Setting up reCAPTCHA debug token for development');
  console.log('Debug Token:', DEBUG_TOKEN);
  
  // Set the debug token in the global scope for Firebase App Check
  if (typeof window !== 'undefined') {
    window.__FIREBASE_DEBUG_TOKEN__ = DEBUG_TOKEN;
  }

  return DEBUG_TOKEN;
}

/**
 * Get debug token for use in reCAPTCHA calls
 * @returns {string} Debug token for development
 */
function getDebugToken() {
  if (!IS_DEVELOPMENT) {
    return null;
  }
  
  return DEBUG_TOKEN;
}

/**
 * Create a debug token for testing purposes
 * This simulates a real reCAPTCHA token for development
 * @param {string} action - The action name to simulate
 * @returns {string} Debug token formatted for testing
 */
function createDebugToken(action = 'test_action') {
  if (!IS_DEVELOPMENT) {
    throw new Error('Debug tokens should only be used in development');
  }

  // Format: debug_token:action_name
  return `${DEBUG_TOKEN}:${action}`;
}

/**
 * Validate if a token is a debug token
 * @param {string} token - Token to check
 * @returns {boolean} True if it's a debug token
 */
function isDebugToken(token) {
  return token && token.startsWith(DEBUG_TOKEN);
}

/**
 * Extract action from debug token
 * @param {string} token - Debug token
 * @returns {string} Action name
 */
function extractActionFromDebugToken(token) {
  if (!isDebugToken(token)) {
    return null;
  }
  
  const parts = token.split(':');
  return parts.length > 1 ? parts[1] : 'default';
}

module.exports = {
  setupDebugToken,
  getDebugToken,
  createDebugToken,
  isDebugToken,
  extractActionFromDebugToken
};
