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

    // Add loading animation to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            // Skip visual feedback for mailto and external links
            if (!this.href || this.href.startsWith('mailto:') || this.href.startsWith('http')) {
                return;
            }
            
            const originalText = this.textContent;
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        });
    });

    // Simple analytics tracking
    function trackEvent(event, category) {
        console.log(`Event: ${event}, Category: ${category}`);
        // Add your analytics tracking here (Google Analytics, etc.)
    }

    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', (e) => {
            trackEvent('button_click', e.target.textContent.trim());
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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

    // Console message for developers
    console.log('✨ Welcome to Lockard LLC. Curious collaborators are always invited to reach out via hello@lockard.llc');
    console.log('🛠️ Building quietly? Let us know what you discover.');
    
});
