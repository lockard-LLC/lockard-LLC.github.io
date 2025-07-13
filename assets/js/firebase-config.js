// Firebase Configuration and Services
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getRemoteConfig, fetchAndActivate, getValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-remote-config.js';
import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getFirestore, doc, getDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration - Updated with real Lockard LLC credentials
const firebaseConfig = {
  apiKey: "AIzaSyDMuyqu8Sp_7UNWYlAfdW6gBdT7fR0DBJA",
  authDomain: "lockard-llc.firebaseapp.com", 
  projectId: "lockard-llc",
  storageBucket: "lockard-llc.firebasestorage.app",
  messagingSenderId: "207878838967",
  appId: "1:207878838967:web:1b1e56f8f7d53960c74b32",
  measurementId: "G-JH3BY1QB52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
const db = getFirestore(app);

// Remote Config defaults
const remoteConfigDefaults = {
  // Theme Configuration
  primary_color: '#6366f1',
  secondary_color: '#8b5cf6',
  accent_color: '#22c55e',
  background_color: '#ffffff',
  text_color: '#111827',
  
  // Typography
  font_family: 'Inter',
  heading_font_size: '3.5rem',
  body_font_size: '1rem',
  
  // Layout
  container_max_width: '1200px',
  section_padding: '5rem',
  border_radius: '0.5rem',
  
  // Features
  enable_animations: true,
  enable_dark_mode: false,
  enable_mood_theming: true,
  
  // Content
  hero_title: 'Emotionally Intelligent Developer Tools',
  hero_subtitle: 'Pioneering vibe coding – where human creativity meets AI intelligence.',
  cta_text: 'Launch VibeStudio',
  
  // Branding
  logo_url: '/assets/images/logo.svg',
  favicon_url: '/assets/images/favicon.svg',
  
  // External Links
  app_url: 'https://app.vibestudio.online',
  docs_url: 'https://docs.lockard.llc',
  
  // A/B Testing
  hero_variant: 'default',
  cta_variant: 'default',
  
  // Admin Settings
  maintenance_mode: false,
  announcement_banner: '',
  show_beta_features: false
};

// Set defaults and configure
remoteConfig.defaultConfig = remoteConfigDefaults;
remoteConfig.settings = {
  minimumFetchIntervalMillis: 300000, // 5 minutes for dev, 1 hour for prod
  fetchTimeoutMillis: 60000 // 1 minute
};

class LockardConfig {
  constructor() {
    this.config = {};
    this.listeners = [];
    this.initialized = false;
  }

  async initialize() {
    try {
      // Fetch and activate remote config
      await fetchAndActivate(remoteConfig);
      
      // Load all config values
      await this.loadConfig();
      
      // Apply initial theme
      this.applyTheme();
      
      // Set up periodic refresh
      this.setupPeriodicRefresh();
      
      this.initialized = true;
      console.log('🔥 Firebase Remote Config initialized');
      
      // Notify listeners
      this.notifyListeners();
      
    } catch (error) {
      console.error('Failed to initialize Firebase config:', error);
      // Fall back to defaults
      this.config = remoteConfigDefaults;
      this.applyTheme();
    }
  }

  async loadConfig() {
    // Load all remote config values
    for (const [key, defaultValue] of Object.entries(remoteConfigDefaults)) {
      try {
        const value = getValue(remoteConfig, key);
        this.config[key] = value.asString() || defaultValue;
      } catch (error) {
        console.warn(`Failed to load config for ${key}:`, error);
        this.config[key] = defaultValue;
      }
    }
  }

  applyTheme() {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary', this.config.primary_color);
    root.style.setProperty('--secondary', this.config.secondary_color);
    root.style.setProperty('--accent', this.config.accent_color);
    root.style.setProperty('--background', this.config.background_color);
    root.style.setProperty('--text-color', this.config.text_color);
    root.style.setProperty('--font-sans', this.config.font_family);
    root.style.setProperty('--container-max', this.config.container_max_width);
    root.style.setProperty('--section-padding', this.config.section_padding);
    root.style.setProperty('--border-radius', this.config.border_radius);

    // Apply content updates
    this.updateContent();
    
    // Apply feature flags
    this.applyFeatureFlags();
  }

  updateContent() {
    // Update hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = this.config.hero_title.replace(/\n/g, '<br>');
    }

    // Update hero subtitle
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
      heroDescription.textContent = this.config.hero_subtitle;
    }

    // Update CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
      if (btn.textContent.includes('Launch') || btn.textContent.includes('Try')) {
        btn.textContent = this.config.cta_text;
      }
    });

    // Update logo
    const logos = document.querySelectorAll('img[src*="logo"]');
    logos.forEach(logo => {
      logo.src = this.config.logo_url;
    });
  }

  applyFeatureFlags() {
    // Enable/disable animations
    if (!this.config.enable_animations) {
      document.body.classList.add('no-animations');
    }

    // Dark mode
    if (this.config.enable_dark_mode) {
      document.body.classList.add('dark-mode');
    }

    // Maintenance mode
    if (this.config.maintenance_mode) {
      this.showMaintenanceMode();
    }

    // Announcement banner
    if (this.config.announcement_banner) {
      this.showAnnouncementBanner(this.config.announcement_banner);
    }
  }

  showMaintenanceMode() {
    const maintenanceHTML = `
      <div id="maintenance-mode" style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); color: white; display: flex;
        align-items: center; justify-content: center; z-index: 9999;
        flex-direction: column; text-align: center; padding: 2rem;
      ">
        <h1>🔧 Maintenance Mode</h1>
        <p>We're making some improvements. Check back soon!</p>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', maintenanceHTML);
  }

  showAnnouncementBanner(message) {
    const bannerHTML = `
      <div id="announcement-banner" style="
        background: var(--primary); color: white; text-align: center;
        padding: 1rem; position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      ">
        ${message}
        <button onclick="this.parentElement.remove()" style="
          background: none; border: none; color: white; float: right;
          cursor: pointer; font-size: 1.2rem;
        ">&times;</button>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', bannerHTML);
    
    // Adjust nav position
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.top = '60px';
    }
  }

  setupPeriodicRefresh() {
    // Refresh config every 5 minutes
    setInterval(async () => {
      try {
        await fetchAndActivate(remoteConfig);
        await this.loadConfig();
        this.applyTheme();
        this.notifyListeners();
        console.log('🔄 Remote config refreshed');
      } catch (error) {
        console.warn('Failed to refresh config:', error);
      }
    }, 300000); // 5 minutes
  }

  // Public API
  get(key) {
    return this.config[key];
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.config));
  }

  // Analytics helpers
  trackEvent(eventName, parameters = {}) {
    try {
      logEvent(analytics, eventName, parameters);
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }

  // A/B Testing
  getVariant(testName) {
    return this.config[`${testName}_variant`] || 'default';
  }
}

// Create global instance
window.LockardConfig = new LockardConfig();

// Export for modules
export default window.LockardConfig;