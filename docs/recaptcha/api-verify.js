const { validateToken } = require('./recaptcha-assessment');

/**
 * Express.js middleware for reCAPTCHA verification
 * Use this in your API routes to verify reCAPTCHA tokens
 */
function verifyRecaptcha(action, minScore = 0.5) {
  return async (req, res, next) => {
    try {
      const token = req.body.recaptcha_token || req.headers['x-recaptcha-token'];
      
      if (!token) {
        return res.status(400).json({
          success: false,
          error: 'reCAPTCHA token is required'
        });
      }

      const result = await validateToken(token, action, minScore);
      
      if (!result.valid) {
        return res.status(400).json({
          success: false,
          error: 'reCAPTCHA verification failed',
          score: result.score,
          reason: result.reason
        });
      }

      // Add the verification result to the request object
      req.recaptcha = {
        valid: true,
        score: result.score,
        action: action
      };

      next();
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error during reCAPTCHA verification'
      });
    }
  };
}

/**
 * Simple verification function for direct use
 * @param {string} token - reCAPTCHA token
 * @param {string} action - Expected action name
 * @param {number} minScore - Minimum acceptable score
 * @returns {Promise<Object>} Verification result
 */
async function verifyRecaptchaToken(token, action, minScore = 0.5) {
  return await validateToken(token, action, minScore);
}

module.exports = {
  verifyRecaptcha,
  verifyRecaptchaToken
};
