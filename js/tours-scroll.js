// Tours Section Horizontal Scrolling Logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tour scroll functionality for both categories
    initializeTourScroll('domestic');
    initializeTourScroll('international');
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false
        });
    }
    
    function initializeTourScroll(type) {
        // Get elements based on index (0 for domestic, 1 for international)
        const index = type === 'domestic' ? 0 : 1;
        const toursWrapper = document.querySelectorAll('.tours-wrapper')[index];
        const scrollLeftBtn = document.querySelectorAll('.tours-category .scroll-left')[index];
        const scrollRightBtn = document.querySelectorAll('.tours-category .scroll-right')[index];
        const scrollDots = document.querySelectorAll('.tours-category .scroll-indicator')[index];
        const scrollDotElements = scrollDots.querySelectorAll('.scroll-dot');
        
        if (!toursWrapper || !scrollLeftBtn || !scrollRightBtn) return;
        
        // Calculate scroll width and visible width
        const cardWidth = toursWrapper.querySelector('.tour-card').offsetWidth;
        const visibleWidth = toursWrapper.offsetWidth;
        const scrollAmount = cardWidth + 25; // card width + gap
        
        // Handle right scroll button click
        scrollRightBtn.addEventListener('click', function() {
            toursWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Handle left scroll button click
        scrollLeftBtn.addEventListener('click', function() {
            toursWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Mouse drag scrolling functionality
        let isDown = false;
        let startX;
        let scrollLeft;
        
        toursWrapper.addEventListener('mousedown', function(e) {
            isDown = true;
            toursWrapper.classList.add('active');
            startX = e.pageX - toursWrapper.offsetLeft;
            scrollLeft = toursWrapper.scrollLeft;
        });
        
        toursWrapper.addEventListener('mouseleave', function() {
            isDown = false;
            toursWrapper.classList.remove('active');
        });
        
        toursWrapper.addEventListener('mouseup', function() {
            isDown = false;
            toursWrapper.classList.remove('active');
        });
        
        toursWrapper.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - toursWrapper.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            toursWrapper.scrollLeft = scrollLeft - walk;
            updateScrollDots();
        });
        
        // Touch swipe functionality for mobile
        let touchStartX;
        let touchEndX;
        
        toursWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        toursWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left, scroll right
                toursWrapper.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right, scroll left
                toursWrapper.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
        
        // Update scroll indicator dots
        function updateScrollDots() {
            const scrollPosition = toursWrapper.scrollLeft;
            const maxScroll = toursWrapper.scrollWidth - toursWrapper.clientWidth;
            const scrollPercentage = Math.min((scrollPosition / maxScroll) * 100, 100);
            
            // Calculate which dot should be active
            const activeDotIndex = Math.min(
                Math.floor((scrollPercentage / 100) * scrollDotElements.length),
                scrollDotElements.length - 1
            );
            
            // Update active class
            scrollDotElements.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Listen for scroll events to update the dots
        toursWrapper.addEventListener('scroll', function() {
            updateScrollDots();
            updateScrollButtonVisibility();
        });
        
        // Update scroll button visibility
        function updateScrollButtonVisibility() {
            const scrollPosition = toursWrapper.scrollLeft;
            const maxScroll = toursWrapper.scrollWidth - toursWrapper.clientWidth;
            
            // Hide/show left button based on scroll position
            if (scrollPosition <= 0) {
                scrollLeftBtn.classList.add('hidden');
            } else {
                scrollLeftBtn.classList.remove('hidden');
            }
            
            // Hide/show right button based on scroll position
            if (scrollPosition >= maxScroll - 5) {
                scrollRightBtn.classList.add('hidden');
            } else {
                scrollRightBtn.classList.remove('hidden');
            }
        }
        
        // Initialize button visibility
        updateScrollButtonVisibility();
        
        // Click on dots to navigate
        scrollDotElements.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const totalCards = toursWrapper.querySelectorAll('.tour-card').length;
                const visibleCards = Math.floor(visibleWidth / cardWidth);
                const totalScrollableCards = totalCards - visibleCards;
                
                const scrollPercentage = index / (scrollDotElements.length - 1);
                const targetScroll = Math.min(
                    scrollPercentage * (toursWrapper.scrollWidth - toursWrapper.clientWidth),
                    maxScroll
                );
                
                toursWrapper.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            });
        });
          // Handle card hover animations
        const tourCards = toursWrapper.querySelectorAll('.tour-card');
        tourCards.forEach((card, index) => {
            // Add staggered entrance animations
            card.style.animationDelay = `${index * 0.1}s`;            // Handle click on card
            card.addEventListener('click', function(e) {
                // If clicking on the "View Details" button, let the default action happen
                if (e.target.closest('.view-details-btn')) {
                    return;
                }
                
                // Check if we're on a page that should use modal (index.html) vs redirect (tours.html)
                const isIndexPage = window.location.pathname.endsWith('index.html') || 
                                  window.location.pathname === '/' || 
                                  window.location.pathname.endsWith('/');
                
                if (isIndexPage) {
                    // On index page, let event bubble up for modal handling
                    // Don't prevent default or redirect
                    return;
                }
                
                // On tours page or other pages, find the view details button and trigger it
                const viewDetailsBtn = this.querySelector('.view-details-btn');
                if (viewDetailsBtn) {
                    viewDetailsBtn.click();
                }
            });
            
            // Add cursor pointer to indicate clickable
            card.style.cursor = 'pointer';
        });
        
        // Add keyboard navigation for accessibility
        toursWrapper.tabIndex = 0;
        toursWrapper.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                toursWrapper.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                toursWrapper.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
                e.preventDefault();
            }
        });
    }
});
