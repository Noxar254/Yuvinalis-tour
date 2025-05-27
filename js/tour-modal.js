// Tour Modal Functionality - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Tour data - This would normally come from a database
    const tourData = {
        'maasai-mara': {
            title: 'Maasai Mara Safari Experience',
            image: 'images/background .png',
            badge: 'Popular',
            duration: '3 Days',
            location: 'Maasai Mara National Reserve',
            groupSize: 'Max Group: 12 people',
            availability: 'Available: Jun-Oct 2025',
            price: 'KES 24,500',
            description: 'Experience the magic of the Maasai Mara with our 3-day safari adventure. Witness the incredible wildlife including lions, elephants, giraffes, and if you\'re lucky, the great wildebeest migration. Our experienced guides will take you to the best spots for wildlife viewing and photography.',
            highlights: [
                'Game drives in custom 4x4 safari vehicles',
                'Luxury tented accommodation with full board meals',
                'Professional wildlife guides and trackers',
                'Visit to a Maasai village to experience local culture',
                'Sundowner drinks overlooking the savannah'
            ]
        },
        'amboseli': {
            title: 'Amboseli Kilimanjaro View',
            image: 'images/background .png',
            badge: 'Featured',
            duration: '2 Days',
            location: 'Amboseli National Park',
            groupSize: 'Max Group: 8 people',
            availability: 'Available: Year-round',
            price: 'KES 18,750',
            description: 'Enjoy breathtaking views of Mt. Kilimanjaro from Amboseli National Park. This 2-day tour offers amazing opportunities to see elephants against the backdrop of Africa\'s highest mountain. The park is known for its large elephant herds and stunning landscapes.',
            highlights: [
                'Clear views of Mt. Kilimanjaro (weather permitting)',
                'Up-close encounters with elephant herds',
                'Comfortable lodge accommodation with meals included',
                'Expert guides with extensive knowledge of the area',
                'Bird watching opportunities with over 400 species'
            ]
        },
        'diani-beach': {
            title: 'Diani Beach Coastal Getaway',
            image: 'images/background .png',
            badge: 'Hot Deal',
            duration: '4 Days',
            location: 'Diani Beach, Kwale County',
            groupSize: 'Max Group: 15 people',
            availability: 'Available: Jan-Dec 2025',
            price: 'KES 22,800',
            description: 'Relax on the pristine white sands of Diani Beach, one of Kenya\'s most beautiful coastal destinations. Enjoy water sports, marine life, and the laid-back coastal atmosphere. Our package includes beachfront accommodation and various activities to make your stay memorable.',
            highlights: [
                'Stay at beachfront resorts with ocean views',
                'Snorkeling trip to coral reefs with marine life',
                'Glass-bottom boat excursion to see underwater life',
                'Optional water sports (jet skiing, kite surfing, etc.)',
                'Sunset dhow cruise with dinner'
            ]
        },
        'mt-kenya': {
            title: 'Mt. Kenya Climbing Expedition',
            image: 'images/background .png',
            badge: 'Adventure',
            duration: '5 Days',
            location: 'Mount Kenya National Park',
            groupSize: 'Max Group: 10 people',
            availability: 'Available: Feb-Sep 2025',
            price: 'KES 35,000',
            description: 'Challenge yourself with a climb up Africa\'s second-highest peak. Our 5-day expedition takes you through diverse vegetation zones and stunning landscapes. This trek is designed for those with moderate fitness levels and a sense of adventure.',
            highlights: [
                'Professional mountain guides and porters',
                'All camping equipment and meals provided',
                'Safety equipment and emergency oxygen',
                'Scenic routes through bamboo forests and alpine moorlands',
                'Summit certificate upon successful completion'
            ]
        },
        'lake-nakuru': {
            title: 'Lake Nakuru Pink Flamingos',
            image: 'images/background .png',
            badge: 'Nature',
            duration: '2 Days',
            location: 'Lake Nakuru National Park',
            groupSize: 'Max Group: 14 people',
            availability: 'Available: Year-round',
            price: 'KES 16,500',
            description: 'Discover the spectacular pink flamingo colonies at Lake Nakuru, one of Kenya\'s most famous bird sanctuaries. This alkaline lake attracts millions of flamingos and other bird species, creating a breathtaking pink carpet across the water.',
            highlights: [
                'Witness millions of pink flamingos in their natural habitat',
                'Spot rhinos, lions, and leopards in the park',
                'Bird watching with over 450 species recorded',
                'Visit Baboon Cliff viewpoint for panoramic lake views',
                'Comfortable lodge accommodation with guided game drives'
            ]
        },
        'naivasha': {
            title: 'Naivasha Weekend Escape',
            image: 'images/background .png',
            badge: 'Weekend',
            duration: '2 Days',
            location: 'Lake Naivasha, Rift Valley',
            groupSize: 'Max Group: 12 people',
            availability: 'Available: Weekends',
            price: 'KES 12,800',
            description: 'Escape to the serene shores of Lake Naivasha for a perfect weekend getaway. Enjoy boat rides, walking safaris, and the beautiful Rift Valley scenery. This tour combines relaxation with adventure in one of Kenya\'s most scenic locations.',
            highlights: [
                'Boat safari on Lake Naivasha with hippo spotting',
                'Walking safari on Crescent Island with giraffes and zebras',
                'Visit Hell\'s Gate National Park for hiking and cycling',
                'Hot springs visit for a relaxing soak',
                'Scenic Rift Valley escarpment views'
            ]
        },
        'tanzania': {
            title: 'Tanzania Safari & Zanzibar',
            image: 'images/background .png',
            badge: 'International',
            duration: '7 Days',
            location: 'Serengeti & Zanzibar, Tanzania',
            groupSize: 'Max Group: 10 people',
            availability: 'Available: Jul-Nov 2025',
            price: 'KES 95,000',
            description: 'Combine the ultimate safari experience in the Serengeti with the tropical paradise of Zanzibar. This 7-day adventure takes you from the heart of African wilderness to pristine beaches with crystal-clear waters and rich cultural heritage.',
            highlights: [
                'Serengeti National Park game drives with Big Five viewing',
                'Witness the great wildebeest migration (seasonal)',
                'Zanzibar spice tour and Stone Town cultural experience',
                'Pristine beaches with snorkeling and diving opportunities',
                'All transfers, accommodations, and meals included'
            ]
        },
        'uganda': {
            title: 'Uganda Gorilla Tracking',
            image: 'images/background .png',
            badge: 'Premium',
            duration: '5 Days',
            location: 'Bwindi Impenetrable Forest, Uganda',
            groupSize: 'Max Group: 8 people',
            availability: 'Available: Jun-Oct 2025',
            price: 'KES 120,000',
            description: 'Embark on a once-in-a-lifetime gorilla tracking adventure in Uganda\'s Bwindi Impenetrable Forest. Get up close with endangered mountain gorillas in their natural habitat, an experience that will leave you with memories to last forever.',
            highlights: [
                'Mountain gorilla tracking with expert guides',
                'Bwindi Impenetrable Forest canopy walks',
                'Cultural encounters with local Batwa communities',
                'Premium eco-lodge accommodation',
                'All permits, transfers, and meals included'
            ]        },
        'lake-nakuru': {
            title: 'Lake Nakuru National Park',
            image: 'images/background .png',
            badge: 'Popular',
            duration: '2 Days',
            location: 'Lake Nakuru National Park',
            groupSize: 'Max Group: 10 people',
            availability: 'Available: Year-round',
            price: 'KES 16,500',
            description: 'Experience the stunning Lake Nakuru National Park, famous for its flamingo populations and rhino sanctuary. This park offers incredible bird watching opportunities and the chance to see both black and white rhinos.',
            highlights: [
                'Millions of flamingos creating a pink blanket on the lake',
                'Black and white rhino sightings in the sanctuary',
                'Over 450 bird species recorded in the park',
                'Stunning views from Baboon Cliff viewpoint',
                'Leopard and lion spotting opportunities'
            ]
        },
        'naivasha': {
            title: 'Lake Naivasha Adventure',
            image: 'images/background .png',
            badge: 'Scenic',
            duration: '2 Days',
            location: 'Lake Naivasha & Hell\'s Gate',
            groupSize: 'Max Group: 12 people',
            availability: 'Available: Year-round',
            price: 'KES 14,200',
            description: 'Discover the beauty of Lake Naivasha and the dramatic landscapes of Hell\'s Gate National Park. Enjoy boat rides, cycling safaris, and geothermal wonders in this unique destination.',
            highlights: [
                'Boat rides on Lake Naivasha with hippo watching',
                'Cycling safari through Hell\'s Gate National Park',
                'Visit to Crescent Island Game Sanctuary',
                'Geothermal spa experience at Olkaria',
                'Rock climbing and hiking in scenic gorges'
            ]
        },
        'tanzania': {
            title: 'Tanzania Explorer Safari',
            image: 'images/background .png',
            badge: 'Adventure',
            duration: '7 Days',
            location: 'Serengeti & Ngorongoro, Tanzania',
            groupSize: 'Max Group: 8 people',
            availability: 'Available: Jun-Oct 2025',
            price: 'KES 85,000',
            description: 'Embark on an incredible journey through Tanzania\'s most famous parks. Experience the Great Migration in Serengeti and explore the Ngorongoro Crater, often called the "8th Wonder of the World".',
            highlights: [
                'Serengeti National Park game drives during migration',
                'Ngorongoro Crater floor safari experience',
                'Cultural visit to Maasai villages',
                'Professional Tanzanian guides and safari vehicles',
                'Luxury tented camps with full board meals'
            ]
        },
        'uganda': {
            title: 'Uganda Gorilla Trekking',
            image: 'images/background .png',
            badge: 'Exclusive',
            duration: '5 Days',
            location: 'Bwindi Impenetrable Forest, Uganda',
            groupSize: 'Max Group: 8 people',
            availability: 'Available: Jun-Sep 2025',
            price: 'KES 95,000',
            description: 'Experience the ultimate wildlife encounter with mountain gorillas in their natural habitat. This exclusive tour includes gorilla trekking permits and visits to Uganda\'s pristine national parks.',
            highlights: [
                'Mountain gorilla trekking with expert guides',
                'Bwindi Impenetrable Forest exploration',
                'Golden monkey tracking experience',
                'Cultural encounters with local communities',
                'All gorilla permits and park fees included'
            ]
        },
        'south-africa': {
            title: 'South Africa Explorer',
            image: 'images/background .png',
            badge: 'New',
            duration: '10 Days',
            location: 'Cape Town & Kruger, South Africa',
            groupSize: 'Max Group: 12 people',
            availability: 'Available: Apr-Oct 2025',
            price: 'KES 150,000',
            description: 'Explore the diverse beauty of South Africa from the cosmopolitan city of Cape Town to the world-renowned Kruger National Park. This comprehensive tour showcases the best of South African culture, wildlife, and landscapes.',
            highlights: [
                'Cape Town city tour including Table Mountain cable car',
                'Wine tasting in the famous Stellenbosch wine region',
                'Kruger National Park Big Five safari experience',
                'Panorama Route with Blyde River Canyon views',
                'Luxury accommodations and all meals included'
            ]
        }
    };

    // Get all the necessary modal elements (using existing modal structure from tours.html)
    const modalOverlay = document.querySelector('.tour-modal-overlay');
    const modal = document.querySelector('.tour-modal');
    const modalClose = document.querySelector('.close-modal');
    const modalImage = document.querySelector('#modal-tour-image');
    const modalBadge = document.querySelector('#modal-tour-badge');
    const modalTitle = document.querySelector('#modal-tour-title');
    const modalDuration = document.querySelector('#modal-tour-duration');
    const modalLocation = document.querySelector('#modal-tour-location');
    const modalGroupSize = document.querySelector('#modal-tour-group-size');
    const modalAvailability = document.querySelector('#modal-tour-availability');
    const modalDescription = document.querySelector('#modal-tour-description');
    const modalHighlightsList = document.querySelector('#modal-tour-highlights');
    const modalPriceValue = document.querySelector('#modal-tour-price');
    const bookTourBtn = document.querySelector('#modal-book-tour-btn');

    // Get all "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    // Add click event listeners to each "View Details" button
    viewDetailsButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the tour ID from the data-tour attribute
            const tourId = this.getAttribute('data-tour');
            
            if (tourId && tourData[tourId]) {
                const tour = tourData[tourId];
                
                // Populate the modal with tour data
                if (modalImage) modalImage.src = tour.image;
                if (modalImage) modalImage.alt = tour.title;
                if (modalBadge) modalBadge.textContent = tour.badge;
                if (modalTitle) modalTitle.textContent = tour.title;
                if (modalDuration) modalDuration.textContent = tour.duration;
                if (modalLocation) modalLocation.textContent = tour.location;
                if (modalGroupSize) modalGroupSize.textContent = tour.groupSize;
                if (modalAvailability) modalAvailability.textContent = tour.availability;
                if (modalDescription) modalDescription.textContent = tour.description;
                
                // Clear and repopulate highlights list
                if (modalHighlightsList) {
                    modalHighlightsList.innerHTML = '';
                    tour.highlights.forEach(highlight => {
                        const li = document.createElement('li');
                        li.textContent = highlight;
                        modalHighlightsList.appendChild(li);
                    });
                }
                
                if (modalPriceValue) modalPriceValue.textContent = tour.price;                // Map tour IDs to booking form values
                const tourIdMapping = {
                    'maasai-mara': 'maasai',
                    'amboseli': 'amboseli',
                    'diani-beach': 'diani',
                    'mt-kenya': 'mtkenya',
                    'lake-nakuru': 'nakuru',
                    'naivasha': 'naivasha',
                    'tanzania': 'tanzania',
                    'uganda': 'uganda',
                    'south-africa': 'southafrica'
                };
                
                // Set the booking link with more detailed parameters
                if (bookTourBtn) {
                    const mappedTourId = tourIdMapping[tourId] || tourId;
                    const bookingUrl = `booking.html?booking=tour&tour=${mappedTourId}&title=${encodeURIComponent(tour.title)}&price=${encodeURIComponent(tour.price)}`;
                    bookTourBtn.href = bookingUrl;
                    
                    // Add click event to booking button for better tracking
                    bookTourBtn.onclick = function(e) {
                        // Optional: Add analytics or tracking here
                        console.log(`Booking initiated for: ${tour.title} (ID: ${mappedTourId})`);
                        // Allow the link to proceed normally
                        return true;
                    };
                }
                
                // Show the modal
                if (modalOverlay) {
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
            } else {
                console.error('Tour data not found for tour ID:', tourId);
            }
        });
    });

    // Close the modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close the modal when clicking outside the modal content
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close the modal when pressing the Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Function to close the modal
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Add error handling for missing elements
    if (!modalOverlay) {
        console.error('Modal overlay not found');
        return;
    }
    
    if (!viewDetailsButtons || viewDetailsButtons.length === 0) {
        console.error('No view details buttons found');
        return;
    }

    console.log(`Found ${viewDetailsButtons.length} view details buttons`);
    console.log('Modal elements check:', {
        modalImage: !!modalImage,
        modalTitle: !!modalTitle,
        modalBadge: !!modalBadge,
        bookTourBtn: !!bookTourBtn
    });
    
    // Test all buttons on page load
    setTimeout(() => {
        console.log('=== Tour Modal Debug Info ===');
        viewDetailsButtons.forEach((btn, index) => {
            const tourId = btn.getAttribute('data-tour');
            const hasData = tourData[tourId] ? 'YES' : 'NO';
            console.log(`Button ${index + 1}: data-tour="${tourId}" | Has Data: ${hasData}`);
        });
        console.log('========================');
    }, 1000);

});
