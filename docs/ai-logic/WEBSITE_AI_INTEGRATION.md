# Website AI Logic Integration Guide

This guide shows how to integrate Firebase AI Logic (Gemini API) into your main website, following the official Firebase AI Logic documentation.

## 🚀 Integration Overview

The AI Logic integration adds thoughtful, AI-powered features to your website that align with your "human-centered software" philosophy:

- **AI Content Suggestions** - Personalized insights about software development
- **AI Message Assistant** - Help visitors craft thoughtful messages
- **AI Research Insights** - Explore emerging trends in software development

## 📋 Prerequisites

- Firebase project with AI Logic enabled
- Firebase configuration file (`firebase/config.js`)
- Modern web browser with ES6+ support

## 🔧 Step 1: Firebase Project Setup

### 1.1 Enable AI Logic in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firebase AI Logic** page
4. Click **"Get started"** and choose your provider:
   - **Gemini Developer API** (recommended for development)
   - **Vertex AI Gemini API** (for production)

### 1.2 Configure Firebase Project
Ensure your Firebase project has:
- ✅ AI Logic enabled
- ✅ Required APIs activated
- ✅ Billing configured (if using Vertex AI)

## 📦 Step 2: Install Firebase SDK

The Firebase SDK is already included in your project. The AI Logic library is part of the Firebase JavaScript SDK for Web.

### 2.1 Verify Dependencies
```json
{
  "dependencies": {
    "firebase": "^12.4.0"
  }
}
```

### 2.2 Dynamic Imports
The integration uses dynamic imports to load Firebase modules:
```javascript
const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
const { getAI, getGenerativeModel, GoogleAIBackend } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-ai.js');
```

## 🤖 Step 3: Initialize AI Logic Service

### 3.1 Firebase Configuration
Update `firebase/config.js` with your Firebase project settings:

```javascript
window.__FIREBASE_CONFIG__ = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "G-XXXXXXXXXX"
};
```

### 3.2 AI Logic Initialization
The integration automatically initializes when the page loads:

```javascript
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize AI Logic service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create model instance
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
```

## 💬 Step 4: AI-Powered Features

### 4.1 AI Content Suggestions
**Location**: Hero section
**Function**: Provides personalized insights about human-centered software development

```javascript
async function showAIContentSuggestions() {
  const prompt = `Based on the Lockard LLC website content about human-centered software, mindful technology, and collaborative tooling, provide 3 thoughtful insights about:
  1. Emerging trends in human-centered software development
  2. Best practices for mindful technology implementation
  3. Strategies for building resilient development teams`;
  
  const result = await model.generateContent(prompt);
  const insights = result.response.text();
  // Display insights in modal
}
```

### 4.2 AI Message Assistant
**Location**: Contact section
**Function**: Helps visitors craft thoughtful messages to Lockard LLC

```javascript
async function showAIMessageAssistant() {
  const prompt = `Help someone write a professional, thoughtful email to Lockard LLC about potential collaboration. The email should:
  1. Be concise but warm
  2. Show understanding of their human-centered approach
  3. Clearly state the collaboration interest
  4. Maintain a professional yet personal tone`;
  
  const result = await model.generateContent(prompt);
  const messageTemplate = result.response.text();
  // Display template in modal
}
```

### 4.3 AI Research Insights
**Location**: Research section
**Function**: Explores AI-generated insights about software development research

```javascript
async function showAIResearchInsights() {
  const prompt = `Based on Lockard LLC's focus on research and insights about how teams adopt new workflows, provide:
  1. Current trends in software development research
  2. Emerging methodologies for measuring team success
  3. Best practices for maintaining healthy development cadence`;
  
  const result = await model.generateContent(prompt);
  const insights = result.response.text();
  // Display insights in modal
}
```

## 🎨 UI Integration

### 4.1 AI Feature Buttons
The integration adds subtle AI-powered buttons throughout the website:

```html
<!-- AI Content Suggestions -->
<button class="btn-ai-suggestion">
  <span>🤖</span>
  <span>Explore AI Insights</span>
</button>

<!-- AI Message Assistant -->
<button class="btn-ai-enhancement">
  <span>✨</span>
  <span>AI Message Assistant</span>
</button>

<!-- AI Research Insights -->
<button class="btn-ai-insights">
  <span>🔬</span>
  <span>AI Research Insights</span>
</button>
```

### 4.2 Modal Interface
AI features use a consistent modal interface:

```css
.ai-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
}

.ai-modal-content {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
}
```

## 🔒 Security & Best Practices

### 5.1 Firebase App Check
For production, implement Firebase App Check:

```javascript
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('your-recaptcha-site-key'),
  isTokenAutoRefreshEnabled: true
});
```

### 5.2 Rate Limiting
The integration includes built-in rate limiting:

```javascript
const rateLimit = {
  requestsPerMinute: 15,
  maxRetries: 3,
  retryDelay: 1000
};
```

### 5.3 Error Handling
Comprehensive error handling for all AI features:

```javascript
try {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  // Display result
} catch (error) {
  console.error('AI Logic error:', error);
  // Show user-friendly error message
}
```

## 🚀 Deployment

### 6.1 Environment Variables
Set up environment variables for production:

```bash
# .env file
FIREBASE_API_KEY=your_actual_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 6.2 Firebase Hosting
Deploy with Firebase Hosting:

```bash
# Build and deploy
yarn build
firebase deploy --only hosting
```

### 6.3 Testing
Test the integration:

```bash
# Start local development
yarn dev

# Test AI features
# 1. Open browser console
# 2. Check for "Firebase AI Logic initialized successfully"
# 3. Click AI feature buttons
# 4. Verify responses are generated
```

## 📊 Monitoring & Analytics

### 7.1 Usage Tracking
Track AI feature usage:

```javascript
// Track AI feature usage
function trackAIUsage(feature, action) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'ai_feature_used', {
      'feature_name': feature,
      'action': action
    });
  }
}
```

### 7.2 Error Monitoring
Monitor AI Logic errors:

```javascript
function logAIError(error, context) {
  console.error('AI Logic Error:', {
    error: error.message,
    context: context,
    timestamp: new Date().toISOString()
  });
  
  // Send to monitoring service
  if (typeof window.Sentry !== 'undefined') {
    window.Sentry.captureException(error, { extra: context });
  }
}
```

## 🔧 Customization

### 8.1 Model Selection
Choose different models for different features:

```javascript
// Fast model for quick responses
const fastModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// High-quality model for complex tasks
const proModel = getGenerativeModel(ai, { model: "gemini-2.5-pro" });
```

### 8.2 Prompt Customization
Customize prompts for your specific use case:

```javascript
const customPrompt = `Based on ${websiteContext}, provide insights about ${specificTopic}. 
Focus on ${targetAudience} and emphasize ${keyValues}.`;
```

### 8.3 UI Customization
Customize the AI feature appearance:

```css
.btn-ai-suggestion {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: var(--primary-blue);
  /* Add your custom styles */
}
```

## 📚 Additional Resources

- [Firebase AI Logic Documentation](https://firebase.google.com/docs/ai)
- [Gemini API Reference](https://ai.google.dev/docs)
- [Firebase App Check Setup](https://firebase.google.com/docs/app-check)
- [Website Integration Examples](firebase/ai-logic-integration.js)

## 🎯 Next Steps

1. **Configure Firebase Project** with AI Logic enabled
2. **Update Firebase configuration** with your project settings
3. **Test AI features** in development environment
4. **Deploy to production** with proper security measures
5. **Monitor usage** and optimize prompts based on user feedback

---

*This integration provides thoughtful AI-powered features that align with Lockard LLC's human-centered approach to software development.*
