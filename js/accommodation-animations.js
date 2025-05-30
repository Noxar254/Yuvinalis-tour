// Animation functions for accommodation page

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const accommodationCards = document.querySelectorAll('.accommodation-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set animation classes and delays for cards
    accommodationCards.forEach((card, index) => {
        card.classList.add('animate-slide-up');
        setTimeout(() => {
            observer.observe(card);
        }, 100);
    });

    // Filter button functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Reset animations
            accommodationCards.forEach((card, index) => {
                card.classList.remove('appear');
                
                // Apply filter with animation delay for staggered effect
                setTimeout(() => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('appear'), 50 * index);
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                            setTimeout(() => card.classList.add('appear'), 50 * index);
                        } else {
                            card.style.display = 'none';
                        }
                    }
                }, 50);
            });
        });
    });
});
