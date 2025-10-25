# Lockard LLC Documentation Portal

Welcome to the comprehensive documentation portal for Lockard LLC's technology infrastructure. This site provides detailed guides, code examples, and best practices for our development ecosystem.

## 🏗️ Architecture Overview

Our documentation is organized into two main technology stacks:

- **🔐 reCAPTCHA Enterprise** - Advanced bot protection and security
- **🔥 Firebase** - Multi-site hosting and cloud infrastructure

## 📚 Documentation Sections

### 🔐 reCAPTCHA Enterprise
Complete implementation guide for Google reCAPTCHA Enterprise integration.

#### 📖 Documentation
- **[reCAPTCHA Overview](recaptcha/README.md)** - Complete implementation guide and code examples
- **[Frontend Setup](recaptcha/RECAPTCHA_SETUP.md)** - Browser-side integration and configuration
- **[Server-Side Setup](recaptcha/SERVER_RECAPTCHA_SETUP.md)** - Backend validation and API integration
- **[Debug Token Guide](recaptcha/DEBUG_TOKEN_GUIDE.md)** - Development and testing procedures

#### 💻 Code Implementation
- **[recaptcha-enterprise.js](recaptcha/recaptcha-enterprise.js)** - Frontend integration helper
- **[recaptcha-assessment.js](recaptcha/recaptcha-assessment.js)** - Server-side token validation
- **[api-verify.js](recaptcha/api-verify.js)** - Express.js middleware for reCAPTCHA
- **[debug-token-setup.js](recaptcha/debug-token-setup.js)** - Development token configuration
- **[contact-form-example.js](recaptcha/contact-form-example.js)** - Complete form handler example

### 🔥 Firebase
Multi-site hosting configuration and deployment procedures.

#### 📖 Documentation
- **[Firebase Setup Guide](firebase/FIREBASE_SETUP.md)** - Multi-site hosting configuration
- **[Deployment Guide](firebase/DEPLOYMENT_GUIDE.md)** - Production deployment procedures
- **[Multi-Site Setup](firebase/MULTI_SITE_SETUP.md)** - Complete multi-site configuration guide
- **[Project Setup](firebase/PROJECT_SETUP.md)** - Clean project organization guide
- **[AI Logic Documentation](ai-logic/README.md)** - Complete Firebase AI Logic (Gemini API) documentation
- **[Analytics Documentation](analytics/README.md)** - Firebase Analytics integration and tracking

#### 💻 Code Implementation
- **[AI Logic Demo](ai-logic/examples/ai-logic-demo.html)** - Interactive AI Logic demonstration
- **[Firebase Config](firebase/config.js)** - Firebase configuration with AI Logic
- **[AI Logic Implementation](assets/js/ai-logic.js)** - Main AI Logic integration

## 🚀 Quick Start

### Development Environment
```bash
# Start local development server
yarn dev

# Start Firebase hosting locally
firebase serve --only hosting

# Start docs site specifically
firebase serve --only hosting:docs
```

### Production Deployment
```bash
# Deploy main site only
firebase deploy --only hosting:main

# Deploy docs site only
firebase deploy --only hosting:docs

# Deploy all hosting targets
yarn deploy

# Deploy everything (hosting + rules + config)
yarn deploy:all
```

## 🔧 Configuration

### Environment Setup
All configuration is managed through environment variables. Each technology stack has specific requirements:

#### reCAPTCHA Enterprise
```bash
RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
RECAPTCHA_DEBUG_TOKEN=your_debug_token_here
GOOGLE_CLOUD_PROJECT_ID=your_project_id
```

#### Firebase
```bash
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_STORAGE_BUCKET=your_bucket
```

### Multi-Site Architecture
- **Main Site**: `https://lockard.llc` (root directory)
- **Docs Site**: `https://docs.lockard.llc` (docs directory)

## 🎯 Technology Stack

### Security & Protection
- **reCAPTCHA Enterprise** - Advanced bot detection and risk scoring
- **Firebase App Check** - Application integrity verification
- **Environment Variables** - Secure credential management

### Hosting & Infrastructure
- **Firebase Hosting** - Global CDN with custom domains
- **Multi-Site Configuration** - Separate hosting targets
- **Static Site Generation** - Fast, secure, and scalable

## 📖 Getting Help

### Documentation Navigation
- **Start with overview guides** for each technology stack
- **Follow setup guides** for step-by-step implementation
- **Use code examples** for complete working implementations
- **Check troubleshooting sections** for common issues

### Support & Contact
- **Email**: [hello@lockard.llc](mailto:hello@lockard.llc)
- **Documentation**: [https://docs.lockard.llc](https://docs.lockard.llc)
- **Issues**: Check individual guide troubleshooting sections

### Common Issues
- Verify environment variables are set correctly
- Ensure Firebase project configuration is complete
- Check reCAPTCHA site key and secret key configuration
- Validate multi-site hosting configuration

## 🔄 Maintenance & Updates

This documentation is actively maintained and updated to reflect:
- Latest configuration best practices
- Security updates and recommendations
- New feature implementations
- Troubleshooting solutions

### Update Schedule
- **Weekly**: Code examples and implementation guides
- **Monthly**: Configuration and deployment procedures
- **As needed**: Security updates and new features

---

*Built with ❤️ by Lockard LLC • [Organization Guide](ORGANIZATION_GUIDE.md)*