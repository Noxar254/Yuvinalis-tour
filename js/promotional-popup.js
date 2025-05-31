// Promotional Popup JavaScript
class PromotionalPopup {
    constructor() {
        this.popup = null;
        this.overlay = null;
        this.showDelay = 3000; // 3 seconds
        this.autoHideDelay = 10000; // 10 seconds auto-hide
        this.hasShown = false;
        
        this.init();
    }
    
    init() {
        // Check if popup should be shown (not shown in last 24 hours)
        const lastShown = localStorage.getItem('promoPopupLastShown');
        const now = new Date().getTime();
        const oneDayAgo = now - (24 * 60 * 60 * 1000);
        
        if (!lastShown || parseInt(lastShown) < oneDayAgo) {
            this.createPopup();
            this.scheduleShow();
        }
    }
    
    createPopup() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'promo-popup-overlay';
        
        // Create popup HTML
        this.overlay.innerHTML = `
            <div class="promo-popup">
                <button class="promo-close" onclick="promotionalPopup.hide()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="promo-content">
                    <div class="promo-header">
                        <div class="promo-badge">🎉 Limited Time Offer</div>
                        <h2 class="promo-title">Exclusive Travel Deals!</h2>
                        <p class="promo-subtitle">Don't miss out on these amazing opportunities</p>
                    </div>
                    
                    <div class="promo-offers">
                        <div class="promo-offer-item">
                            <h4>
                                <i class="fas fa-plane" style="color: #3498db;"></i>
                                UAE Tours
                                <span class="discount">30% OFF</span>
                            </h4>
                            <p>Experience Dubai, Abu Dhabi & more with our premium packages</p>
                        </div>
                        
                        <div class="promo-offer-item">
                            <h4>
                                <i class="fas fa-hotel" style="color: #e74c3c;"></i>
                                Hotel Bookings
                                <span class="discount">25% OFF</span>
                            </h4>
                            <p>Luxury accommodations across UAE at unbeatable prices</p>
                        </div>
                        
                        <div class="promo-offer-item">
                            <h4>
                                <i class="fas fa-shipping-fast" style="color: #f39c12;"></i>
                                Freight Services
                                <span class="discount">Free Quote</span>
                            </h4>
                            <p>Reliable cargo shipping between Dubai and Kenya</p>
                        </div>
                    </div>
                    
                    <div class="promo-buttons">
                        <a href="#tours" class="promo-btn promo-btn-primary" onclick="promotionalPopup.hide()">
                            <i class="fas fa-rocket"></i>
                            Explore Deals
                        </a>
                        <button class="promo-btn promo-btn-secondary" onclick="promotionalPopup.hide()">
                            <i class="fas fa-clock"></i>
                            Remind Later
                        </button>
                    </div>
                    
                    <div class="promo-timer">
                        ⏰ Offer ends in: <span id="countdown-timer">48:00:00</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(this.overlay);
        
        // Add click outside to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
            }
        });
        
        // Add escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.hide();
            }
        });
    }
    
    scheduleShow() {
        setTimeout(() => {
            this.show();
        }, this.showDelay);
    }
    
    show() {
        if (this.hasShown || !this.overlay) return;
        
        this.hasShown = true;
        this.overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Start countdown timer
        this.startCountdown();
        
        // Auto-hide after delay
        setTimeout(() => {
            if (this.overlay.classList.contains('show')) {
                this.hide();
            }
        }, this.autoHideDelay);
        
        // Record that popup was shown
        localStorage.setItem('promoPopupLastShown', new Date().getTime().toString());
    }
    
    hide() {
        if (!this.overlay) return;
        
        this.overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.classList.add('hidden');
                setTimeout(() => {
                    if (this.overlay && this.overlay.parentNode) {
                        this.overlay.parentNode.removeChild(this.overlay);
                    }
                }, 500);
            }
        }, 500);
    }
    
    startCountdown() {
        const timerElement = document.getElementById('countdown-timer');
        if (!timerElement) return;
        
        let totalSeconds = 48 * 60 * 60; // 48 hours in seconds
        
        const updateTimer = () => {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (totalSeconds > 0) {
                totalSeconds--;
                setTimeout(updateTimer, 1000);
            }
        };
        
        updateTimer();
    }
    
    // Method to manually trigger popup (for testing)
    forceShow() {
        if (!this.overlay) {
            this.createPopup();
        }
        this.hasShown = false;
        this.show();
    }
}

// Initialize promotional popup when DOM is loaded
let promotionalPopup;

document.addEventListener('DOMContentLoaded', () => {
    promotionalPopup = new PromotionalPopup();
});

// Make it available globally for testing
window.promotionalPopup = promotionalPopup;
