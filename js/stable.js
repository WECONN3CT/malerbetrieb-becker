// Malerbetrieb Becker - Stabiles JavaScript ohne Flackern

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Setup - Stabil ohne Flackern
    setupNavigation();
    
    // Mobile Menu - Einfach und stabil
    setupMobileMenu();
    
    // Smooth Scrolling - Ohne Performance-Probleme
    setupSmoothScrolling();
    
    // Form Handling - Einfach und zuverlässig
    setupForms();
});

function setupNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    // Throttled scroll event - verhindert Flackern
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Accessibility
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'Dieses Feld ist erforderlich.');
                } else {
                    field.classList.remove('error');
                    clearFieldError(field);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(function(field) {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                }
            });
            
            if (isValid) {
                showNotification('Vielen Dank! Ihre Nachricht wurde gesendet.', 'success');
                form.reset();
            } else {
                showNotification('Bitte füllen Sie alle Pflichtfelder korrekt aus.', 'error');
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    clearFieldError(this);
                }
            });
        });
    });
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(function(notification) {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    
    const colors = {
        success: '#10b981',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.innerHTML = 
        '<div style="' +
            'position: fixed; ' +
            'top: 20px; ' +
            'right: 20px; ' +
            'background: white; ' +
            'border-left: 4px solid ' + (colors[type] || colors.info) + '; ' +
            'padding: 1rem 1.5rem; ' +
            'border-radius: 8px; ' +
            'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); ' +
            'z-index: 9999; ' +
            'max-width: 400px; ' +
            'font-size: 0.9rem; ' +
            'color: #2c3e50;' +
        '">' +
            '<div style="display: flex; align-items: center; justify-content: space-between;">' +
                '<span>' + message + '</span>' +
                '<button onclick="this.parentElement.parentElement.parentElement.remove()" style="' +
                    'background: none; ' +
                    'border: none; ' +
                    'font-size: 1.2rem; ' +
                    'cursor: pointer; ' +
                    'margin-left: 1rem; ' +
                    'color: #8a9ba8;' +
                '">&times;</button>' +
            '</div>' +
        '</div>';
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Image loading optimization - verhindert Flackern
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
            });
        }
    });
}

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', setupImageLoading);

// Handle page visibility changes - verhindert unnötige Berechnungen
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause any running animations or timers
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible - resume
        document.body.classList.remove('page-hidden');
    }
});

// Prevent layout shift - stabile Größen
window.addEventListener('load', function() {
    // Ensure all images have proper dimensions
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(function(img) {
        if (img.naturalWidth && img.naturalHeight) {
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            img.style.aspectRatio = '1 / ' + aspectRatio;
        }
    });
});

// Error handling - verhindert JavaScript-Fehler
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.message);
    // Don't let errors break the page
    return true;
});

// Performance monitoring
if (typeof performance !== 'undefined' && performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 3000) {
                console.warn('Page load time is slow:', loadTime + 'ms');
            }
        }, 0);
    });
}

