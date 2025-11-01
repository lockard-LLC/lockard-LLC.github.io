/**
 * Firebase Configuration for Lockard LLC
 * Includes AI Logic (Gemini API) configuration
 */

// Resolve environment variables from Node (build time) or the browser
const runtimeEnv = (() => {
  // Node-style environments (scripts, local tooling)
  if (typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env) {
    return globalThis.process.env;
  }

  // Browser runtime can expose values via a global (for example, set in index.html)
  if (typeof window !== 'undefined' && window.__PUBLIC_ENV__) {
    return window.__PUBLIC_ENV__;
  }

  return {};
})();

// Firebase configuration - use environment variables with production fallbacks
window.__FIREBASE_CONFIG__ = {
  apiKey: runtimeEnv.FIREBASE_API_KEY || "AIzaSyCG4J9t8rs3zgoKJBbHcaq1cvvMMy4u2-I",
  authDomain: runtimeEnv.FIREBASE_AUTH_DOMAIN || "lockard-llc-business.firebaseapp.com",
  projectId: runtimeEnv.FIREBASE_PROJECT_ID || "lockard-llc-business",
  storageBucket: runtimeEnv.FIREBASE_STORAGE_BUCKET || "lockard-llc-business.firebasestorage.app",
  messagingSenderId: runtimeEnv.FIREBASE_MESSAGING_SENDER_ID || "272006666491",
  appId: runtimeEnv.FIREBASE_APP_ID || "1:272006666491:web:d0c41e1d00849610a0785e",
  measurementId: runtimeEnv.FIREBASE_MEASUREMENT_ID || "G-BVVNR41T8Y"
};

// AI Logic configuration
window.__AI_LOGIC_CONFIG__ = {
  // Model selection
  defaultModel: "gemini-2.5-flash",
  fallbackModel: "gemini-1.5-flash",
  
  // Generation settings
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024
  },
  
  // Safety settings
  safetySettings: {
    harassment: "BLOCK_MEDIUM_AND_ABOVE",
    hateSpeech: "BLOCK_MEDIUM_AND_ABOVE",
    sexuallyExplicit: "BLOCK_MEDIUM_AND_ABOVE",
    dangerousContent: "BLOCK_MEDIUM_AND_ABOVE"
  },
  
  // Rate limiting
  rateLimit: {
    requestsPerMinute: 15,
    maxRetries: 3,
    retryDelay: 1000
  }
};

// Initialize Firebase when config is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Firebase configuration loaded');
  console.log('AI Logic configuration loaded');
  
  // Initialize Firebase (if not already done)
  if (typeof window.firebaseApp === 'undefined') {
    // Import Firebase modules dynamically
    Promise.all([
      import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js')
    ]).then(([{ initializeApp }, { getAnalytics }]) => {
      window.firebaseApp = initializeApp(window.__FIREBASE_CONFIG__);
      window.firebaseAnalytics = getAnalytics(window.firebaseApp);
      console.log('Firebase app initialized');
      console.log('Firebase Analytics initialized');
      
      // Track page view
      trackPageView();
    });
  }
  
  // Trigger AI Logic initialization
  if (typeof window.AILogic !== 'undefined') {
    window.AILogic.initializeAILogic();
  }
});

// Analytics helper functions
function trackPageView() {
  if (window.firebaseAnalytics) {
    // Track page view
    window.firebaseAnalytics.logEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
}

function trackEvent(eventName, parameters = {}) {
  if (window.firebaseAnalytics) {
    window.firebaseAnalytics.logEvent(eventName, parameters);
  }
}

function trackUserEngagement(action, category = 'general') {
  if (window.firebaseAnalytics) {
    window.firebaseAnalytics.logEvent('user_engagement', {
      engagement_time_msec: Date.now(),
      action: action,
      category: category
    });
  }
}

// Export analytics functions globally
window.FirebaseAnalytics = {
  trackEvent,
  trackUserEngagement,
  trackPageView
};
