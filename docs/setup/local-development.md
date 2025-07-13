# 💻 Local Development Guide

This guide will get you up and running with the Lockard LLC platform on your local machine.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git** for version control
- **Modern browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/lockard-LLC/lockard-llc.git
cd lockard-llc
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your Firebase config
nano .env.local
```

### 4. Login to Firebase
```bash
firebase login
```

### 5. Start Development Server
```bash
npm run dev
# or
firebase serve --only hosting
```

Your site will be available at `http://localhost:5000`

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Firebase hosting server |
| `npm run serve` | Start full Firebase emulator suite |
| `npm run deploy` | Deploy to Firebase hosting |
| `npm run deploy:all` | Deploy all Firebase services |
| `firebase serve` | Serve with Firebase emulator |

## 🌐 Local URLs

- **Main Site**: http://localhost:5000
- **Firebase Console**: http://localhost:4000 (when using emulator)
- **Firestore Emulator**: http://localhost:8080
- **Functions Emulator**: http://localhost:5001

## 🔥 Firebase Emulator Setup

### 1. Install Emulator
```bash
firebase init emulators
```

### 2. Configure Emulators
```json
{
  "emulators": {
    "hosting": {
      "port": 5000
    },
    "firestore": {
      "port": 8080
    },
    "functions": {
      "port": 5001
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

### 3. Start Emulators
```bash
firebase emulators:start
```

## 🎨 Development Features

### Hot Reload
- CSS changes apply immediately
- JavaScript changes require browser refresh
- Remote Config changes apply within 5 minutes

### Debug Mode
```javascript
// Enable in browser console
window.LockardConfig.debug = true;

// View current configuration
console.table(window.LockardConfig.config);
```

### Admin Panel
Set `ENABLE_ADMIN_PANEL=true` in `.env.local` to show the admin panel with:
- Remote config refresh
- Theme toggling
- Version information

## 🧪 Testing Remote Config

### 1. Create Test Parameters
In Firebase Console > Remote Config:
```json
{
  "test_message": "Hello from Remote Config!",
  "test_color": "#ff6b6b",
  "debug_mode": true
}
```

### 2. Test in Code
```javascript
// Check if config loaded
if (window.LockardConfig.initialized) {
  console.log('Test message:', window.LockardConfig.get('test_message'));
}
```

## 📝 File Structure

```
lockard-llc/
├── index.html              # Main website entry
├── assets/
│   ├── css/
│   │   ├── main.css         # Base styles
│   │   └── dynamic-theme.css # Firebase-controlled theming
│   ├── js/
│   │   ├── main-firebase.js # Main app with Firebase
│   │   └── firebase-config.js # Firebase configuration
│   └── images/             # Static assets
├── docs/                   # Documentation site
├── firebase.json           # Firebase configuration
├── .env.local             # Local environment variables
└── package.json           # Dependencies and scripts
```

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-theme-system

# Make changes
# Test locally with npm run dev

# Deploy to staging
firebase use staging
npm run deploy

# Test staging environment
# Merge to main when ready
```

### 2. Remote Config Testing
```bash
# Test config changes locally
firebase emulators:start

# Update Remote Config in console
# Changes appear immediately in emulator
```

### 3. Firebase Functions (Optional)
```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Start functions emulator
firebase emulators:start --only functions

# Deploy functions
firebase deploy --only functions
```

## 🎯 Common Development Tasks

### Add New Remote Config Parameter
1. Update `remoteconfig.template.json`
2. Add default in `firebase-config.js`
3. Use in code: `LockardConfig.get('new_parameter')`
4. Deploy: `firebase deploy --only remoteconfig`

### Modify Dynamic Styling
1. Edit CSS custom properties in `dynamic-theme.css`
2. Update Remote Config parameters
3. Test with different values in Firebase console

### Add Analytics Event
```javascript
// Track custom event
LockardConfig.trackEvent('custom_event', {
  custom_parameter: 'value',
  user_type: 'developer'
});
```

## 🐛 Debugging

### Firebase Issues
```bash
# Check Firebase status
firebase status

# Debug hosting
firebase serve --debug

# View logs
firebase functions:log
```

### Browser Debugging
- Open Developer Tools (F12)
- Check Console for Firebase errors
- Network tab for failed requests
- Application tab for stored data

### Remote Config Debug
```javascript
// Force config refresh
await fetchAndActivate(remoteConfig);

// Check last fetch time
console.log('Last fetch:', remoteConfig.fetchTimeMillis);
```

## 🚀 Deployment

### Staging
```bash
firebase use staging
npm run deploy
```

### Production
```bash
firebase use production
npm run deploy:all
```

## 📞 Support

- **Technical Issues**: Check browser console first
- **Firebase Issues**: Check Firebase Console status
- **Questions**: [hello@lockard.llc](mailto:hello@lockard.llc)