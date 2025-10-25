# 🔒 Security Setup Guide

## ⚠️ **CRITICAL: API Key Security**

Your Firebase API key was exposed in the repository. Follow these steps immediately:

### 🚨 **Immediate Actions Required**

#### **1. Rotate Your Firebase API Key**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `lockard-llc-business`
3. Go to **Project Settings** → **General**
4. Under **Web apps**, find your app
5. Click **"Regenerate key"** to create a new API key
6. **Delete the old key** from the console

#### **2. Revoke the Exposed Key**
1. In Firebase Console → **Project Settings** → **General**
2. Find the exposed key: `AIzaSyCG4J9t8rs3zgoKJBbHcaq1cvvMMy4u2-I`
3. **Delete this key immediately**
4. Create a new API key for your project

#### **3. Check for Unauthorized Access**
1. Go to **Firebase Console** → **Authentication** → **Users**
2. Check for any suspicious user accounts
3. Review **Firebase Console** → **Analytics** → **Events** for unusual activity
4. Check **Firebase Console** → **Firestore** → **Usage** for unexpected data access

### 🛡️ **Secure Configuration Setup**

#### **Environment Variables (Recommended)**
Create a `.env` file in your project root (NEVER commit this file):

```bash
# .env file (create this locally, never commit)
FIREBASE_API_KEY=your-new-api-key-here
FIREBASE_AUTH_DOMAIN=lockard-llc-business.firebaseapp.com
FIREBASE_PROJECT_ID=lockard-llc-business
FIREBASE_STORAGE_BUCKET=lockard-llc-business.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=272006666491
FIREBASE_APP_ID=1:272006666491:web:d0c41e1d00849610a0785e
FIREBASE_MEASUREMENT_ID=G-BVVNR41T8Y
```

#### **Firebase App Check (Recommended)**
1. Enable **Firebase App Check** in your Firebase Console
2. Add your domain to the allowed origins
3. This prevents unauthorized API usage

### 🔧 **Updated Configuration**

The `firebase/config.js` file now uses placeholder values:

```javascript
// Secure configuration with placeholders
window.__FIREBASE_CONFIG__ = {
  apiKey: process.env.FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  // ... other placeholders
};
```

### 📋 **Security Checklist**

- ✅ **API Key Rotated** - Generate new Firebase API key
- ✅ **Old Key Deleted** - Remove exposed key from Firebase Console
- ✅ **Environment Variables** - Use `.env` file for real credentials
- ✅ **App Check Enabled** - Enable Firebase App Check for security
- ✅ **Domain Restrictions** - Restrict API key to your domains only
- ✅ **Monitoring** - Check for unauthorized access

### 🚀 **Production Deployment**

#### **For Production:**
1. **Never commit** `.env` files
2. **Use environment variables** in your hosting platform
3. **Enable Firebase App Check** for additional security
4. **Monitor usage** in Firebase Console

#### **For Development:**
1. Create `.env` file locally with your real credentials
2. Add `.env` to `.gitignore` (already done)
3. Use placeholder values in committed files

### 🔍 **Monitoring & Alerts**

#### **Set up Monitoring:**
1. **Firebase Console** → **Analytics** → **Events**
2. **Firebase Console** → **Firestore** → **Usage**
3. **Firebase Console** → **Authentication** → **Users**

#### **Security Alerts:**
- Monitor for unusual API usage
- Check for unexpected user registrations
- Review Firestore data access patterns

### 📚 **Additional Resources**

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
- [API Key Security](https://firebase.google.com/docs/projects/api-keys)

---

## ⚠️ **URGENT: Complete These Steps Now**

1. **Rotate your Firebase API key immediately**
2. **Delete the old exposed key**
3. **Check for unauthorized access**
4. **Set up environment variables**
5. **Enable Firebase App Check**

**Your Firebase project security depends on completing these steps!**
