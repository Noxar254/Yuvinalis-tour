// Services Horizontal Scrolling Logic
document.addEventListener('DOMContentLoaded', function() {
    const servicesSlider = document.querySelector('.services-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!servicesSlider || !prevBtn || !nextBtn) return;
      // Define the scroll amount (width of one card + margin)
    const scrollAmount = 340; // 340px card width + 20px margin
    
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
