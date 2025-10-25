const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const { isDebugToken, extractActionFromDebugToken } = require('./debug-token-setup');

/**
 * Create an assessment to analyze the risk of a UI action.
 * 
 * @param {Object} params - Assessment parameters
 * @param {string} params.projectID - Your Google Cloud Project ID
 * @param {string} params.recaptchaSiteKey - The reCAPTCHA key associated with the site/app
 * @param {string} params.token - The generated token obtained from the client
 * @param {string} params.recaptchaAction - Action name corresponding to the token
 * @returns {Promise<number|null>} Risk score (0.0-1.0) or null if invalid
 */
async function createAssessment({
  projectID = "YOUR_PROJECT_ID",
  recaptchaSiteKey = "YOUR_RECAPTCHA_SITE_KEY",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  try {
    // Handle debug tokens in development
    if (isDebugToken(token)) {
      console.log('🔧 Using debug token for development');
      const debugAction = extractActionFromDebugToken(token);
      
      // Simulate a successful assessment for debug tokens
      return {
        score: 0.9, // High score for debug tokens
        valid: true,
        action: debugAction,
        isDebug: true
      };
    }

    // Create the reCAPTCHA client
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaSiteKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    // Check if the token is valid
    if (!response.tokenProperties.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
      return null;
    }

    // Check if the expected action was executed
    if (response.tokenProperties.action === recaptchaAction) {
      // Get the risk score and the reason(s)
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      
      if (response.riskAnalysis.reasons && response.riskAnalysis.reasons.length > 0) {
        response.riskAnalysis.reasons.forEach((reason) => {
          console.log(`Risk reason: ${reason}`);
        });
      }

      return response.riskAnalysis.score;
    } else {
      console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
      return null;
    }
  } catch (error) {
    console.error('Error creating reCAPTCHA assessment:', error);
    return null;
  }
}

/**
 * Validate a reCAPTCHA token with a specific action
 * 
 * @param {string} token - The reCAPTCHA token from the client
 * @param {string} action - The expected action name
 * @param {number} minScore - Minimum acceptable score (default: 0.5)
 * @returns {Promise<Object>} Validation result with score and validity
 */
async function validateToken(token, action, minScore = 0.5) {
  const score = await createAssessment({
    projectID: "YOUR_PROJECT_ID",
    recaptchaSiteKey: "YOUR_RECAPTCHA_SITE_KEY",
    token: token,
    recaptchaAction: action,
  });

  if (score === null) {
    return {
      valid: false,
      score: 0,
      reason: 'Invalid token or assessment failed'
    };
  }

  const isValid = score >= minScore;
  
  return {
    valid: isValid,
    score: score,
    reason: isValid ? 'Token validated successfully' : `Score too low: ${score} < ${minScore}`
  };
}

module.exports = {
  createAssessment,
  validateToken
};
