# Firebase Deployment Guide

## Deployment Overview

This guide covers deploying both the main Lockard LLC site and the documentation site using Firebase Hosting.

> **Default project:** Commands assume the CLI is pointed at the `lockard-llc-business` project defined in `.firebaserc`. Use `firebase use <project-id>` if you are targeting a different environment.

## Pre-Deployment Checklist

### 1. **Verify Firebase Configuration**
```bash
# Check active project
firebase use

# Verify project settings
firebase projects:list
```

### 2. **Test Local Builds**
```bash
# Test main site
yarn dev

# Test docs site
firebase serve --only hosting:docs
```

### 3. **Check Environment Variables**
- ✅ Firebase credentials are set
- ✅ reCAPTCHA keys are configured
- ✅ Debug tokens are ready (development only)

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

## Site-Specific Deployment

### Main Site (lockard.llc)
- **Source**: Root directory
- **Target**: `main`
- **Domain**: `lockard.llc`
- **Features**: reCAPTCHA, Firebase App Check, Analytics

### Docs Site (docs.lockard.llc)
- **Source**: `docs/` directory
- **Target**: `docs`
- **Domain**: `docs.lockard.llc`
- **Features**: Documentation, Static content

## Custom Domain Setup

### 1. **Add Domains in Firebase Console**
1. Go to Firebase Console → Hosting
2. Select your site
3. Click "Add custom domain"
4. Enter your domain (e.g., `docs.lockard.llc`)

### 2. **Configure DNS Records**
```dns
# For lockard.llc
A record: lockard.llc → Firebase IP
CNAME: www.lockard.llc → lockard.llc

# For docs.lockard.llc
A record: docs.lockard.llc → Firebase IP
```

### 3. **Verify SSL Certificates**
- Firebase automatically provisions SSL certificates
- Wait for certificate validation (usually 24-48 hours)
- Test HTTPS access to both domains

## Environment-Specific Deployments

### Development
```bash
# Local development
yarn dev

# Test with Firebase emulators
firebase emulators:start
```

### Staging
```bash
# Deploy to staging (if configured)
firebase deploy --only hosting --project staging-project
```

### Production
```bash
# Deploy to production
firebase deploy --only hosting --project lockard-llc-business
```

## Monitoring and Maintenance

### 1. **Check Deployment Status**
```bash
# View deployment history
firebase hosting:channel:list

# Check site status
firebase hosting:sites:list
```

### 2. **Monitor Performance**
- Use Firebase Analytics for main site
- Check Firebase Console for errors
- Monitor SSL certificate status

### 3. **Update Content**
```bash
# Update main site
firebase deploy --only hosting:main

# Update docs site
firebase deploy --only hosting:docs
```

## Troubleshooting

### Common Deployment Issues

#### **Site Not Loading**
```bash
# Check Firebase configuration
firebase use
firebase projects:list

# Verify site targets
firebase hosting:sites:list
```

#### **SSL Certificate Issues**
- Wait 24-48 hours for certificate provisioning
- Check DNS records are correct
- Verify domain ownership in Firebase Console

#### **Build Failures**
```bash
# Check for syntax errors
firebase deploy --debug

# Verify file permissions
ls -la docs/
```

### Debug Commands
```bash
# Debug hosting configuration
firebase serve --debug

# Check Firebase CLI version
firebase --version

# View detailed logs
firebase deploy --debug --verbose
```

## Security Considerations

### 1. **Environment Variables**
- Never commit `.env` files
- Use Firebase environment config for production
- Rotate keys regularly

### 2. **Access Control**
- Limit Firebase Console access
- Use service accounts for CI/CD
- Monitor deployment logs

### 3. **SSL/TLS**
- Enable HTTPS for all sites
- Monitor certificate expiration
- Use HSTS headers

## Best Practices

### 1. **Version Control**
- Tag releases before deployment
- Keep deployment logs
- Document configuration changes

### 2. **Testing**
- Test locally before deploying
- Use staging environment if available
- Verify all features work in production

### 3. **Monitoring**
- Set up alerts for deployment failures
- Monitor site performance
- Track error rates

Your Firebase deployment setup is ready! 🚀
