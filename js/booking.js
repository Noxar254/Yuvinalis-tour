// Booking JS - Handles the booking form functionality

document.addEventListener('DOMContentLoaded', function() {
    // Tour details data
    const tourDetails = {
        city: {
            title: 'City Explorer Walk',
            desc: 'Discover the city\'s hidden gems, iconic landmarks, and vibrant culture with our expert guides. This urban adventure takes you through bustling streets, historic districts, and local hotspots.',
            duration: '3 hours',
            maxGroup: '20 people',
            availability: 'Daily, 9am and 2pm',
            price: 'KES 2,500',
            highlights: ['Guided city walks', 'Historical landmarks', 'Cultural insights', 'Local refreshments'],
            includes: ['Professional guide', 'Refreshments', 'City map', 'Souvenir photo'],
            image: 'images/background .png'
        },
        nature: {
            title: 'Nature Adventure Trail',
            desc: 'Immerse yourself in breathtaking natural scenery, hiking trails, and wildlife spotting. Experience Kenya\'s diverse ecosystems and incredible biodiversity.',
            duration: '4 hours',
            maxGroup: '15 people',
            availability: 'Tue, Thu, Sat, 8am',
            price: 'KES 3,000',
            highlights: ['Scenic hiking trails', 'Wildlife viewing', 'Photography spots', 'Nature interpretation'],
            includes: ['Expert guide', 'Snacks and water', 'Binoculars', 'First-aid support'],
            image: 'images/background .png'
        },
        history: {
            title: 'Historical Cultural Walk',
            desc: 'Step back in time and explore the rich history of the region with knowledgeable guides. Discover ancient traditions, colonial influences, and modern cultural developments.',
            duration: '2.5 hours',
            maxGroup: '12 people',
            availability: 'Wed, Fri, Sun, 10am',
            price: 'KES 2,000',
            highlights: ['Ancient sites', 'Cultural heritage', 'Local stories', 'Architectural marvels'],
            includes: ['Historian guide', 'Museum entries', 'Historical booklet', 'Audio equipment'],
            image: 'images/background .png'
        },
        food: {
            title: 'Food Tasting Tour',
            desc: 'Savor the best local cuisine and street food with our culinary experts in this gastronomic adventure. Experience the authentic flavors of Kenya and learn about traditional cooking methods.',
            duration: '3 hours',
            maxGroup: '10 people',
            availability: 'Mon, Wed, Sat, 11am',
            price: 'KES 3,500',
            highlights: ['Local delicacies', 'Street food exploration', 'Culinary traditions', 'Chef interactions'],
            includes: ['Food guide', 'All tastings', 'Recipe booklet', 'Bottled water'],
            image: 'images/background .png'
        },
        maasai: {
            title: 'Maasai Mara Safari Experience',
            desc: 'Explore the world-famous Maasai Mara National Reserve and witness the incredible wildlife in their natural habitat. This premium safari experience offers unparalleled wildlife viewing.',
            duration: '3 Days',
            maxGroup: '12 people',
            availability: 'Jun-Oct 2025',
            price: 'KES 24,500',
            highlights: ['Big Five sightings', 'Maasai village visit', 'Sunset game drives', 'Luxury tented camps'],
            includes: ['Safari vehicle', 'Professional guide', 'Accommodation', 'All meals', 'Park fees'],
            image: 'images/background .png'
        },
        amboseli: {
            title: 'Amboseli Kilimanjaro View',
            desc: 'Witness breathtaking views of Mt. Kilimanjaro from Amboseli National Park while spotting elephants and other wildlife. This photographic safari offers stunning landscapes and wildlife encounters.',
            duration: '2 Days',
            maxGroup: '8 people',
            availability: 'Year-round',
            price: 'KES 18,750',
            highlights: ['Mt. Kilimanjaro views', 'Elephant herds', 'Bird watching', 'Photography'],
            includes: ['Transport', 'Accommodation', 'Meals', 'Game drives', 'Guide'],
            image: 'images/background .png'
        },
        diani: {
            title: 'Diani Beach Coastal Getaway',
            desc: 'Relax and explore the beautiful Diani Beach, Kwale County with its pristine white sands and turquoise waters. This coastal retreat combines relaxation with adventure.',
            duration: '4 Days',
            maxGroup: '15 people',
            availability: 'Jan-Dec 2025',
            price: 'KES 22,800',
            highlights: ['White sandy beaches', 'Water sports', 'Coral reef snorkeling', 'Coastal cuisine'],
            includes: ['Beachfront accommodation', 'Breakfast', 'Airport transfers', 'Snorkeling gear'],
            image: 'images/background .png'
        },        mtkenya: {
            title: 'Mt. Kenya Climbing Expedition',
            desc: 'Conquer Mt. Kenya with our expert guides on this challenging but rewarding mountain climbing adventure. Experience Africa\'s second-highest peak with professional support.',
            duration: '5 Days',
            maxGroup: '10 people',
            availability: 'Feb-Sep 2025',
            price: 'KES 35,000',
            highlights: ['Summit attempt', 'Alpine landscapes', 'Unique flora & fauna', 'Spectacular viewpoints'],
            includes: ['Professional guides', 'Porters', 'Camping equipment', 'Meals', 'Park fees', 'Safety equipment'],
            image: 'images/background .png'
        },
        nakuru: {
            title: 'Lake Nakuru National Park',
            desc: 'Experience the stunning Lake Nakuru National Park, famous for its flamingo populations and rhino sanctuary. This park offers incredible bird watching opportunities and the chance to see both black and white rhinos.',
            duration: '2 Days',
            maxGroup: '10 people',
            availability: 'Year-round',
            price: 'KES 16,500',
            highlights: ['Flamingo populations', 'Rhino sanctuary', 'Bird watching', 'Scenic viewpoints'],
            includes: ['Transport', 'Accommodation', 'Meals', 'Game drives', 'Guide', 'Park fees'],
            image: 'images/background .png'
        },
        naivasha: {
            title: 'Lake Naivasha Adventure',
            desc: 'Discover the beauty of Lake Naivasha and the dramatic landscapes of Hell\'s Gate National Park. Enjoy boat rides, cycling safaris, and geothermal wonders in this unique destination.',
            duration: '2 Days',
            maxGroup: '12 people',
            availability: 'Year-round',
            price: 'KES 14,200',
            highlights: ['Boat rides', 'Cycling safari', 'Geothermal spa', 'Wildlife viewing'],
            includes: ['Boat rides', 'Bike rental', 'Accommodation', 'Meals', 'Park fees', 'Guide'],
            image: 'images/background .png'
        },
        tanzania: {
            title: 'Tanzania Explorer Safari',
            desc: 'Embark on an incredible journey through Tanzania\'s most famous parks. Experience the Great Migration in Serengeti and explore the Ngorongoro Crater, often called the "8th Wonder of the World".',
            duration: '7 Days',
            maxGroup: '8 people',
            availability: 'Jun-Oct 2025',
            price: 'KES 85,000',
            highlights: ['Serengeti migration', 'Ngorongoro Crater', 'Maasai culture', 'Big Five safari'],
            includes: ['Safari vehicle', 'Professional guide', 'Accommodation', 'All meals', 'Park fees', 'Flight transfers'],
            image: 'images/background .png'
        },
        uganda: {
            title: 'Uganda Gorilla Trekking',
            desc: 'Experience the ultimate wildlife encounter with mountain gorillas in their natural habitat. This exclusive tour includes gorilla trekking permits and visits to Uganda\'s pristine national parks.',
            duration: '5 Days',
            maxGroup: '8 people',
            availability: 'Jun-Sep 2025',
            price: 'KES 95,000',
            highlights: ['Mountain gorilla trekking', 'Golden monkey tracking', 'Cultural encounters', 'Forest exploration'],
            includes: ['Gorilla permits', 'Professional guide', 'Accommodation', 'All meals', 'Transport', 'Park fees'],
            image: 'images/background .png'
        },
        southafrica: {
            title: 'South Africa Explorer',
            desc: 'Explore the diverse beauty of South Africa from the cosmopolitan city of Cape Town to the world-renowned Kruger National Park. This comprehensive tour showcases the best of South African culture, wildlife, and landscapes.',
            duration: '10 Days',
            maxGroup: '12 people',
            availability: 'Apr-Oct 2025',
            price: 'KES 150,000',
            highlights: ['Cape Town city tour', 'Wine tasting', 'Kruger Big Five safari', 'Panorama Route'],
            includes: ['Luxury accommodation', 'All meals', 'Professional guide', 'Transport', 'Park fees', 'Wine tastings'],
            image: 'images/background .png'
        }
    };

    // Event details data
    const eventDetails = {
        kilimanjaro: {
            title: 'Kilimanjaro Base Camp Trek',
            desc: 'Join our special expedition to Kilimanjaro Base Camp. This trek offers breathtaking views and a chance to experience the majesty of Africa\'s highest mountain without the full summit climb.',
            location: 'Tanzania, Kilimanjaro Region',
            time: '5 Days, Departure 6:00 AM',
            participants: '15 max',
            difficulty: 'Moderate to Challenging',
            price: 'KES 45,000',
            items: ['Hiking boots', 'Warm clothing', 'Sleeping bag', 'Headlamp', 'Water bottles', 'Backpack'],
            image: 'images/background .png',
            dates: ['2025-07-15', '2025-08-10', '2025-09-05']
        },
        aberdare: {
            title: 'Aberdare Forest Adventure',
            desc: 'Explore the mystical Aberdare Forest with its unique wildlife, waterfalls, and breathtaking scenery. This adventure combines hiking, wildlife spotting, and nature immersion.',
            location: 'Central Kenya, Aberdare National Park',
            time: '2 Days, Departure 7:30 AM',
            participants: '20 max',
            difficulty: 'Moderate',
            price: 'KES 12,500',
            items: ['Hiking shoes', 'Rain jacket', 'Camera', 'Binoculars', 'Insect repellent', 'Day pack'],
            image: 'images/background .png',
            dates: ['2025-06-20', '2025-07-18', '2025-08-15', '2025-09-12']
        },
        mombasa: {
            title: 'Mombasa Coastal Trail',
            desc: 'Discover the beautiful Kenyan coast with this guided trail along beaches, coastal forests, and historic sites. Experience the rich coastal culture and beautiful ocean views.',
            location: 'Mombasa County, Coastal Region',
            time: '3 Days, Departure 8:00 AM',
            participants: '18 max',
            difficulty: 'Easy to Moderate',
            price: 'KES 18,000',
            items: ['Walking shoes', 'Swimwear', 'Sun protection', 'Light clothing', 'Camera', 'Beach towel'],
            image: 'images/background .png',
            dates: ['2025-06-05', '2025-07-10', '2025-08-07', '2025-09-20']
        },
        mtkenya: {
            title: 'Mount Kenya Summit Challenge',
            desc: 'Challenge yourself with this guided climb to Point Lenana, Mount Kenya\'s trekking summit. Experience high-altitude hiking with professional guides and support staff.',
            location: 'Mount Kenya National Park',
            time: '4 Days, Departure 5:30 AM',
            participants: '12 max',
            difficulty: 'Challenging',
            price: 'KES 28,000',
            items: ['Hiking boots', 'Warm layers', 'Gloves', 'Headlamp', 'Trekking poles', 'Warm sleeping bag'],
            image: 'images/background .png',
            dates: ['2025-06-15', '2025-07-20', '2025-08-18', '2025-09-10']
        },
        hiking: {
            title: 'Weekend Hiking Experience',
            desc: 'Perfect for beginners and families, this weekend hiking adventure introduces you to Kenya\'s beautiful trails with expert guides and a supportive group atmosphere.',
            location: 'Ngong Hills, Kajiado County',
            time: '1 Day, Departure 7:00 AM',
            participants: '25 max',
            difficulty: 'Easy',
            price: 'KES 3,500',
            items: ['Comfortable shoes', 'Water bottle', 'Light snacks', 'Hat', 'Sunscreen', 'Light jacket'],
            image: 'images/background .png',
            dates: ['2025-06-12', '2025-06-26', '2025-07-10', '2025-07-24', '2025-08-07', '2025-08-21', '2025-09-04', '2025-09-18']
        },
        teambuilding: {
            title: 'Corporate Team Building',
            desc: 'Strengthen your team\'s bond with our specially designed team building events that combine outdoor activities, problem-solving challenges, and adventure in natural settings.',
            location: 'Various locations near Nairobi',
            time: '1-2 Days, Customizable',
            participants: '30 max',
            difficulty: 'Easy to Moderate',
            price: 'KES 4,500 per person',
            items: ['Comfortable clothing', 'Team spirit', 'Notebook', 'Water bottle', 'Cap/hat', 'Sunscreen'],
            image: 'images/background .png',
            dates: ['Custom dates available - contact for scheduling']
        }
    };

    // DOM Elements for Tour Booking
    const tourSelect = document.getElementById('tour');
    const tourDetailsDiv = document.getElementById('tour-details');
    const tourPlaceholderDiv = document.getElementById('tour-placeholder');
    const tourImg = document.getElementById('tour-img');
    const tourTitle = document.getElementById('tour-title');
    const tourDesc = document.getElementById('tour-desc');
    const tourDuration = document.getElementById('tour-duration');
    const tourGroup = document.getElementById('tour-group');
    const tourAvailability = document.getElementById('tour-availability');
    const tourHighlights = document.getElementById('tour-highlights');
    const tourIncludes = document.getElementById('tour-includes');
    const tourPrice = document.getElementById('tour-price');
    const tourWhatsappBtn = document.getElementById('tour-whatsapp-book');
    const tourGuestsInput = document.getElementById('tour-guests');
    const tourForm = document.getElementById('tour-form');
    
    // DOM Elements for Event Booking
    const eventSelect = document.getElementById('event');
    const eventDetailsDiv = document.getElementById('event-details');
    const eventPlaceholderDiv = document.getElementById('event-placeholder');
    const eventImg = document.getElementById('event-img');
    const eventTitle = document.getElementById('event-title');
    const eventDesc = document.getElementById('event-desc');
    const eventLocation = document.getElementById('event-location');
    const eventTime = document.getElementById('event-time');
    const eventParticipants = document.getElementById('event-participants');
    const eventDifficulty = document.getElementById('event-difficulty');
    const eventItems = document.getElementById('event-items');
    const eventPrice = document.getElementById('event-price');
    const eventDateSelect = document.getElementById('event-date');
    const eventWhatsappBtn = document.getElementById('event-whatsapp-book');
    const eventGuestsInput = document.getElementById('event-guests');
    const eventForm = document.getElementById('event-form');
    
    // DOM Elements for the booking options (toggle buttons)
    const bookingOptionBtns = document.querySelectorAll('.booking-option-btn');
    const bookingContentDivs = document.querySelectorAll('.booking-content');
    const successDiv = document.getElementById('booking-success');
    
    // Set min date for tour booking
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('tour-date').setAttribute('min', formattedDate);
    
    // Booking option toggle (Tour vs Event)
    bookingOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetForm = this.getAttribute('data-form');
            
            // Update button states
            bookingOptionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide corresponding forms
            bookingContentDivs.forEach(div => {
                if (div.id === targetForm) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            });
            
            // Reset success message if visible
            successDiv.style.display = 'none';
            document.querySelectorAll('.booking-flex').forEach(flex => {
                flex.style.display = 'flex';
            });
        });
    });
    
    // Guest counter functionality for Tour Booking
    document.querySelector('#tour-booking .counter-btn.minus').addEventListener('click', function() {
        let currentVal = parseInt(tourGuestsInput.value);
        if (currentVal > 1) {
            tourGuestsInput.value = currentVal - 1;
        }
    });
    
    document.querySelector('#tour-booking .counter-btn.plus').addEventListener('click', function() {
        let currentVal = parseInt(tourGuestsInput.value);
        if (currentVal < 20) {
            tourGuestsInput.value = currentVal + 1;
        }
    });
    
    // Guest counter functionality for Event Booking
    document.querySelector('#event-booking .counter-btn.minus').addEventListener('click', function() {
        let currentVal = parseInt(eventGuestsInput.value);
        if (currentVal > 1) {
            eventGuestsInput.value = currentVal - 1;
        }
    });
    
    document.querySelector('#event-booking .counter-btn.plus').addEventListener('click', function() {
        let currentVal = parseInt(eventGuestsInput.value);
        if (currentVal < 10) {
            eventGuestsInput.value = currentVal + 1;
        }
    });
    
    // Tour selection functionality
    tourSelect.addEventListener('change', function() {
        const selectedTour = this.value;
        
        if (selectedTour && tourDetails[selectedTour]) {
            updateTourDetails(selectedTour);
            tourPlaceholderDiv.style.display = 'none';
            tourDetailsDiv.style.display = 'flex';
        } else {
            tourPlaceholderDiv.style.display = 'flex';
            tourDetailsDiv.style.display = 'none';
        }
    });
    
    // Event selection functionality
    eventSelect.addEventListener('change', function() {
        const selectedEvent = this.value;
        
        if (selectedEvent && eventDetails[selectedEvent]) {
            updateEventDetails(selectedEvent);
            populateEventDates(selectedEvent);
            eventPlaceholderDiv.style.display = 'none';
            eventDetailsDiv.style.display = 'flex';
        } else {
            eventPlaceholderDiv.style.display = 'flex';
            eventDetailsDiv.style.display = 'none';
        }
    });
    
    // Populate event dates based on selection
    function populateEventDates(eventId) {
        const event = eventDetails[eventId];
        eventDateSelect.innerHTML = '<option value="" disabled selected>Select available date</option>';
        
        if (Array.isArray(event.dates)) {
            event.dates.forEach(date => {
                const dateObj = new Date(date);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                const option = document.createElement('option');
                option.value = date;
                option.textContent = formattedDate;
                eventDateSelect.appendChild(option);
            });
        } else {
            // For custom dates like team building
            const option = document.createElement('option');
            option.value = "custom";
            option.textContent = event.dates;
            eventDateSelect.appendChild(option);
        }
    }
    
    // Input focus effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').classList.remove('focused');
            }
        });
    });
    
    // WhatsApp booking for Tours
    tourWhatsappBtn.addEventListener('click', function(e) {
        // Only prevent default if validation fails
        if (!tourForm.checkValidity()) {
            e.preventDefault();
            tourForm.reportValidity();
            return;
        }
        
        const tourName = tourSelect.options[tourSelect.selectedIndex].text;
        const date = document.getElementById('tour-date').value;
        const guests = document.getElementById('tour-guests').value;
        const name = document.getElementById('tour-name').value;
        const requests = document.getElementById('tour-requests').value;
        
        const whatsappMessage = `Hello! I would like to book a TOUR:\n- Tour: ${tourName}\n- Date: ${date}\n- Guests: ${guests}\n- Name: ${name}${requests ? '\n- Special Requests: ' + requests : ''}`;
        
        const whatsappURL = `https://wa.me/254123456789?text=${encodeURIComponent(whatsappMessage)}`;
        this.href = whatsappURL;
    });
    
    // WhatsApp booking for Events
    eventWhatsappBtn.addEventListener('click', function(e) {
        // Only prevent default if validation fails
        if (!eventForm.checkValidity()) {
            e.preventDefault();
            eventForm.reportValidity();
            return;
        }
        
        const eventName = eventSelect.options[eventSelect.selectedIndex].text;
        const eventDate = eventDateSelect.options[eventDateSelect.selectedIndex].text;
        const guests = document.getElementById('event-guests').value;
        const name = document.getElementById('event-name').value;
        const fitnessLevel = document.getElementById('fitness-level').options[document.getElementById('fitness-level').selectedIndex].text;
        const requests = document.getElementById('event-requests').value;
        
        const whatsappMessage = `Hello! I would like to book an EVENT:\n- Event: ${eventName}\n- Date: ${eventDate}\n- Participants: ${guests}\n- Name: ${name}\n- Fitness Level: ${fitnessLevel}${requests ? '\n- Special Requirements: ' + requests : ''}`;
        
        const whatsappURL = `https://wa.me/254123456789?text=${encodeURIComponent(whatsappMessage)}`;
        this.href = whatsappURL;
    });
    
    // Tour Form submission
    tourForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation is handled by the required attributes and browser validation
        
        // Hide form and show success message
        document.querySelector('#tour-booking .booking-flex').style.display = 'none';
        successDiv.style.display = 'block';
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Event Form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation is handled by the required attributes and browser validation
        
        // Hide form and show success message
        document.querySelector('#event-booking .booking-flex').style.display = 'none';
        successDiv.style.display = 'block';
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Function to update tour details
    function updateTourDetails(tourId) {
        const tour = tourDetails[tourId];
        
        // Update all tour details
        tourImg.src = tour.image;
        tourImg.alt = tour.title;
        tourTitle.textContent = tour.title;
        tourDesc.textContent = tour.desc;
        tourDuration.textContent = tour.duration;
        tourGroup.textContent = 'Max ' + tour.maxGroup;
        tourAvailability.textContent = tour.availability;
        tourPrice.innerHTML = `${tour.price} <span>per person</span>`;
        
        // Clear and update highlights
        tourHighlights.innerHTML = '';
        tour.highlights.forEach(highlight => {
            const item = document.createElement('div');
            item.className = 'info-item';
            item.innerHTML = `<i class="fas fa-check-circle"></i><span>${highlight}</span>`;
            tourHighlights.appendChild(item);
        });
        
        // Clear and update includes
        tourIncludes.innerHTML = '';
        tour.includes.forEach(include => {
            const item = document.createElement('div');
            item.className = 'info-item';
            item.innerHTML = `<i class="fas fa-plus-circle"></i><span>${include}</span>`;
            tourIncludes.appendChild(item);
        });
    }
    
    // Function to update event details
    function updateEventDetails(eventId) {
        const event = eventDetails[eventId];
        
        // Update all event details
        eventImg.src = event.image;
        eventImg.alt = event.title;
        eventTitle.textContent = event.title;
        eventDesc.textContent = event.desc;
        eventLocation.textContent = event.location;
        eventTime.textContent = event.time;
        eventParticipants.textContent = event.participants;
        eventDifficulty.textContent = event.difficulty;
        eventPrice.innerHTML = `${event.price} <span>per person</span>`;
        
        // Update the event date badge with first available date
        if (Array.isArray(event.dates) && event.dates.length > 0) {
            const firstDate = new Date(event.dates[0]);
            document.getElementById('event-month').textContent = firstDate.toLocaleDateString('en-US', { month: 'short' });
            document.getElementById('event-day').textContent = firstDate.getDate();
        }
        
        // Clear and update what to bring items
        eventItems.innerHTML = '';
        event.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'info-item';
            itemElement.innerHTML = `<i class="fas fa-backpack"></i><span>${item}</span>`;
            eventItems.appendChild(itemElement);
        });
    }
    
    // Check for direct links to specific booking sections
    function checkForDirectBookingLinks() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookingType = urlParams.get('booking');
        
        if (bookingType === 'event') {
            // Trigger click on event booking button
            document.querySelector('[data-form="event-booking"]').click();
            
            // If there's an event ID, select that event
            const eventId = urlParams.get('event');
            if (eventId && eventSelect.querySelector(`option[value="${eventId}"]`)) {
                eventSelect.value = eventId;
                eventSelect.dispatchEvent(new Event('change'));
            }
        } 
        else if (bookingType === 'tour') {
            // Trigger click on tour booking button (though it's default)
            document.querySelector('[data-form="tour-booking"]').click();
            
            // If there's a tour ID, select that tour
            const tourId = urlParams.get('tour');
            if (tourId && tourSelect.querySelector(`option[value="${tourId}"]`)) {
                tourSelect.value = tourId;
                tourSelect.dispatchEvent(new Event('change'));
            }
        }
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            card.style.animation = `fadeUp 0.5s ease-out ${0.1 * index}s both`;
        });
    }
    
    // Run animations when the page is loaded
    window.addEventListener('load', () => {
        animateOnScroll();
        checkForDirectBookingLinks();
    });
});
