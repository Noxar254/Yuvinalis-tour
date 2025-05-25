document.addEventListener('DOMContentLoaded', function() {
    // Initialize like functionality
    const likeButtons = document.querySelectorAll('.like-button');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.querySelector('.like-count');
            const currentLikes = parseInt(likeCount.textContent);
            
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                likeCount.textContent = currentLikes - 1;
            } else {
                this.classList.add('liked');
                likeCount.textContent = currentLikes + 1;
                
                // Add heart animation
                const heart = this.querySelector('i');
                heart.style.animation = 'none';
                heart.offsetHeight; // Trigger reflow
                heart.style.animation = 'likeAnimation 0.5s ease';
            }
        });
    });

    // Auto-scroll functionality
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialsWrapper && testimonialCards.length > 0) {
        // Clone testimonials for smooth infinite scroll
        testimonialCards.forEach(card => {
            const clone = card.cloneNode(true);
            testimonialsWrapper.appendChild(clone);
            
            // Initialize like functionality for cloned cards
            const clonedLikeButton = clone.querySelector('.like-button');
            if (clonedLikeButton) {
                clonedLikeButton.addEventListener('click', function() {
                    const likeCount = this.querySelector('.like-count');
                    const currentLikes = parseInt(likeCount.textContent);
                    
                    if (this.classList.contains('liked')) {
                        this.classList.remove('liked');
                        likeCount.textContent = currentLikes - 1;
                    } else {
                        this.classList.add('liked');
                        likeCount.textContent = currentLikes + 1;
                    }
                });
            }
        });

        testimonialsWrapper.classList.add('auto-scroll');
    }

    // Pause animation on hover
    testimonialsWrapper.addEventListener('mouseenter', () => {
        testimonialsWrapper.style.animationPlayState = 'paused';
    });

    testimonialsWrapper.addEventListener('mouseleave', () => {
        testimonialsWrapper.style.animationPlayState = 'running';
    });
});
