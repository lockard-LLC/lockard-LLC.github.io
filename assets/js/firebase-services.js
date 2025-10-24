// Comprehensive Firebase Services Integration for Lockard LLC
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics, logEvent, setUserProperties } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getRemoteConfig, fetchAndActivate, getValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-remote-config.js';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, serverTimestamp, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js';
import { getPerformance, trace } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js';

// Firebase configuration
const firebaseConfig = window.__FIREBASE_CONFIG__ || {};
if (!firebaseConfig.apiKey) {
  throw new Error('Firebase configuration not found. Load firebase/config.js before firebase-services.js.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const performance = getPerformance(app);

// Initialize messaging if supported
let messaging = null;
try {
  if ('serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }
} catch (error) {
  console.warn('Firebase Messaging not supported:', error);
}

// Database name for Firestore
const DATABASE_NAME = 'lockard-db';

class LockardFirebaseServices {
  constructor() {
    this.initialized = false;
    this.user = null;
    this.config = {};
    this.listeners = [];
    this.realTimeListeners = new Map();
    
    this.init();
  }

  async init() {
    try {
      // Initialize authentication
      await this.initAuth();
      
      // Initialize Remote Config
      await this.initRemoteConfig();
      
      // Initialize Analytics
      this.initAnalytics();
      
      // Initialize Performance monitoring
      this.initPerformance();
      
      // Initialize real-time listeners
      this.initRealTimeListeners();
      
      this.initialized = true;
      console.log('🔥 All Firebase services initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Firebase services:', error);
    }
  }

  // ==================== AUTHENTICATION ====================
  async initAuth() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          console.log('🔐 User authenticated:', user.uid);
        } else {
          // Sign in anonymously for analytics
          try {
            const userCredential = await signInAnonymously(auth);
            this.user = userCredential.user;
            console.log('🔐 Anonymous user created:', this.user.uid);
          } catch (error) {
            console.warn('Authentication failed:', error);
          }
        }
        resolve();
      });
    });
  }

  // ==================== REMOTE CONFIG ====================
  async initRemoteConfig() {
    remoteConfig.defaultConfig = {
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
      enable_dark_mode: true,
      enable_mood_theming: true,
      enable_realtime_sync: true,
      
      // Content
      hero_title: 'Thoughtful Software Experiments',
      hero_subtitle: 'Exploring human-centered tooling, mindful technology practices, and collaborative workflows.',
      cta_text: 'Connect with Us',
      announcement_banner: '',
      
      // App Configuration
      app_version: '1.0.0',
      maintenance_mode: false,
      show_beta_features: false,
      max_file_upload_size: '10MB',
      
      // Analytics
      track_user_interactions: true,
      track_performance_metrics: true,
      realtime_analytics_enabled: true
    };

    remoteConfig.settings = {
      minimumFetchIntervalMillis: 300000, // 5 minutes
      fetchTimeoutMillis: 60000 // 1 minute
    };

    await fetchAndActivate(remoteConfig);
    await this.loadAllConfig();
    this.applyConfiguration();
  }

  async loadAllConfig() {
    for (const [key, defaultValue] of Object.entries(remoteConfig.defaultConfig)) {
      try {
        const value = getValue(remoteConfig, key);
        this.config[key] = value.asString() || defaultValue;
      } catch (error) {
        console.warn(`Failed to load config for ${key}:`, error);
        this.config[key] = defaultValue;
      }
    }
  }

  applyConfiguration() {
    // Apply CSS custom properties
    const root = document.documentElement;
    root.style.setProperty('--primary', this.config.primary_color);
    root.style.setProperty('--secondary', this.config.secondary_color);
    root.style.setProperty('--accent', this.config.accent_color);
    root.style.setProperty('--background', this.config.background_color);
    root.style.setProperty('--text-color', this.config.text_color);
    root.style.setProperty('--font-sans', this.config.font_family);
    root.style.setProperty('--container-max', this.config.container_max_width);
    root.style.setProperty('--section-padding', this.config.section_padding);

    // Apply content updates
    this.updateDynamicContent();
    
    // Apply feature flags
    this.applyFeatureFlags();
  }

  updateDynamicContent() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && this.config.hero_title) {
      heroTitle.innerHTML = this.config.hero_title.replace(/\\n/g, '<br>');
    }

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription && this.config.hero_subtitle) {
      heroDescription.textContent = this.config.hero_subtitle;
    }

    if (this.config.announcement_banner) {
      this.showAnnouncementBanner(this.config.announcement_banner);
    }
  }

  // ==================== ANALYTICS ====================
  initAnalytics() {
    if (this.config.track_user_interactions) {
      // Set user properties
      setUserProperties(analytics, {
        platform: 'web',
        version: this.config.app_version,
        user_type: 'visitor'
      });

      // Track page view
      this.trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        user_id: this.user?.uid
      });
    }
  }

  trackEvent(eventName, parameters = {}) {
    try {
      if (this.config.track_user_interactions) {
        const eventData = {
          ...parameters,
          timestamp: new Date().toISOString(),
          user_id: this.user?.uid,
          session_id: this.getSessionId()
        };
        
        logEvent(analytics, eventName, eventData);
        
        // Also store in Firestore for detailed analysis
        if (this.config.realtime_analytics_enabled) {
          this.storeAnalyticsEvent(eventName, eventData);
        }
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  // ==================== FIRESTORE ====================
  async storeAnalyticsEvent(eventName, eventData) {
    try {
      await addDoc(collection(db, 'analytics_events'), {
        event_name: eventName,
        event_data: eventData,
        timestamp: serverTimestamp(),
        user_id: this.user?.uid
      });
    } catch (error) {
      console.warn('Failed to store analytics event:', error);
    }
  }

  async saveUserPreferences(preferences) {
    if (!this.user) return;
    
    try {
      await setDoc(doc(db, 'user_preferences', this.user.uid), {
        ...preferences,
        updated_at: serverTimestamp()
      }, { merge: true });
      
      console.log('✅ User preferences saved');
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  }

  async getUserPreferences() {
    if (!this.user) return null;
    
    try {
      const docRef = doc(db, 'user_preferences', this.user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      return null;
    }
  }

  async storeUserFeedback(feedback) {
    try {
      await addDoc(collection(db, 'user_feedback'), {
        feedback: feedback.message,
        rating: feedback.rating || null,
        page: window.location.pathname,
        user_id: this.user?.uid,
        timestamp: serverTimestamp()
      });
      
      this.trackEvent('feedback_submitted', {
        rating: feedback.rating,
        has_message: !!feedback.message
      });
      
      console.log('✅ Feedback submitted');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  }

  // ==================== STORAGE ====================
  async uploadFile(file, path) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      this.trackEvent('file_uploaded', {
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: path
      });
      
      return { url: downloadURL, path: snapshot.ref.fullPath };
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  async getAssetUrl(path) {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.warn('Failed to get asset URL:', error);
      return null;
    }
  }

  async listAssets(folderPath) {
    try {
      const storageRef = ref(storage, folderPath);
      const result = await listAll(storageRef);
      
      const assets = await Promise.all(
        result.items.map(async (itemRef) => ({
          name: itemRef.name,
          path: itemRef.fullPath,
          url: await getDownloadURL(itemRef)
        }))
      );
      
      return assets;
    } catch (error) {
      console.error('Failed to list assets:', error);
      return [];
    }
  }

  // ==================== REAL-TIME FEATURES ====================
  initRealTimeListeners() {
    if (this.config.enable_realtime_sync) {
      // Listen to site-wide announcements
      this.subscribeToAnnouncements();
      
      // Listen to configuration changes
      this.subscribeToConfigUpdates();
    }
  }

  subscribeToAnnouncements() {
    const unsubscribe = onSnapshot(
      collection(db, 'site_announcements'),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const announcement = change.doc.data();
            if (announcement.active) {
              this.showRealTimeAnnouncement(announcement);
            }
          }
        });
      },
      (error) => {
        console.warn('Failed to listen to announcements:', error);
      }
    );
    
    this.realTimeListeners.set('announcements', unsubscribe);
  }

  subscribeToConfigUpdates() {
    const unsubscribe = onSnapshot(
      doc(db, 'site_config', 'main'),
      (doc) => {
        if (doc.exists()) {
          const newConfig = doc.data();
          this.updateLiveConfiguration(newConfig);
        }
      },
      (error) => {
        console.warn('Failed to listen to config updates:', error);
      }
    );
    
    this.realTimeListeners.set('config', unsubscribe);
  }

  // ==================== PERFORMANCE MONITORING ====================
  initPerformance() {
    if (this.config.track_performance_metrics) {
      // Track page load performance
      const pageLoadTrace = trace(performance, 'page_load');
      pageLoadTrace.start();
      
      window.addEventListener('load', () => {
        pageLoadTrace.stop();
        
        // Track Core Web Vitals
        this.trackWebVitals();
      });
    }
  }

  trackWebVitals() {
    // Track performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.trackEvent('performance_metrics', {
          page_load_time: navigation.loadEventEnd - navigation.loadEventStart,
          dom_ready_time: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          first_byte_time: navigation.responseStart - navigation.requestStart
        });
      }
    }
  }

  // ==================== UTILITY METHODS ====================
  getSessionId() {
    let sessionId = sessionStorage.getItem('lockard_session_id');
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem('lockard_session_id', sessionId);
    }
    return sessionId;
  }

  showAnnouncementBanner(message) {
    const existingBanner = document.getElementById('announcement-banner');
    if (existingBanner) existingBanner.remove();
    
    const bannerHTML = `
      <div id="announcement-banner" style="
        background: var(--primary); color: white; text-align: center;
        padding: 1rem; position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
        animation: slideDown 0.3s ease;
      ">
        ${message}
        <button onclick="this.parentElement.remove()" style="
          background: none; border: none; color: white; float: right;
          cursor: pointer; font-size: 1.2rem; margin-left: 1rem;
        ">&times;</button>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', bannerHTML);
  }

  showRealTimeAnnouncement(announcement) {
    if (announcement.type === 'banner') {
      this.showAnnouncementBanner(announcement.message);
    } else if (announcement.type === 'notification') {
      this.showNotification(announcement.message, announcement.priority);
    }
  }

  applyFeatureFlags() {
    if (!this.config.enable_animations) {
      document.body.classList.add('no-animations');
    }

    if (this.config.maintenance_mode) {
      this.showMaintenanceMode();
    }

    if (this.config.show_beta_features && this.user) {
      document.body.classList.add('beta-features-enabled');
    }
  }

  // ==================== PUBLIC API ====================
  get(key) {
    return this.config[key];
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  destroy() {
    // Clean up real-time listeners
    this.realTimeListeners.forEach(unsubscribe => unsubscribe());
    this.realTimeListeners.clear();
  }
}

// Initialize and export
const LockardServices = new LockardFirebaseServices();

// Export for global access
window.LockardServices = LockardServices;
window.LockardFirebase = {
  analytics,
  db,
  storage,
  auth,
  remoteConfig,
  services: LockardServices
};

export default LockardServices;
