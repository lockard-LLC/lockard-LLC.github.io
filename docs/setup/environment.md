# 🔧 Environment Configuration

This guide covers setting up environment variables and configuration for the Lockard LLC platform.

## 📋 Environment Files

### `.env.local` (Development)
```bash
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=lockard-llc.firebaseapp.com
FIREBASE_PROJECT_ID=lockard-llc
FIREBASE_STORAGE_BUCKET=lockard-llc.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
FIREBASE_APP_ID=your_app_id_here
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
NODE_ENV=development

# Website Configuration
SITE_URL=http://localhost:5000
DOCS_URL=http://localhost:5001
APP_URL=https://app.vibestudio.online

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_REMOTE_CONFIG=true
ENABLE_A_B_TESTING=false
ENABLE_ADMIN_PANEL=true
```

### `.env.production` (Production)
```bash
# Firebase Configuration (Production)
FIREBASE_API_KEY=your_production_api_key
FIREBASE_AUTH_DOMAIN=lockard-llc.firebaseapp.com
FIREBASE_PROJECT_ID=lockard-llc
FIREBASE_STORAGE_BUCKET=lockard-llc.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
NODE_ENV=production

# Website Configuration
SITE_URL=https://lockard.llc
DOCS_URL=https://docs.lockard.llc
APP_URL=https://app.vibestudio.online

# Security
ALLOWED_ORIGINS=https://lockard.llc,https://docs.lockard.llc

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_REMOTE_CONFIG=true
ENABLE_A_B_TESTING=true
ENABLE_ADMIN_PANEL=false
```

## 🔐 Security Configuration

### Firebase Security Rules
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public configuration (read-only)
    match /config/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Analytics data (write-only for authenticated users)
    match /analytics/{document} {
      allow write: if request.auth != null;
      allow read: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

## 🎛️ Remote Config Parameters

### Theme Configuration
```json
{
  "primary_color": "#6366f1",
  "secondary_color": "#8b5cf6",
  "accent_color": "#22c55e",
  "font_family": "Inter",
  "enable_dark_mode": true
}
```

### Content Configuration
```json
{
  "hero_title": "Emotionally Intelligent\\nDeveloper Tools",
  "hero_subtitle": "Pioneering vibe coding – where human creativity meets AI intelligence.",
  "cta_text": "Launch VibeStudio",
  "announcement_banner": ""
}
```

### Feature Flags
```json
{
  "enable_animations": true,
  "maintenance_mode": false,
  "show_beta_features": false,
  "enable_a_b_testing": true
}
```

## 🚀 Deployment Configuration

### Firebase Hosting
```json
{
  "hosting": {
    "public": ".",
    "site": "lockard-llc",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "docs/**",
      ".env*"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=3600"
          }
        ]
      }
    ]
  }
}
```

### Custom Domain Setup
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter `lockard.llc`
4. Follow DNS verification steps
5. SSL certificate will be auto-provisioned

## 🔍 Environment Validation

### Startup Checks
```javascript
// Environment validation
function validateEnvironment() {
  const required = [
    'FIREBASE_API_KEY',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_AUTH_DOMAIN'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  console.log('✅ Environment validation passed');
}
```

## 📱 Development vs Production

| Feature | Development | Production |
|---------|------------|------------|
| **Analytics** | Limited | Full tracking |
| **Remote Config** | Test values | Live config |
| **Error Reporting** | Console only | Firebase Crashlytics |
| **Performance** | Source maps | Minified bundles |
| **Admin Panel** | Enabled | Disabled |

## 🛠️ Troubleshooting

### Common Issues

**Firebase not initializing:**
- Check API key format
- Verify project ID matches Firebase console
- Ensure domain is authorized in Firebase console

**Remote Config not loading:**
- Check network connectivity
- Verify Remote Config is published
- Clear browser cache

**Analytics not tracking:**
- Verify Measurement ID format
- Check ad blockers
- Ensure Analytics is enabled in Firebase console

### Debug Mode
```javascript
// Enable debug mode
window.LockardConfig.debug = true;

// Check configuration status
console.log('Config loaded:', window.LockardConfig.initialized);
console.log('Current config:', window.LockardConfig.config);
```