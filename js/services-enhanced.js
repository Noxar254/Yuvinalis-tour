// Services Horizontal Scrolling Logic with Height Optimization
document.addEventListener('DOMContentLoaded', function() {
    const servicesSlider = document.querySelector('.services-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const featureItems = document.querySelectorAll('.feature-item');
    
    if (!servicesSlider || !prevBtn || !nextBtn) return;
    
    // Define the scroll amount (width of one card + margin)
    const scrollAmount = 360; // 340px card width + 20px margin
      // Ensure all cards have optimal height
    function optimizeCardHeights() {
        // Reset heights to auto first
        serviceCards.forEach(card => {
            card.style.minHeight = 'auto';
        });
        
        // Get the tallest card height (with a minimum for compact design)
        let maxHeight = 280; // Minimum height for compact design
        serviceCards.forEach(card => {
            const cardHeight = card.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });
        
        // Set all cards to at least the tallest height
        serviceCards.forEach(card => {
            card.style.minHeight = maxHeight + 'px';
        });
    }
      // Optimize feature items for better display
    function optimizeFeatureItems() {
        featureItems.forEach(item => {
            const span = item.querySelector('span');
            if (span) {
                // Ensure features are compact and horizontal
                span.style.whiteSpace = 'nowrap';
                span.style.textOverflow = 'ellipsis';
                span.style.overflow = 'hidden';
                
                // Adjust max width for very long text
                if (span.textContent.length > 15) {
                    span.style.maxWidth = '80px';
                } else {
                    span.style.maxWidth = 'none';
                }
            }
        });
    }
    
    // Call optimizations on load
    optimizeCardHeights();
    optimizeFeatureItems();
    
    // And on window resize
    window.addEventListener('resize', function() {
        optimizeCardHeights();
        optimizeFeatureItems();
    });
    
    // Handle next button click
    nextBtn.addEventListener('click', function() {
        servicesSlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Handle previous button click
    prevBtn.addEventListener('click', function() {
        servicesSlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Handle touch events for mobile swiping
    let startX, endX;
    let isDown = false;
    let scrollLeft;
    
    servicesSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - servicesSlider.offsetLeft;
        scrollLeft = servicesSlider.scrollLeft;
    });
    
    servicesSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    servicesSlider.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    servicesSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - servicesSlider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        servicesSlider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    servicesSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    servicesSlider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const threshold = 50;
        
        if (startX - endX > threshold) {
            // Swipe left, scroll right
            servicesSlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        } else if (endX - startX > threshold) {
            // Swipe right, scroll left
            servicesSlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    });
    
    // Update navigation buttons visibility based on scroll position
    function updateNavButtons() {
        // Check if we're at the start or end of scrolling
        const isAtStart = servicesSlider.scrollLeft <= 0;
        const isAtEnd = servicesSlider.scrollLeft >= servicesSlider.scrollWidth - servicesSlider.clientWidth - 10;
        
        // Show/hide buttons accordingly
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }
    
    // Initial call to set correct button states
    updateNavButtons();
    
    // Add event listener for scroll to update button states
    servicesSlider.addEventListener('scroll', updateNavButtons);
    
    // Add event listener for window resize to update button states
    window.addEventListener('resize', updateNavButtons);
});
