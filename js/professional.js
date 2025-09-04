// Malerbetrieb Becker - Professional JavaScript
// Version 2.0

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initContactForm();
    initGalleryLinks();
    syncHeroOfferStripWidth();
    window.addEventListener('resize', syncHeroOfferStripWidth);
});

// Navigation scroll effect
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Mobile menu
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Smooth scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="${href}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        });
    });
}

// Animations on scroll
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 100);
                }
                
                if (entry.target.classList.contains('stat-value')) {
                    animateCounter(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.gallery-item').forEach(el => observer.observe(el));
    document.querySelectorAll('.stat-value').forEach(el => observer.observe(el));
}

// Simple horizontal scroll for reviews
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('reviewsTrack');
    const prev = document.querySelector('.reviews-prev');
    const next = document.querySelector('.reviews-next');
    if (!track || !prev || !next) return;

    // Show 4 cards per slide: compute width of 4 cards including gaps
    function getSlideWidth() {
        const card = track.querySelector('.review-card');
        if (!card) return 0;
        const cardStyles = getComputedStyle(card);
        const gap = parseFloat(getComputedStyle(track).gap || '0');
        const cardWidth = card.getBoundingClientRect().width;
        return (cardWidth * 4) + (gap * 3);
    }

    function scrollBySlide(direction) {
        const amount = getSlideWidth() || track.clientWidth;
        track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    prev.addEventListener('click', () => scrollBySlide(-1));
    next.addEventListener('click', () => scrollBySlide(1));

    // Keyboard accessibility
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollBySlide(-1);
        if (e.key === 'ArrowRight') scrollBySlide(1);
    });

    // Responsive: ensure top-left card aligns after resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Snap to nearest multiple of slide width
            const amount = getSlideWidth();
            if (!amount) return;
            const current = track.scrollLeft;
            const snapped = Math.round(current / amount) * amount;
            track.scrollTo({ left: snapped, behavior: 'auto' });
        }, 150);
    });
});

// Make homepage gallery items link to projects page
function initGalleryLinks() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;
    items.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            window.location.href = 'projekte.html';
        });
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.innerText);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.innerText = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.innerText = target + '+';
        }
    };
    
    updateCounter();
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerText;
        
        button.innerText = 'Nachricht gesendet!';
        button.style.background = '#27ae60';
        button.disabled = true;
        
        // Reset form
        setTimeout(() => {
            form.reset();
            button.innerText = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 3000);
    });
}

// Update active navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

function syncHeroOfferStripWidth() {
    const strip = document.getElementById('hero-offer-strip');
    if (!strip) return;
    const cta = document.querySelector('.hero-actions .btn.btn-secondary');
    if (!cta) return;
    const ctaWidth = cta.getBoundingClientRect().width;
    strip.style.width = ctaWidth + 'px';
}

