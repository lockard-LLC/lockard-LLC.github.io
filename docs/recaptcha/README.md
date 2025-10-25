# reCAPTCHA Enterprise Documentation & Code

This directory contains all reCAPTCHA Enterprise documentation and implementation code for Lockard LLC.

## 📚 Documentation

### Setup Guides
- [reCAPTCHA Setup Guide](RECAPTCHA_SETUP.md) - Frontend integration and configuration
- [Server-Side Setup](SERVER_RECAPTCHA_SETUP.md) - Backend validation and API integration
- [Debug Token Guide](DEBUG_TOKEN_GUIDE.md) - Development and testing with debug tokens

## 💻 Code Implementation

### Core Files
- **`recaptcha-enterprise.js`** - Frontend reCAPTCHA Enterprise integration helper
- **`recaptcha-assessment.js`** - Server-side token validation and risk scoring
- **`debug-token-setup.js`** - Development debug token configuration
- **`api-verify.js`** - Express.js middleware for reCAPTCHA verification
- **`contact-form-example.js`** - Complete contact form handler with reCAPTCHA

## 🚀 Quick Start

### Frontend Integration
```javascript
// Include the reCAPTCHA Enterprise script
<script src="https://www.google.com/recaptcha/enterprise.js?render=YOUR_SITE_KEY"></script>
<script src="recaptcha-enterprise.js"></script>

// Use in your forms
LockardRecaptcha.bind('#submit-button', 'contact_form', async (token) => {
  // Handle form submission with token
  console.log('reCAPTCHA token:', token);
});
```

### Backend Validation
```javascript
const { validateToken } = require('./recaptcha-assessment');

// Validate a token
const result = await validateToken(token, 'contact_form', 0.5);
if (result.valid) {
  console.log('Token is valid, score:', result.score);
}
```

### Express.js Middleware
```javascript
const { verifyRecaptcha } = require('./api-verify');

// Protect a route
app.post('/api/contact', 
  verifyRecaptcha('contact_form', 0.5), 
  (req, res) => {
    // req.recaptcha contains verification details
    res.json({ success: true });
  }
);
```

## 🔧 Configuration

### Environment Variables
```bash
# reCAPTCHA Enterprise Configuration
RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY
RECAPTCHA_DEBUG_TOKEN=YOUR_DEBUG_TOKEN_HERE
GOOGLE_CLOUD_PROJECT_ID=YOUR_PROJECT_ID
```

### Firebase App Check Integration
```javascript
// Firebase config with reCAPTCHA Enterprise
window.__FIREBASE_CONFIG__ = {
  // ... other config
  appCheckSiteKey: "YOUR_RECAPTCHA_ENTERPRISE_SITE_KEY"
};
```

## 🧪 Development

### Debug Token Setup
```javascript
const { setupDebugToken } = require('./debug-token-setup');

// Configure for development
setupDebugToken();
```

### Testing
```bash
# Test with debug token
const debugToken = 'YOUR_DEBUG_TOKEN:contact_form';
const result = await validateToken(debugToken, 'contact_form', 0.5);
```

## 📁 File Organization

### Documentation
- **Setup guides** - Step-by-step implementation instructions
- **Configuration** - Environment and Firebase setup
- **Troubleshooting** - Common issues and solutions

### Code Files
- **Frontend** - Browser-side reCAPTCHA integration
- **Backend** - Server-side validation and middleware
- **Examples** - Complete working implementations
- **Utilities** - Helper functions and debug tools

## 🔒 Security Features

- **Token Validation** - Server-side verification of reCAPTCHA tokens
- **Risk Scoring** - Advanced bot detection and scoring
- **Debug Tokens** - Safe development and testing
- **Firebase App Check** - Integration with Firebase security
- **Environment Variables** - Secure credential management

## 🚀 Deployment

### Production Setup
1. Get your reCAPTCHA Enterprise credentials
2. Configure environment variables
3. Deploy with proper security settings
4. Test with real tokens

### Development Setup
1. Use debug tokens for testing
2. Configure local environment
3. Test all functionality
4. Verify security measures

## 📖 Next Steps

1. **Read the setup guides** for detailed implementation
2. **Configure your environment** with proper credentials
3. **Test the integration** using the provided examples
4. **Deploy to production** with security best practices

Your reCAPTCHA Enterprise integration is ready to protect your application! 🛡️
