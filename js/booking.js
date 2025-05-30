// Simplified Booking Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const serviceTypeSelect = document.getElementById('service-type');
    const tourSelectionDiv = document.getElementById('tour-selection');
    const tourTypeSelect = document.getElementById('tour-type');
    const simpleForm = document.getElementById('simple-form');
    const bookingSuccess = document.getElementById('booking-success');
    const simpleBooking = document.getElementById('simple-booking');
    const whatsappBtn = document.getElementById('whatsapp-contact');

    // Handle service type change
    serviceTypeSelect.addEventListener('change', function() {
        const selectedService = this.value;
        
        if (selectedService === 'tour-booking') {
            // Show tour selection dropdown
            tourSelectionDiv.style.display = 'block';
            tourTypeSelect.setAttribute('required', 'required');
            
            // Add smooth animation
            tourSelectionDiv.style.opacity = '0';
            tourSelectionDiv.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                tourSelectionDiv.style.transition = 'all 0.3s ease';
                tourSelectionDiv.style.opacity = '1';
                tourSelectionDiv.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Hide tour selection dropdown
            tourSelectionDiv.style.display = 'none';
            tourTypeSelect.removeAttribute('required');
            tourTypeSelect.value = '';
        }
        
        // Update WhatsApp message based on service type
        updateWhatsAppMessage();
    });

    // Handle tour type change
    tourTypeSelect.addEventListener('change', function() {
        updateWhatsAppMessage();
    });

    // Update WhatsApp message
    function updateWhatsAppMessage() {
        const serviceType = serviceTypeSelect.value;
        const tourType = tourTypeSelect.value;
        const fullName = document.getElementById('full-name').value;
        
        let message = `Hello! I'm interested in ${getServiceDisplayName(serviceType)}`;
        
        if (serviceType === 'tour-booking' && tourType) {
            message += ` - specifically ${getTourDisplayName(tourType)}`;
        }
        
        if (fullName) {
            message = `Hello! My name is ${fullName}. I'm interested in ${getServiceDisplayName(serviceType)}`;
            if (serviceType === 'tour-booking' && tourType) {
                message += ` - specifically ${getTourDisplayName(tourType)}`;
            }
        }
        
        message += '. Could you please provide me with more information?';
        
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/254123456789?text=${encodedMessage}`;
    }

    // Get service display name
    function getServiceDisplayName(serviceValue) {
        const serviceNames = {
            'event-booking': 'Event Booking',
            'tour-booking': 'Tour Booking',
            'flight-booking': 'Flight Booking',
            'hotel-enquiry': 'Hotel Enquiry',
            'general-enquiry': 'General Enquiry'
        };
        return serviceNames[serviceValue] || serviceValue;
    }

    // Get tour display name
    function getTourDisplayName(tourValue) {
        const tourNames = {
            // Dubai Tours
            'desert-safari': 'Desert Safari',
            'creek-dhow': 'Creek Dhow Cruise',
            'marina-dhow': 'Marina Dhow Cruise',
            'burj-khalifa': 'Burj Khalifa at the Top',
            'dubai-city-tour': 'Dubai City Tour',
            'global-village': 'Global Village',
            'atlantis': 'Atlantis Aquaventure',
            'img-world': 'IMG Worlds of Adventure',
            'dubai-frame': 'Dubai Frame',
            'miracle-garden': 'Dubai Miracle Garden',
            'jet-ski': 'Jet Ski Experience',
            'wild-wadi': 'Wild Wadi Water Park',
            'museum-future': 'Museum of the Future & Lake Safari',
            'dubai-opera': 'Dubai Opera Show',
            'dubai-aquarium': 'Dubai Aquarium & Underwater Zoo',
            'zabeel-park': 'Zabeel Park & Dubai Garden Glow',
            'golden-frame': 'Golden Frame Art Gallery',
            'traditional-souks': 'Traditional Souks Tour',
            'helicopter-ride': 'Helicopter Ride over Dubai',
            'luxury-yacht': 'Luxury Yacht Party',
            'skydiving': 'Skydiving Experience',
            'hot-air-balloon': 'Hot Air Balloon Ride',
            'private-beach': 'Private Beach Experience',
            'quad-biking': 'Quad Biking Adventure',
            'camel-riding': 'Camel Riding Experience',
            'sand-boarding': 'Sand Boarding',
            
            // Kenya Tours
            'maasai-mara': 'Maasai Mara Safari Experience',
            'amboseli': 'Amboseli Kilimanjaro View',
            'diani-beach': 'Diani Beach Coastal Getaway',
            'mount-kenya': 'Mt. Kenya Climbing Expedition',
            'lake-nakuru': 'Lake Nakuru National Park',
            'lake-naivasha': 'Lake Naivasha Adventure',
            'city-explorer': 'City Explorer Walk',
            'nature-trail': 'Nature Adventure Trail',
            'historical-walk': 'Historical Cultural Walk',
            'food-tour': 'Food Tasting Tour',
            
            // International Tours
            'tanzania-safari': 'Tanzania Explorer Safari',
            'uganda-gorilla': 'Uganda Gorilla Trekking',
            'south-africa': 'South Africa Explorer'
        };
        return tourNames[tourValue] || tourValue;
    }

    // Update WhatsApp message when name changes
    document.getElementById('full-name').addEventListener('input', updateWhatsAppMessage);

    // Handle form submission
    simpleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.serviceType || !data.fullName || !data.phone || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Additional validation for tour booking
        if (data.serviceType === 'tour-booking' && !data.tourType) {
            alert('Please select a tour for tour booking.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Simulate form submission
        submitForm(data);
    });

    // Simulate form submission
    function submitForm(data) {
        // Show loading state
        const submitBtn = simpleForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            simpleBooking.style.display = 'none';
            bookingSuccess.style.display = 'block';
            
            // Scroll to success message
            bookingSuccess.scrollIntoView({ behavior: 'smooth' });
            
            // In a real application, you would send the data to your server here
            console.log('Form data:', data);
            
            // Reset button state (in case user goes back)
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('preferred-date').setAttribute('min', today);

    // Initialize WhatsApp message
    updateWhatsAppMessage();
});

// Additional utility functions
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let phone = input.value.replace(/\D/g, '');
    
    // Format the phone number (basic formatting)
    if (phone.length >= 10) {
        if (phone.startsWith('254')) {
            // Kenyan number
            phone = '+' + phone;
        } else if (phone.startsWith('0')) {
            // Convert local Kenyan number to international
            phone = '+254' + phone.substring(1);
        } else if (!phone.startsWith('+')) {
            // Add + if not present
            phone = '+' + phone;
        }
    }
    
    input.value = phone;
}

// Apply phone formatting on blur
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            formatPhoneNumber(this);
        });
    }
});
