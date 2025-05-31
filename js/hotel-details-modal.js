// Hotel Details Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hotel details modal script loaded');
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'hotel-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Hotel Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="Hotel Preview">
                    <div class="hotel-badge"></div>
                    <div class="hotel-price">
                        <span class="price"></span>
                        <span class="per-night">per night</span>
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
                    <div class="hotel-amenities">
                        <h4>Amenities</h4>
                        <div class="amenities-list"></div>
                    </div>
                    <div class="hotel-description">
                        <h4>About this property</h4>
                        <p class="description-text"></p>
                    </div>
                    <div class="hotel-features">
                        <h4>Key Features</h4>
                        <ul class="features-list"></ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-price-summary">
                    <span class="total-price"></span>
                    <span class="price-note">+ taxes & fees</span>
                </div>
                <div class="modal-actions">
                    <a href="booking.html?service=hotel" class="modal-btn primary">
                        <span>Book Now</span>
                        <i class="fas fa-calendar-check"></i>
                    </a>
                    <a href="accommodations.html" class="modal-btn secondary">
                        <span>View All Hotels</span>
                        <i class="fas fa-building"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Hotel data with detailed information
    const hotelData = {
        'Danat Al Ain Resort': {
            description: 'A luxurious all-inclusive resort nestled in the heart of Al Ain, offering spectacular mountain views and world-class amenities. Perfect for families and couples seeking a tranquil getaway.',
            features: [
                'All-inclusive dining and beverages',
                'Multiple swimming pools and waterslides',
                'Kids club and family activities',
                'Spa and wellness center',
                'Tennis court and fitness center',
                'Shuttle service to Al Ain Zoo'
            ]
        },
        'Flamingo Beach Hotel': {
            description: 'A charming beachside retreat in Umm Al Quwain, offering direct beach access and stunning coastal views. Ideal for relaxation and water sports enthusiasts.',
            features: [
                'Private beach access',
                'Beachfront dining options',
                'Water sports equipment rental',
                'Family-friendly facilities',
                'Spa and massage services',
                'Evening entertainment programs'
            ]
        },
        'The Cove Rotana': {
            description: 'An elegant all-inclusive resort in Ras Al Khaimah, featuring luxurious accommodations with stunning sea views and exceptional dining experiences.',
            features: [
                'All-inclusive premium dining',
                'Private beach club',
                'Multiple pools with sea views',
                'Premium spa services',
                'Water sports center',
                'Kids club and teen zone'
            ]
        },
        'Danat Jebel Dhanna': {
            description: 'A sophisticated oceanfront resort offering unparalleled luxury and privacy on the pristine beaches of Jebel Dhanna with world-class facilities.',
            features: [
                'Oceanfront luxury suites',
                'Unlimited premium beverages',
                'Private beach cabanas',
                'Championship golf course nearby',
                'Desert safari experiences',
                'Fine dining restaurants'
            ]
        },
        'Oryx Grand Hotel Al Ain': {
            description: 'A distinguished hotel in Al Ain offering modern comfort with traditional Arabian hospitality, featuring stunning mountain views and easy access to local attractions.',
            features: [
                'Mountain and garden views',
                'Complimentary Al Ain Zoo access',
                'Traditional Arabian architecture',
                'Business center facilities',
                'Fitness center and pool',
                'Local cultural experiences'
            ]
        }
    };
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Open modal function
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
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
      // Add click event listeners to all hotel view details buttons
    function initializeHotelButtons() {
        const viewDetailsButtons = document.querySelectorAll('.hotel-card .view-details-btn');
        console.log(`Found ${viewDetailsButtons.length} hotel view details buttons`);
        
        viewDetailsButtons.forEach(button => {
            // Remove any existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();            
            const hotelCard = newButton.closest('.hotel-card');
            if (!hotelCard) return;
            
            try {
                // Get hotel data from the card
                const hotelTitle = hotelCard.querySelector('h3')?.textContent || 'Hotel Name';
                const hotelImage = hotelCard.querySelector('.hotel-image img')?.getAttribute('src') || '';
                const hotelBadge = hotelCard.querySelector('.hotel-badge')?.textContent || 'Hotel';
                const hotelPrice = hotelCard.querySelector('.hotel-price span:first-child')?.textContent || 'Price on request';
                const hotelLocation = hotelCard.querySelector('.detail-item:first-child span')?.textContent || 'Location';
                const hotelRating = hotelCard.querySelector('.detail-item:nth-child(2) span')?.textContent || 'Rating';
                
                // Get amenities
                const amenitiesElements = hotelCard.querySelectorAll('.hotel-amenities span');
                const amenities = Array.from(amenitiesElements).map(el => el.innerHTML).join('');
                
                // Get detailed information from our data
                const hotelInfo = hotelData[hotelTitle] || {
                    description: 'Experience luxury and comfort at this exceptional hotel with premium amenities and exceptional service.',
                    features: ['Premium accommodations', 'Exceptional service', 'Modern facilities', 'Prime location']
                };
                
                // Set modal content
                modal.querySelector('.modal-header h3').textContent = hotelTitle;
                modal.querySelector('.modal-image img').setAttribute('src', hotelImage);
                modal.querySelector('.modal-image img').setAttribute('alt', hotelTitle);
                modal.querySelector('.hotel-badge').textContent = hotelBadge;
                modal.querySelector('.price').textContent = hotelPrice;
                modal.querySelector('.location').textContent = hotelLocation;
                modal.querySelector('.rating').textContent = hotelRating;
                modal.querySelector('.amenities-list').innerHTML = amenities;
                modal.querySelector('.description-text').textContent = hotelInfo.description;
                modal.querySelector('.total-price').textContent = hotelPrice;
                
                // Set features list
                const featuresList = modal.querySelector('.features-list');
                featuresList.innerHTML = hotelInfo.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('');
                
                // Set badge color based on type
                const badgeElement = modal.querySelector('.hotel-badge');
                badgeElement.className = 'hotel-badge';
                if (hotelBadge.toLowerCase().includes('all-inclusive')) {
                    badgeElement.classList.add('all-inclusive');
                } else if (hotelBadge.toLowerCase().includes('beachside') || hotelBadge.toLowerCase().includes('oceanfront')) {
                    badgeElement.classList.add('beachside');
                } else if (hotelBadge.toLowerCase().includes('mountain')) {
                    badgeElement.classList.add('mountain');
                } else {
                    badgeElement.classList.add('premium');
                }
                
                // Update booking link with hotel information
                const bookingBtn = modal.querySelector('.modal-btn.primary');
                bookingBtn.href = `booking.html?service=hotel&hotel=${encodeURIComponent(hotelTitle)}`;
                
                // Open modal
                openModal();
                
                console.log('Hotel modal opened for:', hotelTitle);
                  } catch (error) {
                console.error('Error opening hotel modal:', error);
            }
            });
        });
    }
    
    // Initialize hotel buttons when DOM is ready
    initializeHotelButtons();
    
    // Re-initialize buttons if the hotel section is dynamically updated
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                const hasHotelCards = addedNodes.some(node => 
                    node.nodeType === 1 && 
                    (node.classList?.contains('hotel-card') || node.querySelector?.('.hotel-card'))
                );
                if (hasHotelCards) {
                    setTimeout(initializeHotelButtons, 100);
                }
            }
        });
    });
    
    // Observe the hotels section for changes
    const hotelsSection = document.querySelector('.hotels-section');
    if (hotelsSection) {
        observer.observe(hotelsSection, { childList: true, subtree: true });
    }
});
