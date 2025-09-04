// Elegant Hero Slider - Inspired by Maler Knöpper

class ElegantSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-nav-dot');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 6000; // 6 seconds for more slides
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Add event listeners to navigation dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            heroSection.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide index
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Restart autoplay
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    addTouchSupport() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        heroSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        heroSection.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
}

// Smooth Navbar Scroll Effect
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolled down
        if (currentScrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        this.lastScrollY = currentScrollY;
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.service-card-elegant, .about-text, .about-image, .contact-item');
        animateElements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Mobile Menu Controller
class MobileMenu {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        
        this.init();
    }
    
    init() {
        if (!this.navToggle || !this.navMenu) return;
        
        this.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking on a link
        this.navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical images
        this.preloadCriticalImages();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    preloadCriticalImages() {
        const criticalImages = [
            'images/Projekte/Projekt Fassadenarbeit/25522d2f3b120218ef68f87bb54bc9f67c3af9f2.jpg',
            'images/Projekte/Projekt Lackierarbeiten/5c34456e05899283ce5ad67f0366e03dd0042eba.jpg',
            'images/Projekte/Projekt Komplettlösung/5e482d7fa713a1d1d97f4556307d7f8602701a39.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ElegantSlider();
    new NavbarController();
    new SmoothScroll();
    new AnimationController();
    new MobileMenu();
    new PerformanceOptimizer();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Handle page visibility changes (for performance)
document.addEventListener('visibilitychange', () => {
    const slider = document.querySelector('.hero');
    if (slider) {
        if (document.hidden) {
            // Pause animations when page is not visible
            slider.style.animationPlayState = 'paused';
        } else {
            // Resume animations when page becomes visible
            slider.style.animationPlayState = 'running';
        }
    }
});
