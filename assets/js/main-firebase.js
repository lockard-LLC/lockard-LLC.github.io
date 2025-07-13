// Lockard LLC Website JavaScript with Firebase Integration

// Import comprehensive Firebase services
import LockardServices from './firebase-services.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', async function() {
    
    // Wait for Firebase services to initialize
    while (!LockardServices.initialized) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Track page view with enhanced data
    LockardServices.trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
    });
    
    // Listen for config changes
    LockardServices.onChange((newConfig) => {
        console.log('🔄 Configuration updated:', newConfig);
        applyDynamicChanges(newConfig);
    });
    
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
                
                // Track scroll events
                LockardServices.trackEvent('scroll_to_section', {
                    section: this.getAttribute('href'),
                    from_page: window.location.pathname
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
            LockardServices.trackEvent('mobile_menu_toggle', {
                page: window.location.pathname,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Enhanced button interactions with Firebase tracking
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const isExternal = this.href && (this.href.startsWith('mailto:') || this.href.includes('vibestudio.online') || this.href.startsWith('http'));
            
            // Track button clicks with comprehensive Firebase Analytics
            LockardServices.trackEvent('button_click', {
                button_text: buttonText,
                button_type: this.classList.contains('btn-primary') ? 'primary' : 'secondary',
                is_external: isExternal,
                page_section: getPageSection(this),
                page_url: window.location.href,
                click_coordinates: `${event.clientX},${event.clientY}`,
                timestamp: new Date().toISOString()
            });
            
            // Don't animate external links
            if (isExternal) {
                return;
            }
            
            // Loading animation for internal navigation
            const originalText = this.textContent;
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        });
    });

    // Enhanced Intersection Observer with Firebase tracking
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Track section views
                const sectionId = entry.target.closest('section')?.id;
                if (sectionId) {
                    LockardConfig.trackEvent('section_view', {
                        section_id: sectionId
                    });
                }
            }
        });
    }, observerOptions);

    // Observe cards for fade-in animation
    document.querySelectorAll('.about-card, .highlight').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Dynamic theme switching based on time of day or user preference
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px;
        border-radius: 50%; border: none; background: var(--primary);
        color: white; font-size: 1.5rem; cursor: pointer; z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', () => {
        toggleDarkMode();
        LockardConfig.trackEvent('theme_toggle', {
            new_theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        });
    });
    
    // Only show theme toggle if enabled in remote config
    if (LockardConfig.get('enable_dark_mode')) {
        document.body.appendChild(themeToggle);
    }

    // A/B Testing implementation
    const heroVariant = LockardConfig.getVariant('hero');
    const ctaVariant = LockardConfig.getVariant('cta');
    
    applyABTestVariants(heroVariant, ctaVariant);

    // Console messages for developers
    console.log('🎵 Welcome to Lockard LLC! Interested in joining our team? Email us at hello@lockard.llc');
    console.log('💻 We love developers who view source! Check out our open positions.');
    console.log('🔥 Firebase Remote Config active - UI elements are dynamically configurable!');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            LockardConfig.trackEvent('page_load_time', {
                load_time_ms: loadTime,
                page_url: window.location.href
            });
        });
    }
});

// Helper Functions

function getPageSection(element) {
    const section = element.closest('section');
    return section ? section.id || section.className : 'unknown';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('button[style*="fixed"]');
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDark);
}

function applyDynamicChanges(config) {
    // Update any dynamic content that changed
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && config.hero_title) {
        heroTitle.innerHTML = config.hero_title.replace(/\n/g, '<br>');
    }
    
    // Update CTA buttons dynamically
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        if (btn.textContent.includes('Launch') || btn.textContent.includes('Try')) {
            btn.textContent = config.cta_text;
        }
    });
}

function applyABTestVariants(heroVariant, ctaVariant) {
    // Hero A/B Test
    if (heroVariant === 'emotional') {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = 'Feel the Future of<br><span class="text-gradient">Coding</span>';
        }
    }
    
    // CTA A/B Test
    if (ctaVariant === 'urgent') {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        ctaButtons.forEach(btn => {
            if (btn.textContent.includes('Launch') || btn.textContent.includes('Try')) {
                btn.textContent = 'Start Now - Limited Beta';
                btn.style.animation = 'pulse 2s infinite';
            }
        });
    }
    
    // Track A/B test participation
    LockardConfig.trackEvent('ab_test_view', {
        hero_variant: heroVariant,
        cta_variant: ctaVariant
    });
}

// Admin Panel (if enabled)
if (LockardConfig.get('show_beta_features')) {
    const adminPanel = document.createElement('div');
    adminPanel.innerHTML = `
        <div id="admin-panel" style="
            position: fixed; top: 10px; left: 10px; background: white;
            border: 1px solid #ccc; padding: 1rem; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;
            font-family: monospace; font-size: 12px; max-width: 300px;
        ">
            <h4>🔧 Admin Panel</h4>
            <button onclick="LockardConfig.trackEvent('admin_refresh')">Refresh Config</button>
            <button onclick="toggleDarkMode()">Toggle Theme</button>
            <div>Version: ${LockardConfig.get('version') || '1.0.0'}</div>
        </div>
    `;
    document.body.appendChild(adminPanel);
}

// Export for global access
window.LockardWebsite = {
    config: LockardConfig,
    toggleDarkMode,
    applyDynamicChanges
};