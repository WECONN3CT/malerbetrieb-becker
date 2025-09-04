// Simple Hero Gallery System

class SimpleHeroGallery {
    constructor() {
        this.slider = document.querySelector('.hero-slider');
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-nav-dot');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        if (this.slider && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Setup navigation dots
        this.setupNavigation();
        
        // Setup auto-advance
        this.setupAutoAdvance();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        // Setup touch/swipe support
        this.setupTouchSupport();
        
        // Preload images
        this.preloadImages();
    }
    
    setupNavigation() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoAdvance();
            });
        });
    }
    
    setupAutoAdvance() {
        this.startAutoAdvance();
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoAdvance();
        });
        
        this.slider.addEventListener('mouseleave', () => {
            this.startAutoAdvance();
        });
        
        // Pause when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoAdvance();
            } else {
                this.startAutoAdvance();
            }
        });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.hero')) {
                switch(e.key) {
                    case 'ArrowLeft':
                        this.prevSlide();
                        this.resetAutoAdvance();
                        e.preventDefault();
                        break;
                    case 'ArrowRight':
                        this.nextSlide();
                        this.resetAutoAdvance();
                        e.preventDefault();
                        break;
                }
            }
        });
    }
    
    setupTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide(); // Swipe left
                } else {
                    this.prevSlide(); // Swipe right
                }
                this.resetAutoAdvance();
            }
        });
    }
    
    preloadImages() {
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('.hero-image');
            if (img && img.src) {
                const preloadImg = new Image();
                preloadImg.onload = () => {
                    slide.classList.remove('loading');
                };
                preloadImg.onerror = () => {
                    console.warn(`Failed to load image: ${img.src}`);
                    slide.classList.add('error');
                };
                preloadImg.src = img.src;
            }
        });
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Set new current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Update ARIA attributes for accessibility
        this.updateAriaAttributes();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoAdvance() {
        this.stopAutoAdvance(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 seconds per slide
    }
    
    stopAutoAdvance() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoAdvance() {
        this.stopAutoAdvance();
        setTimeout(() => {
            this.startAutoAdvance();
        }, 1000); // Wait 1 second before restarting auto-advance
    }
    
    updateAriaAttributes() {
        this.slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== this.currentSlide);
        });
        
        this.dots.forEach((dot, index) => {
            dot.setAttribute('aria-pressed', index === this.currentSlide);
        });
    }
}

// Vorher-Nachher Gallery Section (if needed)
class VorherNachherGallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }
    
    init() {
        this.setupLazyLoading();
        this.setupHoverEffects();
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector('.gallery-image');
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                            imageObserver.unobserve(entry.target);
                        }
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            this.galleryItems.forEach(item => {
                imageObserver.observe(item);
            });
        }
    }
    
    setupHoverEffects() {
        this.galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Optimize for mobile
        this.optimizeForMobile();
        
        // Handle orientation changes
        this.handleOrientationChange();
        
        // Optimize animations based on user preferences
        this.respectMotionPreferences();
    }
    
    optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
            
            // Reduce animation duration on mobile
            const style = document.createElement('style');
            style.textContent = `
                .hero-slide { transition-duration: 0.5s !important; }
                .hero-cta { transition-duration: 0.2s !important; }
            `;
            document.head.appendChild(style);
        }
    }
    
    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Trigger a resize event to recalculate dimensions
                window.dispatchEvent(new Event('resize'));
            }, 100);
        });
    }
    
    respectMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }
        
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero gallery
    new SimpleHeroGallery();
    
    // Initialize vorher-nachher gallery (if present)
    if (document.querySelector('.gallery-item')) {
        new VorherNachherGallery();
    }
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
});

// Handle page load completion
window.addEventListener('load', () => {
    // Remove any loading states
    document.querySelectorAll('.loading').forEach(element => {
        element.classList.remove('loading');
    });
    
    // Add loaded class to body for any CSS that depends on full page load
    document.body.classList.add('page-loaded');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SimpleHeroGallery, VorherNachherGallery };
}