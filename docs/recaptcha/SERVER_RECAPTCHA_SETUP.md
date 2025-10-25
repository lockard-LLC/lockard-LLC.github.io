# Server-Side reCAPTCHA Enterprise Setup

## ✅ Installation Complete

The `@google-cloud/recaptcha-enterprise` package has been installed and configured.

## Files Created

### 1. **`firebase/recaptcha-assessment.js`** - Core Assessment Function
- `createAssessment()` - Main function for token validation
- `validateToken()` - Simplified validation wrapper
- Handles token verification and risk scoring

### 2. **`firebase/api-verify.js`** - API Integration
- `verifyRecaptcha()` - Express.js middleware
- `verifyRecaptchaToken()` - Direct verification function
- Error handling and response formatting

### 3. **`firebase/contact-form-example.js`** - Usage Example
- Complete contact form handler
- Express.js route setup
- Real-world implementation example

## Environment Variables

Your `.env` file now includes:
```bash
RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY
GOOGLE_CLOUD_PROJECT_ID=YOUR_GOOGLE_CLOUD_PROJECT_ID
```

## Usage Examples

### Basic Token Verification
```javascript
const { validateToken } = require('./firebase/recaptcha-assessment');

// Verify a token
const result = await validateToken(token, 'contact_form', 0.5);
if (result.valid) {
  console.log('Token is valid, score:', result.score);
} else {
  console.log('Token invalid:', result.reason);
}
```

### Express.js Middleware
```javascript
const { verifyRecaptcha } = require('./firebase/api-verify');

// Protect a route with reCAPTCHA
app.post('/api/contact', 
  verifyRecaptcha('contact_form', 0.5), 
  (req, res) => {
    // req.recaptcha contains verification details
    console.log('Score:', req.recaptcha.score);
    res.json({ success: true });
  }
);
```

### Complete Contact Form Handler
```javascript
const { handleContactForm } = require('./firebase/contact-form-example');

// Use the pre-built handler
app.post('/api/contact', handleContactForm);
```

## Frontend Integration

### HTML Form with reCAPTCHA
```html
<form id="contact-form">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit" id="submit-button">Send Message</button>
</form>

<script>
// Bind reCAPTCHA to form submission
LockardRecaptcha.bind('#submit-button', 'contact_form', async (token) => {
  const form = document.getElementById('contact-form');
  const formData = new FormData(form);
  formData.append('recaptcha_token', token);
  
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  if (result.success) {
    alert('Message sent successfully!');
  } else {
    alert('Error: ' + result.error);
  }
});
</script>
```

## Security Features

### Risk Scoring
- **Score 0.0-1.0**: Higher scores indicate more legitimate traffic
- **Recommended threshold**: 0.5 for most use cases
- **High-risk threshold**: 0.3 for sensitive operations

### Token Validation
- **Action verification**: Ensures token matches expected action
- **Token expiration**: Automatic handling of expired tokens
- **Invalid token detection**: Identifies and rejects invalid tokens

### Error Handling
- **Graceful failures**: System continues working if reCAPTCHA fails
- **Detailed logging**: Comprehensive error messages for debugging
- **Rate limiting**: Built-in protection against abuse

## Next Steps

### 1. **Get Your Secret Key**
Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) to get your secret key and update your `.env` file.

### 2. **Set Up Google Cloud Authentication**
```bash
# Set up Application Default Credentials
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account.json"
```

### 3. **Test the Integration**
```bash
# Test locally
yarn dev

# Test with a real form submission
curl -X POST http://localhost:5000/api/contact \
  -d "name=Test&email=test@example.com&message=Test message&recaptcha_token=YOUR_TOKEN"
```

### 4. **Deploy to Production**
```bash
# Deploy your updated code
yarn deploy
```

## Troubleshooting

### Common Issues:
- **"Authentication failed"**: Check your Google Cloud credentials
- **"Invalid project ID"**: Verify `GOOGLE_CLOUD_PROJECT_ID` in `.env`
- **"Token validation failed"**: Check if frontend is sending correct token

### Debug Mode:
```javascript
// Enable detailed logging
process.env.DEBUG = 'recaptcha:*';
```

Your server-side reCAPTCHA Enterprise integration is now complete! 🛡️
