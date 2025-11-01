document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- PAGE LOAD ANIMATION ---
    const timeline = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: 'power3.out'
        }
    });

    timeline
        .from('.nav', {
            y: -100,
            opacity: 0
        })
        .from('.hero-badge', {
            y: 30,
            opacity: 0,
            stagger: 0.15
        }, '-=0.5')
        .from('.hero-title', {
            y: 50,
            opacity: 0
        }, '-=0.6')
        .from('.hero-description', {
            y: 50,
            opacity: 0
        }, '-=0.7')
        .from('.hero-actions .btn', {
            y: 30,
            opacity: 0,
            stagger: 0.1
        }, '-=0.7')
        .from('.hero-metrics .metric', {
            y: 30,
            opacity: 0,
            stagger: 0.1
        }, '-=0.6')
        .from('.hero-preview .preview-card', {
            y: 50,
            opacity: 0,
            stagger: 0.15
        }, '-=0.8')
        .from('.floating-pill', {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.75)'
        }, '-=0.5');


    // --- SCROLL-TRIGGERED ANIMATIONS ---
    const revealElements = gsap.utils.toArray('.reveal');

    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate cards on scroll
    const cards = gsap.utils.toArray('.card, .focus-card, .principle-card, .paw-card');
    cards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Focus card icon flourish when revealed
    const focusCards = gsap.utils.toArray('.focus-card');
    focusCards.forEach((card, i) => {
        const icon = card.querySelector('.focus-icon');
        gsap.fromTo(icon || {},
            { y: -6, rotation: -6, scale: 0.92, opacity: 0 },
            {
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.9,
                ease: 'elastic.out(1, 0.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    toggleActions: 'play none none none'
                },
                delay: i * 0.06
            }
        );
    });

    // SafePaws stat list animation
    const safepawsStats = gsap.utils.toArray('.safepaws-stats li');
    safepawsStats.forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 95%'
            },
            x: -24,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: (i % 3) * 0.08
        });
    });

    // SafePaws cards animations
    const pawCards = gsap.utils.toArray('.paw-card');
    pawCards.forEach((card, i) => {
        const icon = card.querySelector('.paw-icon');
        const highlights = card.querySelectorAll('.paw-highlights li');

        if (icon) {
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%'
                },
                y: 18,
                scale: 0.85,
                rotation: -6,
                opacity: 0,
                duration: 0.85,
                ease: 'back.out(1.6)',
                delay: i * 0.06
            });
        }

        if (highlights.length) {
            gsap.from(highlights, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%'
                },
                opacity: 0,
                y: 12,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.2
            });
        }
    });

    // --- MICRO-INTERACTIONS ---
    // Card hover effect
    const hoverCards = gsap.utils.toArray('.card, .focus-card, .principle-card, .preview-card, .paw-card');
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});
