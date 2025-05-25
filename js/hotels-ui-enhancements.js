// Enhance the Hotels Section UI
document.addEventListener('DOMContentLoaded', function() {
    // Only run this if we're not on mobile
    if (window.innerWidth <= 768) {
        return;
    }
    
    // Enhance scroll arrows with accessibility and visual improvements
    const scrollLeftBtn = document.querySelector('.scroll-arrow.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-arrow.scroll-right');
    
    if (scrollLeftBtn) {
        scrollLeftBtn.setAttribute('aria-label', 'Scroll left');
        const srOnlySpan = document.createElement('span');
        srOnlySpan.className = 'sr-only';
        srOnlySpan.textContent = 'Previous';
        scrollLeftBtn.appendChild(srOnlySpan);
    }
    
    if (scrollRightBtn) {
        scrollRightBtn.setAttribute('aria-label', 'Scroll right');
        const srOnlySpan = document.createElement('span');
        srOnlySpan.className = 'sr-only';
        srOnlySpan.textContent = 'Next';
        scrollRightBtn.appendChild(srOnlySpan);
    }

    // Add hover effect with CSS custom properties
    const addHoverEffect = (element, direction) => {
        if (!element) return;
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = direction === 'left' 
                ? 'scale(1.1) translateX(-2px)' 
                : 'scale(1.1) translateX(2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    };
    
    addHoverEffect(scrollLeftBtn, 'left');
    addHoverEffect(scrollRightBtn, 'right');
    
    // Add a subtle pulse animation to draw attention to the scroll functionality
    const animateArrows = () => {
        if (scrollLeftBtn && scrollRightBtn) {
            setTimeout(() => {
                scrollRightBtn.style.animation = 'pulse 1.5s ease-in-out';
                setTimeout(() => {
                    scrollRightBtn.style.animation = '';
                }, 1500);
            }, 2000);
        }
    };
    
    // Only animate the first time
    animateArrows();
    
    // Add CSS for the sr-only class if it doesn't exist
    if (!document.getElementById('sr-only-style')) {
        const style = document.createElement('style');
        style.id = 'sr-only-style';
        style.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.15); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create a keyboard navigation hint
    const hotelCards = document.querySelectorAll('.hotel-card');
    if (hotelCards.length > 0) {
        setTimeout(() => {
            const keyboardHint = document.createElement('div');
            keyboardHint.className = 'keyboard-hint';
            keyboardHint.innerHTML = '<span><i class="fas fa-keyboard"></i> Use arrow keys to navigate</span>';
            keyboardHint.style.cssText = `
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(39, 174, 96, 0.1);
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                color: #27ae60;
                display: flex;
                align-items: center;
                gap: 5px;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 10;
            `;
            
            const hotelsContainer = document.querySelector('.hotels-scroll-container');
            if (hotelsContainer) {
                hotelsContainer.style.position = 'relative';
                hotelsContainer.appendChild(keyboardHint);
                
                // Show the hint when user focuses on any card
                hotelCards.forEach(card => {
                    card.addEventListener('focus', () => {
                        keyboardHint.style.opacity = '1';
                    });
                });
                
                // Hide the hint after a few seconds
                document.addEventListener('click', () => {
                    keyboardHint.style.opacity = '0';
                });
                
                // Show initially and then fade out
                setTimeout(() => {
                    keyboardHint.style.opacity = '1';
                    setTimeout(() => {
                        keyboardHint.style.opacity = '0';
                    }, 3000);
                }, 2000);
            }
        }, 1000);
    }
});
