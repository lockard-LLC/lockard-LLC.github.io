# Project Setup Guide

## Clean Project Structure

This guide shows you how to set up a clean, organized project structure for Lockard LLC with proper separation of concerns.

## 📁 Recommended Directory Structure

```
lockard-llc/
├── index.html                    # Main site (lockard.llc)
├── assets/                      # Main site assets
│   ├── css/
│   ├── js/
│   └── images/
├── docs/                        # Documentation site (docs.lockard.llc)
│   ├── index.html               # Docs landing page
│   ├── README.md                # Docs index
│   ├── recaptcha/               # reCAPTCHA documentation
│   │   ├── RECAPTCHA_SETUP.md
│   │   ├── SERVER_RECAPTCHA_SETUP.md
│   │   └── DEBUG_TOKEN_GUIDE.md
│   └── firebase/                # Firebase documentation & code
│       ├── FIREBASE_SETUP.md
│       ├── DEPLOYMENT_GUIDE.md
│       ├── MULTI_SITE_SETUP.md
│       ├── PROJECT_SETUP.md
│       ├── firebase-config-template.js
│       ├── recaptcha-assessment.js
│       ├── api-verify.js
│       ├── debug-token-setup.js
│       ├── contact-form-example.js
│       └── recaptcha-enterprise.js
├── firebase/                    # Firebase configuration
│   ├── config.template.js       # Template for Firebase config
│   ├── firestore.rules
│   ├── storage.rules
│   └── remoteconfig.json
├── firebase.json                # Multi-site hosting config
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment variables template
└── README.md                    # Main project README
```

## 🔧 Configuration Files

### 1. **Firebase Configuration**
- **Template**: `firebase/config.template.js` (example values)
- **Actual**: `firebase/config.js` (your real values - not in git)
- **Environment**: `.env` file with your actual credentials

### 2. **Environment Variables**
- **Template**: `.env.example` (example values)
- **Actual**: `.env` (your real values - not in git)

### 3. **Multi-Site Hosting**
- **Configuration**: `firebase.json` with targets
- **Main Site**: Serves from root directory
- **Docs Site**: Serves from `docs/` directory

## 🚀 Setup Instructions

### 1. **Clone and Install**
```bash
git clone <your-repo>
cd lockard-llc
npm install
```

### 2. **Configure Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit with your actual values
nano .env
```

### 3. **Set Up Firebase Config**
```bash
# Copy Firebase config template
cp firebase/config.template.js firebase/config.js

# Edit with your actual Firebase credentials
nano firebase/config.js
```

### 4. **Configure Firebase Targets**
```bash
# Set up multi-site targets
firebase target:apply hosting main YOUR_MAIN_SITE_ID
firebase target:apply hosting docs YOUR_DOCS_SITE_ID
```

## 📝 Code Organization

### **Documentation Files**
- All documentation is in `docs/` directory
- Code examples are in `docs/firebase/` directory
- No hardcoded API keys in documentation

### **Configuration Files**
- Templates use placeholder values
- Actual config files contain real credentials
- Environment variables for sensitive data

### **Separation of Concerns**
- **Main site**: Business content and functionality
- **Docs site**: Technical documentation and examples
- **Firebase config**: Project-specific settings
- **Code examples**: Reusable templates and patterns

## 🔒 Security Best Practices

### 1. **Never Commit Sensitive Data**
```bash
# Add to .gitignore
.env
firebase/config.js
```

### 2. **Use Environment Variables**
```javascript
// Good: Use environment variables
const apiKey = process.env.FIREBASE_API_KEY;

// Bad: Hardcode in source
const apiKey = "AIzaSyDMuyqu8Sp_7UNWYlAfdW6gBdT7fR0DBJA";
```

### 3. **Template Files Only**
- Documentation contains example values only
- Real credentials in environment variables
- Clear separation between templates and actual config

## 🚀 Deployment

### **Development**
```bash
# Start main site
yarn dev:main

# Start docs site
yarn dev:docs

# Start both sites
yarn dev
```

### **Production**
```bash
# Deploy main site
yarn deploy:main

# Deploy docs site
yarn deploy:docs

# Deploy everything
yarn deploy:all
```

## 📚 Documentation Structure

### **Main Documentation**
- `docs/README.md` - Documentation index
- `docs/recaptcha/` - reCAPTCHA guides
- `docs/firebase/` - Firebase guides and code

### **Code Examples**
- All code examples in `docs/firebase/`
- Template files with placeholder values
- Complete working examples for reference

### **Configuration Templates**
- `firebase/config.template.js` - Firebase config template
- `.env.example` - Environment variables template
- Clear instructions for setup

## ✅ Benefits of This Structure

1. **Clean Separation**: Main site vs documentation
2. **Security**: No hardcoded credentials in git
3. **Maintainability**: Organized, modular structure
4. **Scalability**: Easy to add new documentation sections
5. **Professional**: Industry-standard organization

Your project is now cleanly organized and ready for development! 🚀
