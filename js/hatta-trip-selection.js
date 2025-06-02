// Hatta Road Trip Package and Pickup Selection
document.addEventListener('DOMContentLoaded', function() {
    // Variables to store selections
    let selectedPackage = null;
    let selectedPickup = null;
    
    // Package Selection
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            packageCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Store selected package data
            selectedPackage = {
                name: this.getAttribute('data-package'),
                price: this.getAttribute('data-price')
            };
            
            // Update booking buttons
            updateBookingButtons();
        });
    });
    
    // Pickup Point Selection
    const pickupPoints = document.querySelectorAll('.pickup-point');
    
    pickupPoints.forEach(point => {
        point.addEventListener('click', function() {
            // Remove selected class from all pickup points
            pickupPoints.forEach(p => p.classList.remove('selected'));
            
            // Add selected class to clicked pickup point
            this.classList.add('selected');
            
            // Store selected pickup data
            selectedPickup = {
                id: this.getAttribute('data-pickup'),
                location: this.getAttribute('data-location'),
                time: this.getAttribute('data-time')
            };
            
            // Update booking buttons
            updateBookingButtons();
        });
    });
    
    // Function to update booking buttons with selected information
    function updateBookingButtons() {
        const whatsappBtn = document.querySelector('.booking-btn.secondary');
        const bookNowBtn = document.querySelector('.booking-btn.primary');
        
        if (selectedPackage && selectedPickup) {
            // Update WhatsApp button
            const packageName = selectedPackage.name.charAt(0).toUpperCase() + selectedPackage.name.slice(1);
            const whatsappText = `Hi! I'm interested in booking the Hatta Road Trip on June 15th, 2025. I would like to book the ${packageName} Package (${selectedPackage.price} AED) with pickup from ${selectedPickup.location} at ${selectedPickup.time}. Can you please help me with the reservation?`;
            const encodedText = encodeURIComponent(whatsappText);
            whatsappBtn.href = `https://wa.me/971561510931?text=${encodedText}`;
            
            // Update Book Now button with query parameters
            bookNowBtn.href = `booking.html?event=hatta-road-trip&date=2025-06-15&package=${selectedPackage.name}&price=${selectedPackage.price}&pickup=${selectedPickup.id}&pickup_time=${encodeURIComponent(selectedPickup.time)}`;
        }
    }
    
    // Set the first package and pickup point as selected by default
    if (packageCards.length > 0) {
        packageCards[0].click();
    }
    
    if (pickupPoints.length > 0) {
        pickupPoints[0].click();
    }
});
