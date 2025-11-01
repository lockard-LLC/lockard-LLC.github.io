/**
 * Firebase AI Logic Integration for Lockard LLC
 * Clean, consolidated implementation
 */

// Global variables for AI Logic
let firebaseApp = null;
let ai = null;
let models = {};

// Initialize Firebase AI Logic
async function initializeAILogic() {
    try {
        // Wait for Firebase config to be available
        if (typeof window.__FIREBASE_CONFIG__ === 'undefined') {
            console.log('Waiting for Firebase config...');
            setTimeout(initializeAILogic, 100);
            return;
        }

        const firebaseConfig = window.__FIREBASE_CONFIG__;
        
        // Import Firebase modules dynamically
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getAI, getGenerativeModel, GoogleAIBackend } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-ai.js');

        // Initialize Firebase
        firebaseApp = initializeApp(firebaseConfig);
        
        // Initialize AI Logic service
        ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
        
        // Create model instances
        models = {
            flash: getGenerativeModel(ai, { model: "gemini-2.5-flash" }),
            pro: getGenerativeModel(ai, { model: "gemini-2.5-pro" })
        };
        
        console.log('Firebase AI Logic initialized successfully');
        
        // Track AI Logic initialization
        if (window.FirebaseAnalytics) {
            window.FirebaseAnalytics.trackEvent('ai_logic_initialized', 'ai_logic', {
                model: 'gemini-2.5-flash',
                timestamp: new Date().toISOString()
            });
        }
        
        // Initialize AI-powered features
        initializeAIFeatures();
        
    } catch (error) {
        console.error('Error initializing Firebase AI Logic:', error);
    }
}

// AI-powered features for the website
function initializeAIFeatures() {
    // Add AI-powered content suggestions
    addAIContentSuggestions();
    
    // Add AI-powered contact form enhancement
    addAIContactEnhancement();
    
    // Add AI-powered research insights
    addAIResearchInsights();
}

// AI-powered content suggestions
function addAIContentSuggestions() {
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        const aiSuggestionBtn = document.createElement('button');
        aiSuggestionBtn.className = 'btn-ai-suggestion';
        aiSuggestionBtn.innerHTML = `
            <span>🤖</span>
            <span>Explore AI Insights</span>
        `;
        aiSuggestionBtn.addEventListener('click', showAIContentSuggestions);
        heroActions.appendChild(aiSuggestionBtn);
    }
}

// Show AI content suggestions modal
async function showAIContentSuggestions() {
    const modal = createAIModal('AI-Powered Insights', 'Discover personalized insights about human-centered software development');
    
    const prompt = `Based on the Lockard LLC website content about human-centered software, mindful technology, and collaborative tooling, provide 3 thoughtful insights about:
1. Emerging trends in human-centered software development
2. Best practices for mindful technology implementation
3. Strategies for building resilient development teams

Keep responses concise and actionable, focusing on practical insights that align with thoughtful software development.`;
    
    try {
        const result = await models.flash.generateContent(prompt);
        const insights = result.response.text();
        
        // Track successful AI generation
        if (window.FirebaseAnalytics) {
            window.FirebaseAnalytics.trackEvent('ai_content_suggestions_generated', 'ai_logic', {
                feature: 'content_suggestions',
                success: true,
                response_length: insights.length
            });
        }
        
        modal.querySelector('.ai-content').innerHTML = `
            <div class="ai-insights">
                <h3>Personalized Insights for Your Practice</h3>
                <div class="insights-content">${formatAIResponse(insights)}</div>
            </div>
        `;
    } catch (error) {
        // Track AI generation error
        if (window.FirebaseAnalytics) {
            window.FirebaseAnalytics.trackEvent('ai_content_suggestions_error', 'ai_logic', {
                feature: 'content_suggestions',
                success: false,
                error: error.message
            });
        }
        
        modal.querySelector('.ai-content').innerHTML = `
            <div class="ai-error">
                <p>Unable to generate insights at this time. Please try again later.</p>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
}

// AI-powered contact form enhancement
function addAIContactEnhancement() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const aiEnhancementBtn = document.createElement('button');
        aiEnhancementBtn.className = 'btn-ai-enhancement';
        aiEnhancementBtn.innerHTML = `
            <span>✨</span>
            <span>AI Message Assistant</span>
        `;
        aiEnhancementBtn.addEventListener('click', showAIMessageAssistant);
        contactForm.appendChild(aiEnhancementBtn);
    }
}

// Show AI message assistant
async function showAIMessageAssistant() {
    const modal = createAIModal('AI Message Assistant', 'Get help crafting your message to Lockard LLC');
    
    const prompt = `Help someone write a professional, thoughtful email to Lockard LLC about potential collaboration. The email should:
1. Be concise but warm
2. Show understanding of their human-centered approach
3. Clearly state the collaboration interest
4. Maintain a professional yet personal tone
5. Be specific about what they're working on

Provide a template that someone can customize.`;
    
    try {
        const result = await models.flash.generateContent(prompt);
        const messageTemplate = result.response.text();
        
        modal.querySelector('.ai-content').innerHTML = `
            <div class="ai-message-assistant">
                <h3>Message Template</h3>
                <div class="message-template">${formatAIResponse(messageTemplate)}</div>
                <div class="ai-actions">
                    <button onclick="copyToClipboard(this.previousElementSibling.textContent)" class="btn-copy">Copy Template</button>
                    <button onclick="this.closest('.ai-modal').remove()" class="btn-close">Close</button>
                </div>
            </div>
        `;
    } catch (error) {
        modal.querySelector('.ai-content').innerHTML = `
            <div class="ai-error">
                <p>Unable to generate message template at this time. Please try again later.</p>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
}

// AI-powered research insights
function addAIResearchInsights() {
    const researchSection = document.querySelector('.highlight:first-child');
    if (researchSection) {
        const aiInsightsBtn = document.createElement('button');
        aiInsightsBtn.className = 'btn-ai-insights';
        aiInsightsBtn.innerHTML = `
            <span>🔬</span>
            <span>AI Research Insights</span>
        `;
        aiInsightsBtn.addEventListener('click', showAIResearchInsights);
        researchSection.appendChild(aiInsightsBtn);
    }
}

// Show AI research insights
async function showAIResearchInsights() {
    const modal = createAIModal('AI Research Insights', 'Explore AI-generated insights about software development research');
    
    const prompt = `Based on Lockard LLC's focus on research and insights about how teams adopt new workflows, measure success, and maintain healthy cadence, provide:
1. Current trends in software development research
2. Emerging methodologies for measuring team success
3. Best practices for maintaining healthy development cadence
4. Future directions in human-centered software research

Keep insights practical and relevant to software teams.`;
    
    try {
        const result = await models.pro.generateContent(prompt);
        const insights = result.response.text();
        
        modal.querySelector('.ai-content').innerHTML = `
            <div class="ai-research-insights">
                <h3>Research Insights</h3>
                <div class="insights-content">${formatAIResponse(insights)}</div>
            </div>
        `;
    } catch (error) {
        modal.querySelector('.ai-content').innerHTML = `
            <div class="ai-error">
                <p>Unable to generate research insights at this time. Please try again later.</p>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
}

// Create AI modal
function createAIModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'ai-modal';
    modal.innerHTML = `
        <div class="ai-modal-overlay">
            <div class="ai-modal-content">
                <div class="ai-modal-header">
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <button class="ai-modal-close" onclick="this.closest('.ai-modal').remove()">×</button>
                </div>
                <div class="ai-content">
                    <div class="ai-loading">
                        <div class="ai-spinner"></div>
                        <p>Generating insights...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .ai-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .ai-modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .ai-modal-content {
            background: var(--bg-secondary, rgba(15, 23, 42, 0.95));
            border: 1px solid var(--border-color, rgba(148, 163, 184, 0.35));
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            backdrop-filter: blur(20px);
        }
        
        .ai-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
        }
        
        .ai-modal-header h2 {
            margin: 0;
            color: var(--text-primary, #f8fafc);
        }
        
        .ai-modal-header p {
            margin: 0.5rem 0 0 0;
            color: var(--text-secondary, #cbd5f5);
        }
        
        .ai-modal-close {
            background: none;
            border: none;
            color: var(--text-primary, #f8fafc);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .ai-loading {
            text-align: center;
            padding: 2rem;
        }
        
        .ai-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color, rgba(148, 163, 184, 0.35));
            border-top: 3px solid var(--accent, #57e4ff);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .ai-insights, .ai-message-assistant, .ai-research-insights {
            color: var(--text-primary, #f8fafc);
        }
        
        .insights-content, .message-template {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border-color, rgba(148, 163, 184, 0.35));
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            white-space: pre-wrap;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
        }
        
        .ai-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .btn-copy, .btn-close {
            background: linear-gradient(135deg, var(--primary, #356bff), var(--secondary, #7c5cff));
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
        }
        
        .ai-error {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            padding: 1rem;
            border-radius: 8px;
        }
        
        .btn-ai-suggestion, .btn-ai-enhancement, .btn-ai-insights {
            background: rgba(87, 228, 255, 0.12);
            border: 1px solid rgba(87, 228, 255, 0.35);
            color: var(--accent, #57e4ff);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }
        
        .btn-ai-suggestion:hover, .btn-ai-enhancement:hover, .btn-ai-insights:hover {
            background: rgba(87, 228, 255, 0.22);
            transform: translateY(-1px);
        }
    `;
    
    document.head.appendChild(style);
    
    return modal;
}

// Format AI response for better display
function formatAIResponse(text) {
    return text
        .replace(/\n\n/g, '\n\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeAILogic();
});

// Export for global access
window.AILogic = {
    initializeAILogic,
    showAIContentSuggestions,
    showAIMessageAssistant,
    showAIResearchInsights
};
