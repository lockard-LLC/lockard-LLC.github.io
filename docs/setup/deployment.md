# 🚀 Deployment Guide

Complete guide for deploying Lockard LLC to Firebase Hosting with custom domain.

## 📋 Prerequisites

- Firebase project created
- Firebase CLI installed (`npm install -g firebase-tools`)
- Domain `lockard.llc` ready for DNS configuration
- Environment variables configured

## 🔥 Firebase Hosting Setup

### 1. Initialize Firebase Project
```bash
# Login to Firebase
firebase login

# Initialize in project directory
firebase init

# Select these services:
# ✅ Hosting
# ✅ Remote Config  
# ✅ Firestore
# ✅ Functions (optional)
# ✅ Analytics
```

### 2. Configure Hosting
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
    ]
  }
}
```

### 3. Deploy Initial Version
```bash
# Deploy hosting only
firebase deploy --only hosting

# Deploy all services
firebase deploy
```

## 🌐 Custom Domain Configuration

### 1. Add Domain in Firebase Console
1. Go to **Firebase Console** > **Hosting**
2. Click **"Add custom domain"**
3. Enter: `lockard.llc`
4. Follow verification steps

### 2. DNS Configuration
Add these records to your domain provider (Porkbun):

```dns
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

Type: CNAME
Name: www
Value: lockard-llc.web.app
```

### 3. SSL Certificate
- Firebase automatically provisions SSL certificates
- Takes 24-48 hours for full propagation
- Enforces HTTPS automatically

## 📊 Remote Config Deployment

### 1. Deploy Template
```bash
firebase deploy --only remoteconfig
```

### 2. Set Initial Values
In Firebase Console > Remote Config:

**Theme Settings:**
- `primary_color`: `#6366f1`
- `secondary_color`: `#8b5cf6`
- `accent_color`: `#22c55e`

**Content Settings:**
- `hero_title`: `Emotionally Intelligent\nDeveloper Tools`
- `hero_subtitle`: `Pioneering vibe coding – where human creativity meets AI intelligence.`
- `cta_text`: `Launch VibeStudio`

**Feature Flags:**
- `enable_dark_mode`: `true`
- `enable_animations`: `true`
- `maintenance_mode`: `false`

### 3. Publish Configuration
Click **"Publish changes"** in Remote Config console.

## 🔄 Deployment Environments

### Development
```bash
# Use development project
firebase use development

# Deploy with development config
npm run deploy
```

### Staging
```bash
# Use staging project  
firebase use staging

# Deploy for testing
npm run deploy
```

### Production
```bash
# Use production project
firebase use production

# Deploy everything
npm run deploy:all
```

## 📈 Analytics Setup

### 1. Enable Analytics
```bash
firebase deploy --only analytics
```

### 2. Configure Measurement ID
Update `firebase-config.js`:
```javascript
measurementId: "G-XXXXXXXXXX"
```

### 3. Verify Tracking
- Check Firebase Console > Analytics
- Real-time user tracking should appear
- Event tracking for button clicks

## 🔧 Performance Optimization

### 1. Enable Caching
```json
{
  "headers": [
    {
      "source": "**/*.@(js|css)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=3600"
        }
      ]
    },
    {
      "source": "**/*.@(jpg|jpeg|gif|png|svg)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=7200"
        }
      ]
    }
  ]
}
```

### 2. Minify Assets
```bash
# Install build tools
npm install --save-dev terser clean-css-cli

# Add build scripts
npm run build:css
npm run build:js
```

## 🔍 Monitoring & Analytics

### 1. Performance Monitoring
```javascript
// Enable in firebase-config.js
import { getPerformance } from 'firebase/performance';
const perf = getPerformance(app);
```

### 2. Error Reporting
```bash
# Enable Crashlytics
firebase init crashlytics
```

### 3. Custom Events
```javascript
// Track business metrics
LockardConfig.trackEvent('signup_completed', {
  plan: 'free',
  source: 'landing_page'
});
```

## 🚀 Continuous Deployment

### 1. GitHub Actions (Optional)
```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: lockard-llc
```

### 2. Automatic Deployment
```bash
# Enable GitHub integration
firebase init hosting:github
```

## ✅ Post-Deployment Checklist

### 1. Verify Website
- [ ] `https://lockard.llc` loads correctly
- [ ] SSL certificate is active
- [ ] All pages navigate properly
- [ ] Mobile responsiveness works

### 2. Test Firebase Features
- [ ] Remote Config updates apply
- [ ] Analytics events track
- [ ] Dark mode toggle works
- [ ] Admin panel appears (in dev)

### 3. Performance Check
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] All images optimized
- [ ] CSS/JS minified

### 4. SEO Verification
- [ ] Meta tags present
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Open Graph tags working

## 🔧 Troubleshooting

### Domain Issues
```bash
# Check DNS propagation
nslookup lockard.llc

# Verify Firebase hosting
firebase hosting:channel:list
```

### Remote Config Issues
```bash
# Check template validation
firebase remoteconfig:get --template

# Force config refresh
firebase remoteconfig:publish
```

### Performance Issues
- Check Network tab in DevTools
- Verify caching headers
- Optimize images and assets
- Review bundle sizes

## 📞 Support Resources

- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Firebase Status**: https://status.firebase.google.com
- **Support**: hello@lockard.llc