// Enhanced Hotels Section Scrolling Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hotelsWrapper = document.querySelector('.hotels-wrapper');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    // Skip setup for mobile
    if (window.innerWidth <= 768) {
        return;
    }
    
    // Add tabindex for keyboard navigation
    hotelCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
    });
    
    // Create scroll progress bar
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.className = 'scroll-progress-bar';
    scrollProgress.appendChild(scrollProgressBar);
    scrollIndicator.insertAdjacentElement('afterend', scrollProgress);
    
    // Calculate scroll amounts
    const cardWidth = hotelCards[0].offsetWidth + 20; // Add the gap
    let currentIndex = 0;
    const maxIndex = hotelCards.length - Math.floor(hotelsWrapper.offsetWidth / cardWidth);
    
    // Set initial active card
    updateActiveCard();
    
    // Enhanced scroll buttons functionality
    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToCard();
                updateScrollDots();
                updateActiveCard();
                updateScrollProgress();
            }
        });
        
        scrollRightBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                scrollToCard();
                updateScrollDots();
                updateActiveCard();
                updateScrollProgress();
            }
        });
        
        // Add hover effect for buttons
        scrollLeftBtn.addEventListener('mouseenter', () => {
            scrollLeftBtn.style.transform = 'scale(1.1) translateX(-2px)';
        });
        
        scrollLeftBtn.addEventListener('mouseleave', () => {
            scrollLeftBtn.style.transform = 'scale(1)';
        });
        
        scrollRightBtn.addEventListener('mouseenter', () => {
            scrollRightBtn.style.transform = 'scale(1.1) translateX(2px)';
        });
        
        scrollRightBtn.addEventListener('mouseleave', () => {
            scrollRightBtn.style.transform = 'scale(1)';
        });
    }
    
    // Improved touch and mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;
    let dragStartTime;
    let dragEndTime;
    let dragDistance;
    
    hotelsWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        hotelsWrapper.style.cursor = 'grabbing';
        startX = e.pageX - hotelsWrapper.offsetLeft;
        scrollLeft = hotelsWrapper.scrollLeft;
        dragStartTime = new Date().getTime();
        dragDistance = 0;
        
        // Cancel auto scroll when user interacts
        clearInterval(autoScrollInterval);
    });
    
    hotelsWrapper.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            hotelsWrapper.style.cursor = 'grab';
            calculateMomentumScroll();
        }
    });
    
    hotelsWrapper.addEventListener('mouseup', () => {
        isDown = false;
        hotelsWrapper.style.cursor = 'grab';
        dragEndTime = new Date().getTime();
        calculateMomentumScroll();
    });
    
    hotelsWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - hotelsWrapper.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scrolling speed
        hotelsWrapper.scrollLeft = scrollLeft - walk;
        dragDistance = walk;
        updateCurrentIndex();
        updateActiveCard();
        updateScrollDots();
        updateScrollProgress();
    });
    
    // Momentum scrolling
    function calculateMomentumScroll() {
        const timeElapsed = dragEndTime - dragStartTime;
        if (timeElapsed < 200 && Math.abs(dragDistance) > 50) {
            // Calculate velocity
            const velocity = dragDistance / timeElapsed;
            
            // Apply momentum
            if (velocity > 0.5) {
                // Scrolling left
                currentIndex = Math.max(0, currentIndex - 1);
            } else if (velocity < -0.5) {
                // Scrolling right
                currentIndex = Math.min(maxIndex, currentIndex + 1);
            }
            
            scrollToCard();
            updateScrollDots();
            updateActiveCard();
            updateScrollProgress();
        } else {
            // Normal snap to nearest
            snapToNearestCard();
        }
    }
    
    // Enhanced scroll dots functionality
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            scrollToCard();
            updateScrollDots();
            updateActiveCard();
            updateScrollProgress();
            
            // Add click animation to dot
            dot.style.transform = 'scale(1.3)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 300);
            
            // Cancel auto scroll when user interacts
            clearInterval(autoScrollInterval);
        });
        
        // Add hover effect
        dot.addEventListener('mouseenter', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1.2)';
            }
        });
        
        dot.addEventListener('mouseleave', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1)';
            }
        });
    });
    
    // Update scroll indicators on scroll
    hotelsWrapper.addEventListener('scroll', () => {
        updateCurrentIndex();
        updateScrollDots();
        updateActiveCard();
        updateScrollProgress();
        
        // Add reveal animation to visible cards
        hotelCards.forEach((card, index) => {
            const cardPosition = card.offsetLeft - hotelsWrapper.offsetLeft;
            const isVisible = cardPosition >= -cardWidth && 
                             cardPosition <= hotelsWrapper.offsetWidth;
            
            if (isVisible) {
                card.classList.add('reveal');
            } else {
                card.classList.remove('reveal');
            }
        });
    });
    
    // Update current index based on scroll position
    function updateCurrentIndex() {
        const scrollPosition = hotelsWrapper.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWidth);
    }
    
    // Scroll to current card with enhanced animation
    function scrollToCard() {
        hotelsWrapper.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
    
    // Update the active dot with enhanced animation
    function updateScrollDots() {
        scrollDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Update active card with visual highlight
    function updateActiveCard() {
        hotelCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });
    }
    
    // Update scroll progress bar
    function updateScrollProgress() {
        if (maxIndex > 0) {
            const progress = (currentIndex / maxIndex) * 100;
            scrollProgressBar.style.width = `${progress}%`;
        }
    }
    
    // Snap to nearest card after scrolling with enhanced animation
    function snapToNearestCard() {
        const scrollPosition = hotelsWrapper.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWidth);
        scrollToCard();
        updateScrollDots();
        updateActiveCard();
        updateScrollProgress();
    }
    
    // Handle scroll end for snap effect
    let scrollTimeout;
    hotelsWrapper.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            snapToNearestCard();
        }, 150);
    });
    
    // Auto scroll functionality
    let autoScrollInterval;
    let isAutoScrollPaused = false;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (!isAutoScrollPaused) {
                if (currentIndex >= maxIndex) {
                    // Reset to first card with quick animation
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                scrollToCard();
                updateScrollDots();
                updateActiveCard();
                updateScrollProgress();
            }
        }, 5000); // Auto scroll every 5 seconds
    }
    
    // Pause auto scroll on hover
    hotelsWrapper.addEventListener('mouseenter', () => {
        isAutoScrollPaused = true;
    });
    
    hotelsWrapper.addEventListener('mouseleave', () => {
        isAutoScrollPaused = false;
    });
    
    // Start auto scroll after a delay
    setTimeout(startAutoScroll, 3000);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement && document.activeElement.closest('.hotels-wrapper')) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    scrollToCard();
                    updateScrollDots();
                    updateActiveCard();
                    updateScrollProgress();
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                    scrollToCard();
                    updateScrollDots();
                    updateActiveCard();
                    updateScrollProgress();
                }
            }
            
            // Cancel auto scroll when user interacts with keyboard
            clearInterval(autoScrollInterval);
        }
    });
    
    // Initialize
    hotelsWrapper.style.cursor = 'grab';
    updateScrollDots();
    updateActiveCard();
    updateScrollProgress();
    
    // Handle window resize for responsive adaptation
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobile view - remove event listeners and clean up
            hotelsWrapper.style.cursor = 'default';
            hotelsWrapper.style.overflow = 'visible';
            clearInterval(autoScrollInterval);
            
            // Hide scroll progress bar
            if (scrollProgress) {
                scrollProgress.style.display = 'none';
            }
        } else {
            // Desktop view - reapply scroll behavior
            const cardWidth = hotelCards[0].offsetWidth + 20;
            const maxIndex = hotelCards.length - Math.floor(hotelsWrapper.offsetWidth / cardWidth);
            currentIndex = Math.min(currentIndex, maxIndex);
            
            hotelsWrapper.style.cursor = 'grab';
            hotelsWrapper.style.overflow = 'auto';
            updateScrollDots();
            updateActiveCard();
            updateScrollProgress();
            
            // Show scroll progress bar
            if (scrollProgress) {
                scrollProgress.style.display = 'block';
            }
            
            // Restart auto scroll
            clearInterval(autoScrollInterval);
            setTimeout(startAutoScroll, 3000);
        }
    });
    
    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('.hotel-image img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    }
});
