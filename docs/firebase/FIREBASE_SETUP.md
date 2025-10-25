# Firebase Setup Guide

## Overview

This guide covers the complete Firebase setup for Lockard LLC, including hosting, authentication, and security configurations.

## Project Configuration

### Firebase Project Details
- **Firebase project**: `lockard-llc-business` (CLI default in `.firebaserc`)
- **Hosting targets**: `lockard-llc` (main site), `docs-lockard-llc` (documentation)
- **Custom domains**: `https://lockard.llc` and `https://docs.lockard.llc`

### Environment Variables
```bash
# Copy these from your private `.env` (see `.env.example`)
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Multi-Site Hosting Setup

### Firebase Configuration (firebase.json)
```json
{
  "hosting": [
    {
      "target": "main",
      "public": ".",
      "site": "lockard-llc",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**",
        "docs/**",
        "examples/**",
        ".env*",
        "README.md",
        "functions/**"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    },
    {
      "target": "docs",
      "public": "docs",
      "site": "docs-lockard-llc",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ]
    }
  ]
}
```

### Site Targets
- **Main Site**: Serves from root directory
- **Docs Site**: Serves from `docs/` directory

## Development Commands

### Local Development
```bash
# Start development server
yarn dev

# Start with specific site
firebase serve --only hosting:main
firebase serve --only hosting:docs
```

### Deployment
```bash
# Deploy main site only
firebase deploy --only hosting:main

# Deploy docs site only
firebase deploy --only hosting:docs

# Deploy all sites
firebase deploy --only hosting
```

## Security Configuration

### Firebase App Check
- **Site Key**: `6LdknvUrAAAAAO500OXCitu8If6AfVn3ytIsmDIr`
- **Provider**: reCAPTCHA Enterprise
- **Auto-refresh**: Enabled

### Firestore Rules
- **Database**: `lockard-db`
- **Rules**: Located in `firebase/firestore.rules`
- **Indexes**: Located in `firebase/firestore.indexes.json`

### Storage Rules
- **Rules**: Located in `firebase/storage.rules`
- **Security**: Configured for public read access

## Custom Domains

### Main Site
- **Domain**: `lockard.llc`
- **Target**: `main`
- **SSL**: Automatic

### Docs Site
- **Domain**: `docs.lockard.llc`
- **Target**: `docs`
- **SSL**: Automatic

## Troubleshooting

### Common Issues
1. **Site not loading**: Check Firebase project configuration
2. **SSL errors**: Verify domain DNS settings
3. **Build failures**: Check ignore patterns in firebase.json

### Debug Commands
```bash
# Check Firebase configuration
firebase projects:list
firebase use

# Debug hosting
firebase serve --debug
firebase deploy --debug
```

## Next Steps

1. **Set up custom domains** in Firebase Console
2. **Configure DNS records** for your domains
3. **Test both sites** locally and in production
4. **Monitor performance** and security

Your Firebase multi-site setup is complete! 🚀
