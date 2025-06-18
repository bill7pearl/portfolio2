// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    bindEvents() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Magnetic Effect Class
class MagneticEffect {
    constructor() {
        this.magneticElements = document.querySelectorAll('.magnetic');
        this.init();
    }

    init() {
        this.magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, element));
        });
    }

    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
            duration: 0.3,
            x: x * 0.1,
            y: y * 0.1,
            ease: "power2.out"
        });
    }

    handleMouseLeave(e, element) {
        gsap.to(element, {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: "power2.out"
        });
    }
}

// Smooth Scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on nav links
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.menuToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.menuToggle.classList.add('active');
        this.navMenu.classList.add('active');
        
        // Add liquid expand animation
        this.navMenu.classList.add('liquid-expand');
        this.navMenu.classList.remove('liquid-shrink');
        
        // Animate menu toggle
        const spans = this.menuToggle.querySelectorAll('span');
        gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3, ease: "power2.out" });
        gsap.to(spans[1], { opacity: 0, scale: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3, ease: "power2.out" });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isOpen = false;
        this.menuToggle.classList.remove('active');
        
        // Add liquid shrink animation
        this.navMenu.classList.remove('liquid-expand');
        this.navMenu.classList.add('liquid-shrink');
        
        // Animate menu toggle
        const spans = this.menuToggle.querySelectorAll('span');
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(spans[1], { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3, ease: "power2.out" });

        // Remove active class after animation
        setTimeout(() => {
            this.navMenu.classList.remove('active');
            this.navMenu.classList.remove('liquid-shrink');
        }, 300);

        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupParallaxEffects();
        this.setupNavbarAnimations();
    }

    setupHeroAnimations() {
        // Hero entrance animations
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        })
        .from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, '-=0.4')
        .from('.hero-actions', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, '-=0.4')
        .from('.hero-visual', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.out"
        }, '-=0.6')
        .from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, '-=0.4');
    }

    setupScrollAnimations() {
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        // About section - enhanced animations
        const aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        aboutTimeline
            .from('.animate-avatar', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.out'
            })
            .from('.animate-about', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.animate-stats', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.4')
            .from('.stat-item', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out'
            }, '-=0.5');

        // Animate highlights
        gsap.utils.toArray('.highlight').forEach((el, i) => {
            gsap.fromTo(el, {
                opacity: 0,
                filter: 'blur(4px)'
            }, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                filter: 'blur(0)',
                duration: 0.7,
                delay: i * 0.05,
                ease: 'power2.out'
            });
        });

        // Animated count-up for stats
        ScrollTrigger.create({
            trigger: '.about-stats',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                document.querySelectorAll('.stat-number').forEach(el => {
                    const end = parseInt(el.getAttribute('data-count'), 10);
                    const isPercent = el.textContent.includes('%');
                    gsap.fromTo(el, {
                        innerText: 0
                    }, {
                        innerText: end,
                        duration: 1.2,
                        ease: 'power1.out',
                        snap: { innerText: 1 },
                        onUpdate: function() {
                            el.textContent = Math.floor(el.innerText) + (isPercent ? '%' : (el.getAttribute('data-count') === '100' ? '%' : '+'));
                        }
                    });
                });
            }
        });

        // Experience timeline cards - Simple scroll animations
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            // Set initial state
            gsap.set(item, {
                opacity: 0,
                y: 50
            });
            
            // Create scroll trigger
            ScrollTrigger.create({
                trigger: item,
                start: "top 85%",
                end: "bottom 15%",
                onEnter: () => {
                    gsap.to(item, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: "power2.out"
                    });
                },
                onLeave: () => {
                    gsap.to(item, {
                        opacity: 0.3,
                        y: -20,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                },
                onEnterBack: () => {
                    gsap.to(item, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(item, {
                        opacity: 0,
                        y: 50,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Project cards
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out"
            });
        });

        // Contact section
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-info',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    setupSkillBars() {
        gsap.utils.toArray('.skill-progress').forEach(progress => {
            const progressValue = progress.getAttribute('data-progress');
            
            ScrollTrigger.create({
                trigger: progress,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(progress, {
                        width: `${progressValue}%`,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    setupParallaxEffects() {
        // Hero parallax
        gsap.to('.hero-visual', {
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: -100,
            ease: "none"
        });

        // Scroll indicator fade
        gsap.to('.scroll-indicator', {
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            opacity: 0,
            y: -20,
            ease: "none"
        });
    }

    setupNavbarAnimations() {
        // Navbar background on scroll
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                const navbar = document.querySelector('.navbar');
                if (self.direction === 1 && self.progress > 0.1) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            this.showMessage('Message sent successfully!', 'success');
            
            // Reset form
            this.form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        this.form.appendChild(messageDiv);
        
        // Animate in
        gsap.from(messageDiv, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Remove after 5 seconds
        setTimeout(() => {
            gsap.to(messageDiv, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => messageDiv.remove()
            });
        }, 5000);
    }
}

// Page Loader
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        // Hide loader when page is loaded
        window.addEventListener('load', () => {
            gsap.to('.loading', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                onComplete: () => {
                    document.body.classList.add('loaded');
                }
            });
        });
    }
}

// Cursor Effect (Optional)
class CursorEffect {
    constructor() {
        this.cursor = null;
        this.init();
    }

    init() {
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        // Follow mouse
        document.addEventListener('mousemove', (e) => {
            gsap.to(this.cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: "power2.out"
            });
        });
        
        // Hide on mobile
        if (window.innerWidth <= 768) {
            this.cursor.style.display = 'none';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all classes
    new ThemeManager();
    new MagneticEffect();
    new SmoothScrolling();
    new MobileMenu();
    new AnimationManager();
    new FormHandler();
    new PageLoader();
    
    // Optional: Initialize cursor effect
    // new CursorEffect();
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: var(--bg-primary);
                border-top: 1px solid var(--border-color);
                padding: 2rem;
                flex-direction: column;
                gap: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: var(--shadow-lg);
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        .form-message {
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            font-weight: 500;
        }
        
        .form-message.success {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        
        .form-message.error {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
        }
        
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        
        .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: var(--shadow-md);
        }
        
        [data-theme="dark"] .navbar.scrolled {
            background-color: rgba(15, 23, 42, 0.95);
        }
    `;
    document.head.appendChild(style);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
} 