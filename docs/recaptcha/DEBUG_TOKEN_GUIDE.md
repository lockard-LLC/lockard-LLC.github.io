# reCAPTCHA Enterprise Debug Token Guide

## Your Debug Token: `30E669DE-0F5A-4169-9609-9211376F20A2`

This debug token allows you to test reCAPTCHA functionality during development without triggering real assessments or incurring charges.

## ✅ Setup Complete

Your debug token has been added to your environment variables and is ready to use!

## How to Use Your Debug Token

### 1. **Frontend Integration (JavaScript)**

```javascript
// In your frontend code, use the debug token for testing
const debugToken = '30E669DE-0F5A-4169-9609-9211376F20A2';

// For testing contact forms
LockardRecaptcha.bind('#submit-button', 'contact_form', async (token) => {
  // In development, you can use the debug token directly
  const testToken = `${debugToken}:contact_form`;
  
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
      recaptcha_token: testToken
    })
  });
  
  const result = await response.json();
  console.log('Form submission result:', result);
});
```

### 2. **Backend Testing (Node.js)**

```javascript
const { validateToken } = require('./firebase/recaptcha-assessment');

// Test with debug token
async function testDebugToken() {
  const debugToken = '30E669DE-0F5A-4169-9609-9211376F20A2:contact_form';
  
  const result = await validateToken(debugToken, 'contact_form', 0.5);
  
  console.log('Debug token validation:', result);
  // Output: { valid: true, score: 0.9, reason: 'Token validated successfully' }
}

testDebugToken();
```

### 3. **Express.js Route Testing**

```javascript
const { handleContactForm } = require('./firebase/contact-form-example');

// Test your contact form with debug token
app.post('/api/contact', async (req, res) => {
  // Add debug token for testing
  if (process.env.NODE_ENV === 'development') {
    req.body.recaptcha_token = '30E669DE-0F5A-4169-9609-9211376F20A2:contact_form';
  }
  
  await handleContactForm(req, res);
});
```

## Debug Token Features

### **Automatic Detection**
- ✅ Debug tokens are automatically detected in development
- ✅ High score (0.9) assigned to debug tokens
- ✅ No real reCAPTCHA API calls made
- ✅ Detailed logging for debugging

### **Action Simulation**
- ✅ Format: `30E669DE-0F5A-4169-9609-9211376F20A2:action_name`
- ✅ Supports any action name (e.g., `contact_form`, `login`, `signup`)
- ✅ Action validation works as expected

### **Development Safety**
- ✅ Only works in development environment
- ✅ Automatically disabled in production
- ✅ No charges incurred during testing

## Testing Your Integration

### 1. **Start Development Server**
```bash
yarn dev
```

### 2. **Test Frontend Integration**
```javascript
// Open browser console and test
const debugToken = '30E669DE-0F5A-4169-9609-9211376F20A2:contact_form';

// Test form submission
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message',
    recaptcha_token: debugToken
  })
})
.then(response => response.json())
.then(result => console.log('Success:', result));
```

### 3. **Test Backend Validation**
```bash
# Test with curl
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "Test message",
    "recaptcha_token": "30E669DE-0F5A-4169-9609-9211376F20A2:contact_form"
  }'
```

## Debug Token Format

### **Basic Format**
```
30E669DE-0F5A-4169-9609-9211376F20A2
```

### **With Action**
```
30E669DE-0F5A-4169-9609-9211376F20A2:contact_form
30E669DE-0F5A-4169-9609-9211376F20A2:login
30E669DE-0F5A-4169-9609-9211376F20A2:signup
```

## Important Notes

### ⚠️ **Development Only**
- Debug tokens should **NEVER** be used in production
- They bypass real reCAPTCHA verification
- Only use for local development and testing

### 🔒 **Security**
- Keep your debug token private
- Don't commit it to version control
- Use environment variables to store it

### 🚀 **Production Deployment**
- Remove debug token before deploying
- Use real reCAPTCHA tokens in production
- Test with real tokens before going live

## Troubleshooting

### **Debug Token Not Working**
```javascript
// Check if debug token is set
console.log('Debug token:', process.env.RECAPTCHA_DEBUG_TOKEN);

// Verify environment
console.log('Environment:', process.env.NODE_ENV);
```

### **Token Validation Failing**
```javascript
// Check token format
const token = '30E669DE-0F5A-4169-9609-9211376F20A2:contact_form';
console.log('Token format correct:', token.includes('30E669DE-0F5A-4169-9609-9211376F20A2'));
```

Your debug token is now ready for testing! 🧪
