# Firebase Configuration

This directory contains Firebase configuration files for the Lockard LLC project.

## Files

- `config.js` - Current Firebase configuration (already set up)
- `config.template.js` - Template for new Firebase configurations
- `firebase-init.js` - Modern Firebase SDK initialization with your credentials
- `config-env.js` - Environment variable-based configuration
- `firestore.rules` - Firestore security rules
- `storage.rules` - Firebase Storage security rules
- `remoteconfig.json` - Remote Config settings

## Usage

### Option 1: Use existing config.js (Current setup)
The project is already configured to use `firebase/config.js` which contains your Firebase credentials.

### Option 2: Use modern Firebase SDK
Import and use the modern Firebase initialization:

```javascript
import { app, analytics } from './firebase/firebase-init.js';
```

### Option 3: Use environment variables
If you want to use environment variables, copy `.env.example` to `.env` and use:

```javascript
import firebaseConfig from './firebase/config-env.js';
```

## Environment Variables

The following environment variables are available in `.env.example`:

- `FIREBASE_API_KEY` - Your Firebase API key
- `FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `FIREBASE_APP_ID` - Your Firebase app ID
- `FIREBASE_MEASUREMENT_ID` - Your Firebase measurement ID

## Security

- Never commit `.env` files to version control
- The `.env.example` file contains your actual credentials as a template
- Use the template to create your own `.env` file for local development
