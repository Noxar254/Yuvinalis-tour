// Tour Preview Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'tour-preview-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Tour Preview</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="Tour Preview">
                    <div class="tour-badge"></div>
                    <div class="tour-duration">
                        <i class="far fa-clock"></i>
                        <span></span>
                    </div>
                </div>
                <div class="modal-details">
                    <div class="modal-detail-row">
                        <div class="modal-detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span class="location"></span>
                        </div>
                        <div class="modal-detail-item">
                            <i class="fas fa-star"></i>
                            <span class="rating"></span>
                        </div>
                    </div>
                    <p class="modal-description"></p>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-price"></div>
                <div class="modal-actions">
                    <a href="booking.html?booking=tour" class="modal-btn primary">
                        <span>Book Now</span>
                        <i class="fas fa-paper-plane"></i>
                    </a>
                    <a href="tours.html" class="modal-btn secondary">
                        <span>View Details</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking on close button or outside the modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Get all tour cards
    const tourCards = document.querySelectorAll('.tour-card');
    
    tourCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't show modal if clicking on the view details button
            if (e.target.closest('.view-details-btn')) {
                return;
            }
            
            // Get tour data from the card
            const tourTitle = card.querySelector('h3').textContent;
            const tourImage = card.querySelector('.tour-image img').getAttribute('src');
            const tourBadge = card.querySelector('.tour-badge').textContent;
            const tourDuration = card.querySelector('.tour-duration span').textContent;
            const tourLocation = card.querySelector('.detail-item:first-child span').textContent;
            const tourRating = card.querySelector('.detail-item:nth-child(2) span').textContent;
            const tourDescription = card.querySelector('.tour-description').textContent;
            const tourPrice = card.querySelector('.tour-price span').textContent;
            
            // Set modal content
            modal.querySelector('.modal-header h3').textContent = tourTitle;
            modal.querySelector('.modal-image img').setAttribute('src', tourImage);
            modal.querySelector('.modal-image img').setAttribute('alt', tourTitle);
            modal.querySelector('.tour-badge').textContent = tourBadge;
            modal.querySelector('.tour-duration span').textContent = tourDuration;
            modal.querySelector('.location').textContent = tourLocation;
            modal.querySelector('.rating').textContent = tourRating;
            modal.querySelector('.modal-description').textContent = tourDescription;
            modal.querySelector('.modal-price').textContent = tourPrice;
            
            // Set badge color based on type
            const badge = modal.querySelector('.tour-badge');
            badge.className = 'tour-badge'; // Reset class
            
            if (tourBadge.includes('Hot Deal')) {
                badge.style.backgroundColor = '#e74c3c';
            } else if (tourBadge.includes('Popular')) {
                badge.style.backgroundColor = '#3498db';
            } else if (tourBadge.includes('Luxury')) {
                badge.style.backgroundColor = '#9b59b6';
            } else if (tourBadge.includes('Adventure')) {
                badge.style.backgroundColor = '#2ecc71';
            } else if (tourBadge.includes('Wildlife')) {
                badge.style.backgroundColor = '#f39c12';
            } else if (tourBadge.includes('Premium')) {
                badge.style.backgroundColor = '#1abc9c';
            } else if (tourBadge.includes('Featured')) {
                badge.style.backgroundColor = '#e67e22';
            } else if (tourBadge.includes('Beach')) {
                badge.style.backgroundColor = '#00b8d4';
            } else if (tourBadge.includes('Cultural')) {
                badge.style.backgroundColor = '#9c27b0';
            }
            
            // Open modal
            openModal();
        });
    });
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    }
});
