document.addEventListener('DOMContentLoaded', function() {
    const shopContainer = document.querySelector('.shop-scroll-container');
    const shopWrapper = document.querySelector('.shop-wrapper');
    const productCards = document.querySelectorAll('.product-card');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const arrowLeft = document.querySelector('.shop-scroll-container .scroll-arrow.scroll-left');
    const arrowRight = document.querySelector('.shop-scroll-container .scroll-arrow.scroll-right');
    
    let isScrolling = false;
    let startX;
    let scrollLeft;
    
    // Initialize scroll position
    updateScrollIndicators();
    updateArrowVisibility();

    // Smooth scroll function
    function smoothScroll(target, duration) {
        const start = shopWrapper.scrollLeft;
        const distance = target - start;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smooth animation
            const ease = progress => (progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2);
            
            shopWrapper.scrollLeft = start + (distance * ease(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Arrow click handlers
    arrowLeft?.addEventListener('click', () => {
        const target = shopWrapper.scrollLeft - shopWrapper.offsetWidth;
        smoothScroll(target, 600);
    });

    arrowRight?.addEventListener('click', () => {
        const target = shopWrapper.scrollLeft + shopWrapper.offsetWidth;
        smoothScroll(target, 600);
    });

    // Mouse drag scrolling
    shopWrapper.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - shopWrapper.offsetLeft;
        scrollLeft = shopWrapper.scrollLeft;
        shopWrapper.style.cursor = 'grabbing';
    });

    shopWrapper.addEventListener('mouseleave', () => {
        isScrolling = false;
        shopWrapper.style.cursor = 'grab';
    });

    shopWrapper.addEventListener('mouseup', () => {
        isScrolling = false;
        shopWrapper.style.cursor = 'grab';
    });

    shopWrapper.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - shopWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        shopWrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    shopWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - shopWrapper.offsetLeft;
        scrollLeft = shopWrapper.scrollLeft;
    });

    shopWrapper.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - shopWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        shopWrapper.scrollLeft = scrollLeft - walk;
    });

    // Update scroll indicators
    function updateScrollIndicators() {
        const scrollPercentage = shopWrapper.scrollLeft / (shopWrapper.scrollWidth - shopWrapper.clientWidth);
        const dotCount = scrollDots.length;
        const activeDotIndex = Math.round(scrollPercentage * (dotCount - 1));

        scrollDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    // Update arrow visibility
    function updateArrowVisibility() {
        if (arrowLeft && arrowRight) {
            arrowLeft.style.opacity = shopWrapper.scrollLeft > 0 ? '1' : '0';
            arrowRight.style.opacity = 
                shopWrapper.scrollLeft < (shopWrapper.scrollWidth - shopWrapper.clientWidth - 10) 
                ? '1' : '0';
        }
    }

    // Scroll event listener
    shopWrapper.addEventListener('scroll', () => {
        updateScrollIndicators();
        updateArrowVisibility();
    });

    // Dot click handlers
    scrollDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const scrollWidth = shopWrapper.scrollWidth - shopWrapper.clientWidth;
            const targetScroll = (scrollWidth / (scrollDots.length - 1)) * index;
            smoothScroll(targetScroll, 600);
        });
    });

    // Initial setup
    shopWrapper.style.cursor = 'grab';
    updateArrowVisibility();
});
