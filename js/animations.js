// Advanced Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate statistics counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * easeOutExpo(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    // Parallax effect for floating elements
    function initParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        if (window.innerWidth > 768) { // Only on desktop
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.2;
                    element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.05}deg)`;
                });
            });
        }
    }
    
    // Smooth reveal animations
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.service-card, .expertise-item, .review-card, .feature');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }
    
    // Enhanced button interactions
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                } else {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
    
    // Magnetic effect for service cards
    function initMagneticEffect() {
        const cards = document.querySelectorAll('.service-card, .review-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 768) { // Only on desktop
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // Typing effect for hero title
    function initTypingEffect() {
        const titleHighlight = document.querySelector('.title-highlight');
        if (titleHighlight) {
            const text = titleHighlight.textContent;
            titleHighlight.textContent = '';
            titleHighlight.style.borderRight = '2px solid rgba(255,255,255,0.8)';
            titleHighlight.style.display = 'inline-block';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    titleHighlight.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 80);
                } else {
                    setTimeout(() => {
                        titleHighlight.style.borderRight = 'none';
                    }, 500);
                }
            }
            
            setTimeout(typeWriter, 1500);
        }
    }
    
    // Floating animation for trust badges
    function initFloatingBadges() {
        const badges = document.querySelectorAll('.trust-badge');
        
        badges.forEach((badge, index) => {
            badge.style.animation = `float 3s ease-in-out infinite`;
            badge.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Ripple effect for buttons
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }
    
    // Initialize all animations
    animateCounters();
    initParallax();
    initRevealAnimations();
    initButtonEffects();
    initMagneticEffect();
    initTypingEffect();
    initFloatingBadges();
    initRippleEffect();
    initSmoothScrolling();
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
