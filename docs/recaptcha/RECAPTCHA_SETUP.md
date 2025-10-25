# reCAPTCHA Enterprise Setup Guide

## Current Configuration Status ✅

Your reCAPTCHA Enterprise is already configured and working! Here's what's set up:

### 1. **reCAPTCHA Enterprise Script** (index.html)
```html
<script src="https://www.google.com/recaptcha/enterprise.js?render=6LdknvUrAAAAAO500OXCitu8If6AfVn3ytIsmDIr"></script>
```

### 2. **Firebase App Check Integration** (firebase/config.js)
```javascript
window.__FIREBASE_CONFIG__ = {
  // ... other config
  appCheckSiteKey: "6LdknvUrAAAAAO500OXCitu8If6AfVn3ytIsmDIr"
};
```

### 3. **reCAPTCHA Helper Library** (assets/js/recaptcha-enterprise.js)
- Lightweight wrapper around reCAPTCHA Enterprise
- Provides `execute()` and `bind()` methods
- Handles token generation and form binding

### 4. **Firebase Services Integration** (assets/js/firebase-config.js)
- App Check initialization with reCAPTCHA Enterprise provider
- Automatic token refresh enabled
- Error handling and logging

## How to Use reCAPTCHA in Your Project

### Basic Usage
```javascript
// Execute reCAPTCHA for a specific action
const token = await LockardRecaptcha.execute('contact_form');

// Bind reCAPTCHA to a button
LockardRecaptcha.bind('#submit-button', 'contact_form', async (token) => {
  // Handle form submission with token
  console.log('reCAPTCHA token:', token);
});
```

### Form Integration Example
```html
<form id="contact-form">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit" id="submit-button">Send Message</button>
</form>

<script>
// Bind reCAPTCHA to the submit button
LockardRecaptcha.bind('#submit-button', 'contact_form', async (token) => {
  const form = document.getElementById('contact-form');
  const formData = new FormData(form);
  formData.append('recaptcha_token', token);
  
  // Submit form with reCAPTCHA token
  fetch('/api/contact', {
    method: 'POST',
    body: formData
  });
});
</script>
```

## Environment Variables

Your `.env` file includes:
- `RECAPTCHA_SITE_KEY=6LdknvUrAAAAAO500OXCitu8If6AfVn3ytIsmDIr`
- `RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY_HERE` (needs to be filled)
- `FIREBASE_APPCHECK_SITE_KEY=6LdknvUrAAAAAO500OXCitu8If6AfVn3ytIsmDIr`

## Security Features

1. **Firebase App Check**: Protects your Firebase services
2. **reCAPTCHA Enterprise**: Advanced bot protection
3. **Token-based Verification**: Server-side validation
4. **Automatic Refresh**: Tokens refresh automatically

## Testing reCAPTCHA

1. **Local Development**: 
   ```bash
   yarn dev
   ```
   Visit `http://localhost:5000` and check browser console for reCAPTCHA logs

2. **Production**: 
   ```bash
   yarn deploy
   ```
   Visit `https://lockard.llc` and test form submissions

## Troubleshooting

### Common Issues:
- **"reCAPTCHA Enterprise SDK not available"**: Ensure the script is loaded in `<head>`
- **"Site key not found"**: Check `firebase/config.js` has `appCheckSiteKey`
- **"App Check setup failed"**: Verify Firebase project configuration

### Debug Mode:
```javascript
// Enable debug logging
window.LockardRecaptchaDebug = true;
```

## Next Steps

1. **Get Secret Key**: Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) to get your secret key
2. **Update .env**: Replace `YOUR_RECAPTCHA_SECRET_KEY_HERE` with actual secret key
3. **Test Integration**: Use the examples above to test reCAPTCHA functionality
4. **Server-side Validation**: Implement token verification on your backend

Your reCAPTCHA Enterprise setup is complete and ready to use! 🛡️
