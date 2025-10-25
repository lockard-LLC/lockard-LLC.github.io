# Firebase Multi-Site Setup Guide

## Overview

This guide covers setting up multiple Firebase Hosting sites for Lockard LLC:
- **Main Site**: `https://lockard.llc` (root directory)
- **Docs Site**: `https://docs.lockard.llc` (docs directory)

## ✅ Current Configuration

### Firebase Targets
- **Main Site**: `lockard-llc` → `main` target
- **Docs Site**: `docs-lockard-llc` → `docs` target

### Directory Structure
```
lockard-llc/
├── index.html              # Main site (lockard.llc)
├── assets/                 # Main site assets
├── docs/                   # Docs site (docs.lockard.llc)
│   ├── index.html          # Docs landing page
│   ├── README.md           # Docs index
│   ├── recaptcha/          # reCAPTCHA documentation
│   │   ├── RECAPTCHA_SETUP.md
│   │   ├── SERVER_RECAPTCHA_SETUP.md
│   │   └── DEBUG_TOKEN_GUIDE.md
│   └── firebase/           # Firebase documentation
│       ├── FIREBASE_SETUP.md
│       ├── DEPLOYMENT_GUIDE.md
│       └── MULTI_SITE_SETUP.md
└── firebase.json           # Multi-site configuration
```

## Deployment Commands

### Deploy Main Site Only
```bash
# Deploy to lockard.llc
firebase deploy --only hosting:main
```

### Deploy Docs Site Only
```bash
# Deploy to docs.lockard.llc
firebase deploy --only hosting:docs
```

### Deploy All Sites
```bash
# Deploy both sites
firebase deploy --only hosting
```

### Deploy Everything
```bash
# Deploy hosting + Firebase configs
yarn deploy:all
```

## Local Development

### Start Main Site
```bash
# Start main site (lockard.llc)
yarn dev
# or
firebase serve --only hosting:main
```

### Start Docs Site
```bash
# Start docs site (docs.lockard.llc)
firebase serve --only hosting:docs
```

### Start Both Sites
```bash
# Start both sites simultaneously
firebase serve
```

## Custom Domain Setup

### 1. **Add Domains in Firebase Console**

#### Main Site (lockard.llc)
1. Go to Firebase Console → Hosting
2. Select "lockard-llc" site
3. Click "Add custom domain"
4. Enter `lockard.llc`
5. Follow DNS verification steps

#### Docs Site (docs.lockard.llc)
1. Go to Firebase Console → Hosting
2. Select "docs-lockard-llc" site
3. Click "Add custom domain"
4. Enter `docs.lockard.llc`
5. Follow DNS verification steps

### 2. **Configure DNS Records**

#### For lockard.llc
```dns
A record: lockard.llc → Firebase IP
CNAME: www.lockard.llc → lockard.llc
```

#### For docs.lockard.llc
```dns
A record: docs.lockard.llc → Firebase IP
```

### 3. **Verify SSL Certificates**
- Firebase automatically provisions SSL certificates
- Wait 24-48 hours for certificate validation
- Test HTTPS access to both domains

## Site-Specific Configuration

### Main Site (lockard.llc)
- **Source**: Root directory (`.`)
- **Features**: reCAPTCHA, Firebase App Check, Analytics
- **Content**: Main Lockard LLC website
- **Target**: `main`

### Docs Site (docs.lockard.llc)
- **Source**: `docs/` directory
- **Features**: Documentation, Static content
- **Content**: Technical documentation
- **Target**: `docs`

## Firebase Configuration (firebase.json)

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

## Testing Your Setup

### 1. **Test Local Development**
```bash
# Test main site
firebase serve --only hosting:main
# Visit: http://localhost:5000

# Test docs site
firebase serve --only hosting:docs
# Visit: http://localhost:5000
```

### 2. **Test Deployment**
```bash
# Deploy and test
firebase deploy --only hosting

# Check both sites
# Main: https://lockard-llc.web.app
# Docs: https://docs-lockard-llc.web.app
```

### 3. **Test Custom Domains**
```bash
# Test main domain
curl -I https://lockard.llc

# Test docs domain
curl -I https://docs.lockard.llc
```

## Troubleshooting

### Common Issues

#### **Site Not Loading**
```bash
# Check Firebase configuration
firebase use
firebase projects:list
firebase hosting:sites:list
```

#### **Target Not Found**
```bash
# Re-apply targets
firebase target:apply hosting main lockard-llc
firebase target:apply hosting docs docs-lockard-llc
```

#### **Deployment Fails**
```bash
# Debug deployment
firebase deploy --debug --only hosting
```

### Debug Commands
```bash
# Check hosting configuration
firebase hosting:sites:list

# View deployment history
firebase hosting:channel:list

# Debug specific site
firebase serve --debug --only hosting:main
```

## Best Practices

### 1. **Content Organization**
- Keep main site content in root directory
- Keep documentation in `docs/` directory
- Use clear file naming conventions

### 2. **Deployment Strategy**
- Deploy main site for production updates
- Deploy docs site for documentation updates
- Use `yarn deploy:all` for major releases

### 3. **Monitoring**
- Monitor both sites for performance
- Check SSL certificate status
- Track deployment success rates

## Next Steps

1. **Set up custom domains** in Firebase Console
2. **Configure DNS records** for your domains
3. **Test both sites** locally and in production
4. **Monitor performance** and security

Your Firebase multi-site setup is complete! 🚀
