# 🔒 Security Guide

## ⚠️ **CRITICAL: API Key Security**

Your Firebase API key was exposed in the repository. This guide helps you secure your project.

## 🚨 **Immediate Actions Required**

### **1. Rotate Firebase API Key**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `lockard-llc-business`
3. **Project Settings** → **General** → **Web apps**
4. Click **"Regenerate key"** for your app
5. **Delete the old key** immediately

### **2. Check for Unauthorized Access**
1. **Firebase Console** → **Authentication** → **Users**
2. Look for suspicious user accounts
3. **Firebase Console** → **Analytics** → **Events**
4. Check for unusual activity patterns
5. **Firebase Console** → **Firestore** → **Usage**
6. Review data access patterns

### **3. Enable Security Features**
1. **Firebase App Check** - Prevents unauthorized API usage
2. **Firestore Security Rules** - Restrict data access
3. **Authentication Rules** - Control user access

## 🛡️ **Secure Configuration**

### **Environment Variables Setup**
Create a `.env` file locally (NEVER commit):

```bash
# .env file (local only)
FIREBASE_API_KEY=your-new-api-key-here
FIREBASE_AUTH_DOMAIN=lockard-llc-business.firebaseapp.com
FIREBASE_PROJECT_ID=lockard-llc-business
FIREBASE_STORAGE_BUCKET=lockard-llc-business.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=272006666491
FIREBASE_APP_ID=1:272006666491:web:d0c41e1d00849610a0785e
FIREBASE_MEASUREMENT_ID=G-BVVNR41T8Y
```

### **Firebase App Check Setup**
1. **Firebase Console** → **App Check**
2. **Register your app** with reCAPTCHA Enterprise
3. **Add your domains** to allowed origins
4. **Enable enforcement** for all services

### **Firestore Security Rules**
```javascript
// firebase/firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🔧 **Updated Configuration**

### **Secure Firebase Config**
The `firebase/config.js` now uses placeholder values:

```javascript
window.__FIREBASE_CONFIG__ = {
  apiKey: process.env.FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  // ... other placeholders
};
```

### **Environment Variable Usage**
- **Development**: Use `.env` file with real credentials
- **Production**: Use hosting platform environment variables
- **Never commit**: Real API keys to version control

## 📋 **Security Checklist**

### **Immediate Actions**
- ✅ **Rotate API Key** - Generate new Firebase API key
- ✅ **Delete Old Key** - Remove exposed key from Firebase Console
- ✅ **Check Access** - Review for unauthorized usage
- ✅ **Environment Setup** - Create secure `.env` file
- ✅ **App Check** - Enable Firebase App Check

### **Ongoing Security**
- ✅ **Monitor Usage** - Check Firebase Console regularly
- ✅ **Update Rules** - Keep security rules current
- ✅ **Review Access** - Audit user permissions
- ✅ **Backup Data** - Regular data backups

## 🚀 **Production Deployment**

### **Secure Deployment**
1. **Environment Variables** - Use hosting platform env vars
2. **App Check** - Enable for all services
3. **Security Rules** - Restrict data access
4. **Monitoring** - Set up usage alerts

### **Development Security**
1. **Local `.env`** - Never commit real credentials
2. **Placeholder Values** - Use in committed files
3. **Git Hooks** - Prevent accidental commits
4. **Code Reviews** - Check for exposed secrets

## 🔍 **Monitoring & Alerts**

### **Firebase Console Monitoring**
- **Analytics** → **Events** - Unusual activity
- **Firestore** → **Usage** - Data access patterns
- **Authentication** → **Users** - Suspicious accounts
- **App Check** → **Attestations** - API usage validation

### **Security Alerts**
- Monitor API usage patterns
- Check for unexpected user registrations
- Review Firestore data access
- Watch for unusual analytics events

## 📚 **Additional Resources**

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
- [API Key Security](https://firebase.google.com/docs/projects/api-keys)
- [Firebase Security Best Practices](https://firebase.google.com/docs/security)

---

## ⚠️ **URGENT: Complete These Steps**

1. **Rotate your Firebase API key immediately**
2. **Delete the old exposed key**
3. **Check for unauthorized access**
4. **Set up environment variables**
5. **Enable Firebase App Check**

**Your Firebase project security depends on completing these steps!**
