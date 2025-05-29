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
        },        southafrica: {
            title: 'South Africa Explorer',
            desc: 'Explore the diverse beauty of South Africa from the cosmopolitan city of Cape Town to the world-renowned Kruger National Park. This comprehensive tour showcases the best of South African culture, wildlife, and landscapes.',
            duration: '10 Days',
            maxGroup: '12 people',
            availability: 'Apr-Oct 2025',
            price: 'KES 150,000',
            highlights: ['Cape Town city tour', 'Wine tasting', 'Kruger Big Five safari', 'Panorama Route'],
            includes: ['Luxury accommodation', 'All meals', 'Professional guide', 'Transport', 'Park fees', 'Wine tastings'],
            image: 'images/background .png'
        },
        // Dubai Tours & Attractions
        desertsafari: {
            title: 'Desert Safari',
            desc: 'Experience the thrill of the Dubai desert with dune bashing, camel riding, and a traditional Bedouin-style dinner under the stars. This comprehensive desert experience includes sandboarding and cultural entertainment.',
            duration: '6 hours',
            maxGroup: '20 people',
            availability: 'Daily, 3:00 PM - 9:00 PM',
            price: 'AED 199',
            highlights: ['Dune bashing adventure', 'Camel riding', 'Sandboarding', 'BBQ dinner', 'Cultural shows'],
            includes: ['Hotel pickup/drop-off', 'Professional driver', 'BBQ dinner', 'Soft drinks', 'Entertainment'],
            image: 'images/background .png'
        },
        creekdhow: {
            title: 'Creek Dhow Cruise',
            desc: 'Sail along the historic Dubai Creek on a traditional wooden dhow while enjoying a delicious dinner and stunning views of old and new Dubai. Experience the charm of traditional Dubai from the water.',
            duration: '3 hours',
            maxGroup: '50 people',
            availability: 'Daily, 7:00 PM - 10:00 PM',
            price: 'AED 89',
            highlights: ['Traditional dhow boat', 'Dinner buffet', 'Creek views', 'Live entertainment', 'Cultural experience'],
            includes: ['Dhow cruise', 'International buffet', 'Welcome drink', 'Entertainment', 'Hotel transfers'],
            image: 'images/background .png'
        },
        marinadhow: {
            title: 'Marina Dhow Cruise',
            desc: 'Enjoy a luxurious dining experience aboard a traditional dhow while cruising through Dubai Marina. Marvel at the stunning skyline and modern architecture of Dubai\'s newest district.',
            duration: '3 hours',
            maxGroup: '50 people',
            availability: 'Daily, 8:00 PM - 11:00 PM',
            price: 'AED 165',
            highlights: ['Marina skyline views', 'International buffet', 'Live entertainment', 'Air-conditioned dhow', 'Photography spots'],
            includes: ['Marina dhow cruise', 'International buffet', 'Soft drinks', 'Entertainment', 'Hotel transfers'],
            image: 'images/background .png'
        },
        burjkhalifa: {
            title: 'Burj Khalifa at the Top',
            desc: 'Visit the world\'s tallest building and enjoy breathtaking 360-degree views of Dubai from the observation decks on levels 124 & 125. Experience Dubai from the clouds.',
            duration: '2 hours',
            maxGroup: '25 people',
            availability: 'Daily, Flexible timing',
            price: 'AED 159',
            highlights: ['World\'s tallest building', '360-degree city views', 'High-speed elevators', 'Multimedia presentation', 'Photography opportunities'],
            includes: ['Skip-the-line tickets', 'Access to levels 124 & 125', 'Multimedia presentation', 'Souvenir photo'],
            image: 'images/background .png'
        },
        dubaitour: {
            title: 'Dubai City Tour',
            desc: 'Discover the highlights of Dubai with our comprehensive city tour covering both traditional and modern attractions. Visit iconic landmarks, cultural sites, and architectural marvels.',
            duration: '7 hours',
            maxGroup: '15 people',
            availability: 'Daily, 9:00 AM - 4:00 PM',
            price: 'AED 199',
            highlights: ['Burj Al Arab photo stop', 'Jumeirah Mosque visit', 'Gold & Spice Souks', 'Dubai Museum', 'Dubai Frame'],
            includes: ['Air-conditioned vehicle', 'Professional guide', 'Hotel pickup/drop-off', 'Entrance fees', 'Refreshments'],
            image: 'images/background .png'
        },
        globalvillage: {
            title: 'Global Village',
            desc: 'Experience the world in one place at Global Village, featuring pavilions from over 90 countries, cultural shows, shopping, and international cuisine. A truly multicultural experience.',
            duration: '4-5 hours',
            maxGroup: '30 people',
            availability: 'Oct-Apr, 4:00 PM - 12:00 AM',
            price: 'AED 59',
            highlights: ['90+ country pavilions', 'Cultural performances', 'International shopping', 'Global cuisine', 'Family entertainment'],
            includes: ['Entry tickets', 'Cultural show access', 'Map and guide', 'Shopping assistance'],
            image: 'images/background .png'
        },
        atlantis: {
            title: 'Atlantis Aquaventure',
            desc: 'Enjoy a full day of aquatic adventures at Atlantis Aquaventure Waterpark, featuring thrilling water slides, marine animal encounters, and pristine beaches.',
            duration: 'Full day',
            maxGroup: '20 people',
            availability: 'Daily, 10:00 AM - 6:00 PM',
            price: 'AED 315',
            highlights: ['Thrilling water slides', 'Lost Chambers Aquarium', 'Private beach access', 'Marine animal encounters', 'Adventure activities'],
            includes: ['Full day access', 'Locker rental', 'Beach access', 'Lost Chambers visit', 'Safety equipment'],
            image: 'images/background .png'
        },
        imgworld: {
            title: 'IMG Worlds of Adventure',
            desc: 'Experience the world\'s largest indoor theme park with thrilling rides, immersive experiences, and attractions based on popular cartoon and superhero characters.',
            duration: 'Full day',
            maxGroup: '25 people',
            availability: 'Daily, 11:00 AM - 8:00 PM',
            price: 'AED 345',
            highlights: ['World\'s largest indoor theme park', 'Marvel and Cartoon Network zones', 'Thrilling rides', 'Live shows', 'Dining options'],
            includes: ['Full day access', 'All rides and attractions', 'Shows and entertainment', 'Parking'],
            image: 'images/background .png'
        },
        dubaiframe: {
            title: 'Dubai Frame',
            desc: 'Visit the iconic Dubai Frame for spectacular views of old and new Dubai. This architectural marvel offers a unique perspective of the city\'s transformation.',
            duration: '2 hours',
            maxGroup: '30 people',
            availability: 'Daily, 9:00 AM - 9:00 PM',
            price: 'AED 50',
            highlights: ['Panoramic city views', 'Golden bridge experience', 'Museum exhibition', 'Sky deck', 'Photo opportunities'],
            includes: ['Skip-the-line entry', 'Museum access', 'Sky deck access', 'Souvenir photo'],
            image: 'images/background .png'
        },        miraclegarden: {
            title: 'Dubai Miracle Garden',
            desc: 'Explore the world\'s largest natural flower garden featuring over 150 million flowers in stunning arrangements and unique designs. A paradise for nature lovers.',
            duration: '3 hours',
            maxGroup: '35 people',
            availability: 'Oct-May, 9:00 AM - 9:00 PM',
            price: 'AED 75',
            highlights: ['150+ million flowers', 'Unique floral arrangements', 'Instagram-worthy spots', 'Themed gardens', 'Seasonal displays'],
            includes: ['Garden entry', 'Map and guide', 'Photography spots', 'Rest areas'],
            image: 'images/background .png'
        },
        jetski: {
            title: 'Jet Ski Experience',
            desc: 'Feel the adrenaline rush as you speed across Dubai\'s pristine waters on a high-powered jet ski. Perfect for adventure seekers and water sports enthusiasts.',
            duration: '30 minutes - 2 hours',
            maxGroup: '10 people',
            availability: 'Daily, 9:00 AM - 6:00 PM',
            price: 'AED 299',
            highlights: ['High-speed water adventure', 'Dubai coastline views', 'Professional instruction', 'Safety equipment included', 'Photo opportunities'],
            includes: ['Jet ski rental', 'Safety briefing', 'Life jacket', 'Insurance', 'Basic instruction'],
            image: 'images/background .png'
        },
        wildwadi: {
            title: 'Wild Wadi Water Park',
            desc: 'Experience the ultimate water adventure at Wild Wadi, featuring thrilling water slides, wave pools, and family-friendly attractions in a Sinbad-themed setting.',
            duration: 'Full day',
            maxGroup: '25 people',
            availability: 'Daily, 10:00 AM - 6:00 PM',
            price: 'AED 280',
            highlights: ['Thrilling water slides', 'Surfing simulator', 'Lazy river', 'Kids play area', 'Beach access'],
            includes: ['Full day access', 'Locker rental', 'Towel service', 'Beach access', 'Safety equipment'],
            image: 'images/background .png'
        },
        museumlakesafari: {
            title: 'Museum of the Future & Lake Safari',
            desc: 'Combine futuristic innovation with natural beauty by visiting the iconic Museum of the Future and enjoying a serene lake safari experience.',
            duration: '5 hours',
            maxGroup: '15 people',
            availability: 'Daily, 10:00 AM - 5:00 PM',
            price: 'AED 450',
            highlights: ['Future technology exhibits', 'Interactive displays', 'Lake boat ride', 'Wildlife spotting', 'Photography'],
            includes: ['Museum entry', 'Lake safari', 'Professional guide', 'Refreshments', 'Transportation'],
            image: 'images/background .png'
        },
        dubaioperashow: {
            title: 'Dubai Opera Show',
            desc: 'Experience world-class performances at the stunning Dubai Opera, featuring international artists, classical music, ballet, and contemporary shows.',
            duration: '2-3 hours',
            maxGroup: '20 people',
            availability: 'Schedule varies',
            price: 'AED 150-500',
            highlights: ['World-class performances', 'Stunning architecture', 'Premium seating', 'Cultural experience', 'Evening entertainment'],
            includes: ['Show tickets', 'Venue access', 'Program guide', 'Pre-show refreshments'],
            image: 'images/background .png'
        },
        dubaiaquarium: {
            title: 'Dubai Aquarium & Underwater Zoo',
            desc: 'Explore one of the world\'s largest suspended aquariums featuring over 33,000 aquatic animals and immersive underwater experiences.',
            duration: '2-3 hours',
            maxGroup: '30 people',
            availability: 'Daily, 10:00 AM - 10:00 PM',
            price: 'AED 149',
            highlights: ['33,000+ marine animals', 'Underwater tunnel', 'Shark encounters', 'Interactive exhibits', 'Educational programs'],
            includes: ['Aquarium entry', 'Underwater zoo access', 'Tunnel walkthrough', 'Interactive experiences'],
            image: 'images/background .png'
        },
        zabeel: {
            title: 'Zabeel Park & Dubai Garden Glow',
            desc: 'Discover the magical Dubai Garden Glow in Zabeel Park, featuring illuminated installations, themed gardens, and entertainment for the whole family.',
            duration: '3-4 hours',
            maxGroup: '25 people',
            availability: 'Oct-May, 4:00 PM - 11:00 PM',
            price: 'AED 65',
            highlights: ['Illuminated art installations', 'Themed gardens', 'Family entertainment', 'Food courts', 'Shopping area'],
            includes: ['Park entry', 'Garden glow access', 'Map and guide', 'Parking'],
            image: 'images/background .png'
        },
        goldenframeart: {
            title: 'Golden Frame Art Gallery',
            desc: 'Visit Dubai\'s premier art gallery showcasing contemporary Middle Eastern art, international exhibitions, and cultural collections.',
            duration: '1.5-2 hours',
            maxGroup: '20 people',
            availability: 'Daily, 9:00 AM - 9:00 PM',
            price: 'AED 89',
            highlights: ['Contemporary art collections', 'International exhibitions', 'Cultural displays', 'Interactive tours', 'Gift shop'],
            includes: ['Gallery entry', 'Audio guide', 'Brochure', 'Photography allowed'],
            image: 'images/background .png'
        },
        traditionalsouks: {
            title: 'Traditional Souks Tour',
            desc: 'Explore Dubai\'s historic souks including the Gold Souk, Spice Souk, and Textile Souk. Experience traditional trading culture and bargaining.',
            duration: '3-4 hours',
            maxGroup: '15 people',
            availability: 'Daily, 9:00 AM - 6:00 PM',
            price: 'AED 120',
            highlights: ['Historic trading areas', 'Gold and spice markets', 'Traditional architecture', 'Cultural immersion', 'Shopping opportunities'],
            includes: ['Guided tour', 'Transportation', 'Cultural insights', 'Shopping assistance'],
            image: 'images/background .png'
        },
        heliride: {
            title: 'Helicopter Ride over Dubai',
            desc: 'Experience Dubai from the sky with a breathtaking helicopter tour showcasing iconic landmarks, coastline, and architectural marvels from above.',
            duration: '15-45 minutes',
            maxGroup: '6 people',
            availability: 'Daily, 9:00 AM - 5:00 PM',
            price: 'AED 695',
            highlights: ['Aerial city views', 'Iconic landmarks', 'Professional pilot', 'Photo opportunities', 'Luxury experience'],
            includes: ['Helicopter flight', 'Pilot commentary', 'Safety briefing', 'Insurance', 'Certificate'],
            image: 'images/background .png'
        },
        luxuryyacht: {
            title: 'Luxury Yacht Party',
            desc: 'Sail in style aboard a luxury yacht with professional crew, gourmet dining, and stunning views of Dubai\'s coastline and skyline.',
            duration: '3-8 hours',
            maxGroup: '20 people',
            availability: 'Daily, flexible timing',
            price: 'AED 1200',
            highlights: ['Luxury yacht experience', 'Professional crew', 'Gourmet dining', 'Water activities', 'Premium service'],
            includes: ['Yacht charter', 'Crew service', 'Refreshments', 'Water sports equipment', 'Music system'],
            image: 'images/background .png'
        },
        skydiving: {
            title: 'Skydiving Experience',
            desc: 'Experience the ultimate adrenaline rush with a tandem skydive over Dubai\'s iconic landmarks and pristine coastline.',
            duration: '3-4 hours',
            maxGroup: '8 people',
            availability: 'Daily, weather permitting',
            price: 'AED 2199',
            highlights: ['Tandem skydiving', 'Professional instructors', 'Aerial views', 'Safety certified', 'Video recording'],
            includes: ['Tandem jump', 'Training session', 'Safety equipment', 'Certificate', 'Photos/video option'],
            image: 'images/background .png'
        },
        hotairballoon: {
            title: 'Hot Air Balloon Ride',
            desc: 'Float peacefully over the Dubai desert at sunrise, enjoying panoramic views and a unique perspective of the desert landscape.',
            duration: '4-5 hours',
            maxGroup: '12 people',
            availability: 'Daily, sunrise timing',
            price: 'AED 995',
            highlights: ['Sunrise desert views', 'Peaceful flight', 'Wildlife spotting', 'Traditional breakfast', 'Certificate'],
            includes: ['Hot air balloon ride', 'Hotel transfers', 'Light breakfast', 'Flight certificate', 'Photos'],
            image: 'images/background .png'
        },
        privatebeach: {
            title: 'Private Beach Experience',
            desc: 'Enjoy exclusive access to pristine private beaches with luxury amenities, water sports, and personalized service.',
            duration: 'Full day',
            maxGroup: '15 people',
            availability: 'Daily, 9:00 AM - 6:00 PM',
            price: 'AED 350',
            highlights: ['Private beach access', 'Luxury amenities', 'Water sports', 'Beachside dining', 'Relaxation areas'],
            includes: ['Beach access', 'Sunbeds and umbrellas', 'Towel service', 'Water sports equipment', 'Refreshments'],
            image: 'images/background .png'
        },
        quadbiking: {
            title: 'Quad Biking Adventure',
            desc: 'Navigate through Dubai\'s desert dunes on powerful quad bikes for an exhilarating off-road adventure experience.',
            duration: '2-4 hours',
            maxGroup: '12 people',
            availability: 'Daily, 8:00 AM - 5:00 PM',
            price: 'AED 180',
            highlights: ['Desert quad biking', 'Professional guides', 'Safety equipment', 'Desert exploration', 'Photo stops'],
            includes: ['Quad bike rental', 'Safety gear', 'Professional guide', 'Desert route', 'Refreshments'],
            image: 'images/background .png'
        },
        camelriding: {
            title: 'Camel Riding Experience',
            desc: 'Experience traditional desert transportation with a peaceful camel ride through the Dubai desert landscape.',
            duration: '1-2 hours',
            maxGroup: '20 people',
            availability: 'Daily, sunrise and sunset',
            price: 'AED 85',
            highlights: ['Traditional camel ride', 'Desert scenery', 'Cultural experience', 'Photo opportunities', 'Peaceful journey'],
            includes: ['Camel ride', 'Safety briefing', 'Traditional attire option', 'Photos', 'Light refreshments'],
            image: 'images/background .png'
        },
        sandboarding: {
            title: 'Sand Boarding',
            desc: 'Surf the golden sand dunes of Dubai with this exciting sandboarding adventure, perfect for thrill-seekers and adventure enthusiasts.',
            duration: '2-3 hours',
            maxGroup: '15 people',
            availability: 'Daily, 8:00 AM - 5:00 PM',
            price: 'AED 120',
            highlights: ['Sand dune surfing', 'Professional instruction', 'Safety equipment', 'Desert adventure', 'Group activities'],
            includes: ['Sandboarding equipment', 'Safety gear', 'Instruction', 'Desert transport', 'Refreshments'],
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
        },        teambuilding: {
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
        },
        // Dubai Events & Attractions
        desertsafarievent: {
            title: 'Dubai Desert Safari',
            desc: 'Experience the thrill of the Dubai desert with dune bashing, camel riding, and a traditional Bedouin-style dinner under the stars.',
            location: 'Dubai Desert Conservation Reserve',
            time: '6 hours, 3:00 PM - 9:00 PM',
            participants: '20 max',
            difficulty: 'Easy to Moderate',
            price: 'AED 199',
            items: ['Comfortable clothing', 'Sunglasses', 'Camera', 'Light jacket', 'Closed shoes'],
            image: 'images/background .png',
            dates: ['Daily availability']
        },
        burjkhalifaevent: {
            title: 'Burj Khalifa At The Top',
            desc: 'Visit the world\'s tallest building and enjoy breathtaking 360-degree views of Dubai from levels 124 & 125.',
            location: 'Downtown Dubai',
            time: '2 hours, Flexible timing',
            participants: '25 max',
            difficulty: 'Easy',
            price: 'AED 159',
            items: ['Camera', 'Comfortable shoes', 'Light clothing'],
            image: 'images/background .png',
            dates: ['Daily availability']
        },
        marinadhowevent: {
            title: 'Marina Dhow Cruise',
            desc: 'Enjoy a luxurious dining experience aboard a traditional dhow while cruising through Dubai Marina.',
            location: 'Dubai Marina',
            time: '3 hours, 8:00 PM - 11:00 PM',
            participants: '50 max',
            difficulty: 'Easy',
            price: 'AED 165',
            items: ['Camera', 'Light jacket', 'Formal casual attire'],
            image: 'images/background .png',
            dates: ['Daily availability']
        },
        globalvillageevent: {
            title: 'Global Village Experience',
            desc: 'Experience the world in one place with pavilions from over 90 countries, cultural shows, shopping, and international cuisine.',
            location: 'Global Village, Dubai',
            time: '4-5 hours, 4:00 PM - 12:00 AM',
            participants: '30 max',
            difficulty: 'Easy',
            price: 'AED 59',
            items: ['Comfortable walking shoes', 'Camera', 'Light clothing', 'Shopping bag'],
            image: 'images/background .png',
            dates: ['October to April season']
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
