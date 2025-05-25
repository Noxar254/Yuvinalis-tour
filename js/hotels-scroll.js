// Hotels Section Horizontal Scroll
document.addEventListener('DOMContentLoaded', function() {
    const hotelsWrapper = document.querySelector('.hotels-wrapper');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    // Skip scroll setup for mobile
    if (window.innerWidth <= 768) {
        return;
    }
    
    // Calculate scroll amount based on card width
    const cardWidth = hotelCards[0].offsetWidth + 20; // Add the gap
    let currentIndex = 0;
    const maxIndex = Math.ceil(hotelCards.length - (hotelsWrapper.offsetWidth / cardWidth));
    
    // Scroll buttons functionality
    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToCard();
                updateScrollDots();
            }
        });
        
        scrollRightBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                scrollToCard();
                updateScrollDots();
            }
        });
    }
    
    // Handle touch scrolling
    let isDown = false;
    let startX;
    let scrollLeft;
    
    hotelsWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        hotelsWrapper.style.cursor = 'grabbing';
        startX = e.pageX - hotelsWrapper.offsetLeft;
        scrollLeft = hotelsWrapper.scrollLeft;
    });
    
    hotelsWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        hotelsWrapper.style.cursor = 'grab';
    });
    
    hotelsWrapper.addEventListener('mouseup', () => {
        isDown = false;
        hotelsWrapper.style.cursor = 'grab';
        snapToNearestCard();
    });
    
    hotelsWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - hotelsWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scrolling speed
        hotelsWrapper.scrollLeft = scrollLeft - walk;
    });
    
    // Scroll dots functionality
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            scrollToCard();
            updateScrollDots();
        });
    });
    
    // Update scroll indicators on scroll
    hotelsWrapper.addEventListener('scroll', () => {
        const scrollPosition = hotelsWrapper.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWidth);
        updateScrollDots();
        
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
    
    // Scroll to current card
    function scrollToCard() {
        hotelsWrapper.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
    
    // Update the active dot
    function updateScrollDots() {
        scrollDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Snap to nearest card after scrolling
    function snapToNearestCard() {
        const scrollPosition = hotelsWrapper.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWidth);
        scrollToCard();
    }
    
    // Handle scroll end for snap effect
    let scrollTimeout;
    hotelsWrapper.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            snapToNearestCard();
        }, 150);
    });
      // Initialize
    hotelsWrapper.style.cursor = 'grab';
    updateScrollDots();
    
    // Handle window resize to adjust between mobile and desktop views
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Mobile view - remove event listeners
            hotelsWrapper.style.cursor = 'default';
            hotelsWrapper.style.overflow = 'visible';
        } else {
            // Desktop view - reapply scroll behavior
            hotelsWrapper.style.cursor = 'grab';
            hotelsWrapper.style.overflow = 'auto';
            updateScrollDots();
        }
    });
});
