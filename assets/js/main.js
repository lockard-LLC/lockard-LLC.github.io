// Lockard LLC Website JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.borderBottom = '1px solid var(--gray-100)';
            }
        }
    });

    // Mobile menu toggle (for future implementation)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Firebase Analytics tracking
    function trackEvent(event, category, additionalData = {}) {
        console.log(`Event: ${event}, Category: ${category}`);
        
        // Track with Firebase Analytics
        if (window.FirebaseAnalytics) {
            window.FirebaseAnalytics.trackEvent(event, {
                category: category,
                ...additionalData,
                timestamp: new Date().toISOString(),
                page_url: window.location.href
            });
        }
    }

    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-ghost').forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            let buttonType = 'secondary';
            if (button.classList.contains('btn-primary')) {
                buttonType = 'primary';
            } else if (button.classList.contains('btn-ghost')) {
                buttonType = 'ghost';
            }

            trackEvent('button_click', 'engagement', {
                button_text: buttonText,
                button_type: buttonType,
                button_href: button.href || button.getAttribute('data-href') || 'none'
            });
        });
    });

    // Track AI Logic interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-ai-suggestion') || 
            e.target.classList.contains('btn-ai-enhancement') || 
            e.target.classList.contains('btn-ai-insights')) {
            
            const aiFeature = e.target.classList.contains('btn-ai-suggestion') ? 'content_suggestions' :
                             e.target.classList.contains('btn-ai-enhancement') ? 'message_assistant' :
                             'research_insights';
            
            trackEvent('ai_feature_used', 'ai_logic', {
                feature: aiFeature,
                button_text: e.target.textContent.trim()
            });
        }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackEvent('scroll_depth', 'engagement', {
                    scroll_percentage: maxScrollDepth
                });
            }
        }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        if (timeOnPage > 5) { // Only track if user spent more than 5 seconds
            trackEvent('time_on_page', 'engagement', {
                time_seconds: timeOnPage
            });
        }
    });

    // Console message for developers
    console.log('✨ Welcome to Lockard LLC. Curious collaborators are always invited to reach out via hello@lockard.llc');
    console.log('🛠️ Building quietly? Let us know what you discover.');
    
});
