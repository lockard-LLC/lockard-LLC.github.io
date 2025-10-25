# Firebase Analytics Integration

This directory contains documentation for Firebase Analytics integration in the Lockard LLC website.

## 📊 **Analytics Overview**

### **What's Tracked**
- **Page Views** - Automatic tracking of page visits
- **User Engagement** - Button clicks, scroll depth, time on page
- **AI Logic Usage** - AI feature interactions and success rates
- **User Behavior** - Navigation patterns and feature usage

### **Analytics Events**

#### **Automatic Events**
- `page_view` - Tracks page visits with title, location, and path
- `user_engagement` - Tracks user interaction time and actions
- `scroll_depth` - Tracks how far users scroll (25%, 50%, 75%, 100%)
- `time_on_page` - Tracks time spent on page (5+ seconds)

#### **Button Interactions**
- `button_click` - Tracks all button clicks with text, type, and href
- `ai_feature_used` - Tracks AI Logic feature usage

#### **AI Logic Events**
- `ai_logic_initialized` - Tracks when AI Logic loads successfully
- `ai_content_suggestions_generated` - Tracks successful AI content generation
- `ai_content_suggestions_error` - Tracks AI generation errors
- `ai_message_assistant_used` - Tracks message assistant usage
- `ai_research_insights_generated` - Tracks research insights generation

## 🔧 **Implementation**

### **Firebase Configuration**
```javascript
// firebase/config.js
window.__FIREBASE_CONFIG__ = {
  // Your Firebase configuration
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX" // Analytics measurement ID
};
```

### **Analytics Functions**
```javascript
// Available globally
window.FirebaseAnalytics = {
  trackEvent(eventName, parameters),
  trackUserEngagement(action, category),
  trackPageView()
};
```

### **Usage Examples**
```javascript
// Track custom events
window.FirebaseAnalytics.trackEvent('custom_event', {
  category: 'engagement',
  value: 100
});

// Track user engagement
window.FirebaseAnalytics.trackUserEngagement('button_click', 'navigation');
```

## 📈 **Analytics Dashboard**

### **Firebase Console**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `lockard-llc-business`
3. Navigate to **Analytics** → **Events**
4. View real-time and historical data

### **Key Metrics**
- **Page Views** - Most visited pages
- **User Engagement** - Button click rates
- **AI Usage** - AI feature adoption
- **Scroll Depth** - Content engagement
- **Time on Page** - User attention

## 🎯 **Custom Events**

### **Button Tracking**
```javascript
// Automatically tracks:
// - Button text
// - Button type (primary/secondary)
// - Button href
// - Timestamp
// - Page URL
```

### **AI Logic Tracking**
```javascript
// Tracks:
// - Feature used (content_suggestions, message_assistant, research_insights)
// - Success/failure status
// - Response length
// - Error messages
```

### **User Engagement Tracking**
```javascript
// Tracks:
// - Scroll percentage (25%, 50%, 75%, 100%)
// - Time on page (5+ seconds)
// - Button interactions
// - AI feature usage
```

## 🔒 **Privacy & Compliance**

### **Data Collection**
- **No Personal Data** - Only anonymous usage patterns
- **No Cookies** - Uses Firebase Analytics (GDPR compliant)
- **Opt-out Available** - Users can disable tracking

### **GDPR Compliance**
- **Anonymous Tracking** - No personally identifiable information
- **Data Retention** - Firebase handles data retention policies
- **User Control** - Analytics can be disabled by users

## 📊 **Analytics Reports**

### **Real-time Data**
- **Live Users** - Current website visitors
- **Live Events** - Real-time event tracking
- **Live Conversions** - Real-time conversion tracking

### **Historical Data**
- **Daily/Weekly/Monthly** - Usage patterns over time
- **User Segments** - Different user behavior patterns
- **Conversion Funnels** - User journey analysis

## 🚀 **Getting Started**

### **1. View Analytics**
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select `lockard-llc-business` project
3. Go to **Analytics** → **Events**

### **2. Custom Dashboards**
1. Go to **Analytics** → **Custom Reports**
2. Create custom reports for specific metrics
3. Set up alerts for important events

### **3. Export Data**
1. Go to **Analytics** → **Export**
2. Export data to BigQuery for advanced analysis
3. Create custom reports and visualizations

## 📚 **Additional Resources**

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Analytics Best Practices](https://firebase.google.com/docs/analytics/best-practices)

---

*Firebase Analytics is now fully integrated and tracking user interactions across your website!*
