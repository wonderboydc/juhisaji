document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Magic Cursor (Lens Effect)
    const cursor = document.querySelector('.custom-cursor');
    const hoverTargets = document.querySelectorAll('.hover-target');
    const pupil = document.querySelector('.pupil');
    const heroVisual = document.querySelector('.hero-visual');

    // Update cursor position smoothly
    let cursorX = 0;
    let cursorY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // We use a small lag effect on the visual follow for the actual mouse events
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate update for cursor
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // Add hover states to interactable elements
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            if(cursor) cursor.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            if(cursor) cursor.classList.remove('hover');
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has become visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Smooth scrolling for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Tracking section navigation
                if (window.va) {
                    window.va('event', { name: 'section_navigation', data: { target: targetId } });
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. LinkedIn Click Tracking
    const linkedinBtn = document.querySelector('a[href*="linkedin.com"]');
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', () => {
            if (window.va) {
                window.va('event', { name: 'linkedin_click' });
            }
        });
    }
});
