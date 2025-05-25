// Advanced hover effects for hotel cards
document.addEventListener('DOMContentLoaded', function() {
    // Skip on mobile
    if (window.innerWidth <= 768) {
        return;
    }
    
    const hotelCards = document.querySelectorAll('.hotel-card');
    const hotelsWrapper = document.querySelector('.hotels-wrapper');
    
    if (!hotelCards.length || !hotelsWrapper) return;
    
    // Initialize position tracking
    let isHovering = false;
    let currentX = 0;
    let currentY = 0;
    
    // Interactive card effect - track mouse position for 3D effect
    hotelsWrapper.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        
        // Get mouse position relative to wrapper
        const rect = hotelsWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        currentX = x;
        currentY = y;
        
        // Apply effect to hovered card
        hotelCards.forEach(card => {
            if (card.matches(':hover')) {
                const cardRect = card.getBoundingClientRect();
                const cardX = cardRect.left + cardRect.width / 2 - rect.left;
                const cardY = cardRect.top + cardRect.height / 2 - rect.top;
                
                const angleY = (x - cardX) * 0.01; // Adjust intensity
                const angleX = (y - cardY) * -0.01; // Inverted for correct tilt direction
                
                // Apply 3D rotation based on mouse position
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
                
                // Create light reflection effect
                const glareX = ((x - cardX) / cardRect.width) * 100 + 50;
                const glareY = ((y - cardY) / cardRect.height) * 100 + 50;
                
                // Apply or create the glare element
                let glare = card.querySelector('.card-glare');
                if (!glare) {
                    glare = document.createElement('div');
                    glare.className = 'card-glare';
                    glare.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        border-radius: 12px;
                        pointer-events: none;
                        background: radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
                        z-index: 5;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    `;
                    card.style.position = 'relative';
                    card.appendChild(glare);
                    
                    // Fade in the glare
                    setTimeout(() => {
                        glare.style.opacity = '1';
                    }, 50);
                } else {
                    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
                }
            }
        });
    });
    
    // Track when we enter/leave the cards container
    hotelsWrapper.addEventListener('mouseenter', function() {
        isHovering = true;
    });
    
    hotelsWrapper.addEventListener('mouseleave', function() {
        isHovering = false;
        
        // Reset all cards
        hotelCards.forEach(card => {
            card.style.transform = '';
            const glare = card.querySelector('.card-glare');
            if (glare) {
                glare.style.opacity = '0';
                setTimeout(() => {
                    if (glare.parentNode === card) {
                        card.removeChild(glare);
                    }
                }, 300);
            }
        });
    });
    
    // Handle individual card hover end
    hotelCards.forEach(card => {
        card.addEventListener('mouseleave', function() {
            if (isHovering) {
                card.style.transform = '';
                const glare = card.querySelector('.card-glare');
                if (glare) {
                    glare.style.opacity = '0';
                    setTimeout(() => {
                        if (glare.parentNode === card) {
                            card.removeChild(glare);
                        }
                    }, 300);
                }
            }
        });
        
        // Add a subtle lift effect on hover
        card.addEventListener('mouseenter', function() {
            // Create image parallax effect
            const img = card.querySelector('.hotel-image img');
            if (img) {
                img.style.transition = 'transform 0.3s ease';
                img.style.transform = 'scale(1.05)';
            }
            
            // Create button lift effect
            const button = card.querySelector('.view-details-btn');
            if (button) {
                button.style.transform = 'translateY(-3px)';
                button.style.boxShadow = '0 5px 15px rgba(39, 174, 96, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset image
            const img = card.querySelector('.hotel-image img');
            if (img) {
                img.style.transform = '';
            }
            
            // Reset button
            const button = card.querySelector('.view-details-btn');
            if (button) {
                button.style.transform = '';
                button.style.boxShadow = '';
            }
        });
    });
    
    // Detect if the browser supports these effects
    const supportsEffects = () => {
        return ('transform' in document.documentElement.style && 
                'transition' in document.documentElement.style &&
                !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    // If not supported, don't apply the effects
    if (!supportsEffects()) {
        hotelCards.forEach(card => {
            card.style.transition = 'none';
        });
        return;
    }
});
