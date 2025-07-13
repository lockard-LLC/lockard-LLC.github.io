# 🔥 Firebase Setup Guide for Lockard LLC

## 📋 Prerequisites
- Firebase account
- Node.js installed
- Firebase CLI installed (`npm install -g firebase-tools`)

## 🚀 Quick Setup Steps

### 1. Create Firebase Project
```bash
# Login to Firebase
firebase login

# Initialize project
firebase init
```

Select these services:
- ✅ Hosting
- ✅ Remote Config
- ✅ Firestore
- ✅ Functions (for Claude integration)
- ✅ Analytics

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update `.env.local` with your Firebase config:
```bash
# Get these from Firebase Console > Project Settings > General
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=lockard-llc.firebaseapp.com
FIREBASE_PROJECT_ID=lockard-llc
FIREBASE_STORAGE_BUCKET=lockard-llc.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Update JavaScript Configuration

Edit `assets/js/firebase-config.js`:
```javascript
// Replace the firebaseConfig object with your actual values
const firebaseConfig = {
  apiKey: "your_actual_api_key",
  authDomain: "your_project.firebaseapp.com",
  // ... rest of your config
};
```

### 4. Deploy Remote Config Template

```bash
# Upload the remote config template
firebase deploy --only remoteconfig
```

### 5. Set Initial Remote Config Values

In Firebase Console:
1. Go to Remote Config
2. Set initial parameter values:
   - `primary_color`: `#6366f1`
   - `hero_title`: `Emotionally Intelligent\nDeveloper Tools`
   - `enable_dark_mode`: `true`
   - etc.

### 6. Deploy Website

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Or deploy everything
firebase deploy
```

## 🎨 Dynamic Customization Features

### Remote Config Parameters You Can Control:

**🎨 Theming:**
- `primary_color` - Main brand color
- `secondary_color` - Secondary color
- `accent_color` - Accent highlights
- `font_family` - Typography choice

**📝 Content:**
- `hero_title` - Main headline
- `hero_subtitle` - Description text
- `cta_text` - Button labels
- `announcement_banner` - Top banner message

**⚙️ Features:**
- `enable_dark_mode` - Dark theme toggle
- `enable_animations` - CSS animations
- `maintenance_mode` - Site maintenance
- `show_beta_features` - Admin panel

**🧪 A/B Testing:**
- `hero_variant` - Hero section variants
- `cta_variant` - Button style variants
- `mood_theme` - Emotional theming

## 🔄 How Dynamic Updates Work

1. **Change values** in Firebase Remote Config console
2. **Publish changes** 
3. **Website automatically updates** within 5 minutes
4. **No code deployment** required!

## 📱 Testing Locally

```bash
# Serve locally with Firebase
firebase serve --only hosting

# Or use the simple Python server
npm run dev
```

## 🤖 Claude Integration (Advanced)

For WhatsApp → Claude → Website updates:

1. **Set up Firebase Functions:**
```bash
cd functions
npm install
firebase deploy --only functions
```

2. **Configure WhatsApp Business API** (requires approval)

3. **Add Claude API key** to Firebase Functions config:
```bash
firebase functions:config:set claude.api_key="your_claude_api_key"
```

See `claude-integration-architecture.md` for detailed setup.

## 🔧 Troubleshooting

**Config not loading?**
- Check browser console for errors
- Verify Firebase config values
- Ensure Remote Config is published

**Styling not updating?**
- Clear browser cache
- Check CSS custom properties in DevTools
- Verify Remote Config parameter names

**Analytics not working?**
- Check Measurement ID in config
- Verify Analytics is enabled in Firebase Console

## 🎯 Next Steps

1. ✅ Set up Firebase project
2. ✅ Configure environment variables  
3. ✅ Deploy initial Remote Config
4. ✅ Test dynamic theming
5. ⭐ Set up Claude integration (optional)
6. 🚀 Go live with custom domain!

## 📞 Support

Questions? Email: hello@lockard.llc