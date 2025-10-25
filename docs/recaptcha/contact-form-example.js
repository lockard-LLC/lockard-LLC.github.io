const { verifyRecaptchaToken } = require('./api-verify');

/**
 * Example contact form handler with reCAPTCHA verification
 * This shows how to integrate reCAPTCHA verification into your forms
 */
async function handleContactForm(req, res) {
  try {
    const { name, email, message, recaptcha_token } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptchaToken(
      recaptcha_token, 
      'contact_form', 
      0.5 // Minimum score threshold
    );

    if (!recaptchaResult.valid) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed',
        score: recaptchaResult.score,
        reason: recaptchaResult.reason
      });
    }

    // Process the form submission
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the submission
    
    console.log('Contact form submitted:', {
      name,
      email,
      message: message.substring(0, 100) + '...',
      recaptchaScore: recaptchaResult.score
    });

    // Return success response
    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      recaptchaScore: recaptchaResult.score
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

/**
 * Express.js route example
 * Use this in your Express app
 */
function setupContactRoute(app) {
  app.post('/api/contact', async (req, res) => {
    await handleContactForm(req, res);
  });
}

module.exports = {
  handleContactForm,
  setupContactRoute
};
