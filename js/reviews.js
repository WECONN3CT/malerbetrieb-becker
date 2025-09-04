// Reviews Slider Functionality
let currentReviewIndex = 0;

function showReview(index) {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    if (reviews.length === 0) return;
    
    // Hide all reviews
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            setTimeout(() => {
                review.classList.add('active');
            }, 100);
        }
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentReviewIndex = index;
}

function changeReview(direction) {
    const reviews = document.querySelectorAll('.review-card');
    if (reviews.length === 0) return;
    
    let newIndex = currentReviewIndex + direction;
    
    if (newIndex >= reviews.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = reviews.length - 1;
    }
    
    showReview(newIndex);
}

function currentReview(index) {
    showReview(index - 1);
}

// Auto-play reviews
function startAutoPlay() {
    return setInterval(() => {
        changeReview(1);
    }, 5000);
}

// Initialize reviews slider
document.addEventListener('DOMContentLoaded', function() {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    if (reviews.length > 0) {
        showReview(0);
        
        // Start auto-play
        let autoPlayInterval = startAutoPlay();
        
        // Pause auto-play on hover
        const reviewsSection = document.querySelector('.reviews-section');
        if (reviewsSection) {
            reviewsSection.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            
            reviewsSection.addEventListener('mouseleave', () => {
                autoPlayInterval = startAutoPlay();
            });
        }
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        const reviewsSlider = document.querySelector('.reviews-slider');
        if (reviewsSlider) {
            reviewsSlider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            reviewsSlider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next review
                    changeReview(1);
                } else {
                    // Swipe right - previous review
                    changeReview(-1);
                }
            }
        }
    }
});

// Animate rating on scroll
function animateRating() {
    const ratingScore = document.querySelector('.rating-score');
    if (ratingScore) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(ratingScore, 0, 4.9, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(ratingScore);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        element.textContent = current.toFixed(1);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Initialize rating animation
document.addEventListener('DOMContentLoaded', animateRating);
