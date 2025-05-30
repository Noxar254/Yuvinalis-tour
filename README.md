# Yuvinalis Tourism Website

A comprehensive travel and tourism website offering services between Dubai, UAE and Nairobi, Kenya. The website provides booking services for tours, flights, hotels, visa processing, and various travel-related services.

## 🌟 Features

### Core Services
- **Visa Processing** - Hassle-free visa applications for Dubai and other destinations
- **Flight Booking** - Comprehensive flight ticketing services with best price guarantee
- **Hotel Bookings** - Accommodations from luxury hotels to budget-friendly options
- **Tour Services** - Guided tour packages including desert safaris, city highlights, and cultural experiences
- **Airport Transfers** - Reliable airport pickup and drop-off services
- **Dubai Business Setup** - Professional business registration and licensing assistance
- **Freight Services** - Cargo and shipping solutions between Dubai, Kenya, and international destinations

### Tour Packages
- **Dubai Tours & Events** - Local Dubai experiences including Hatta Road Trip, Desert Safari, Dhow Cruise, Burj Khalifa visits
- **Domestic Tours (Kenya)** - Maasai Mara Safari, Amboseli Kilimanjaro View, Diani Beach, Mt. Kenya Climbing, Lake Nakuru, Naivasha Weekend Retreats
- **International Tours** - Tanzania Safari, Uganda Gorilla Tracking, South Africa Explorer
- **European Tours** - Spain Cultural Explorer, UK Heritage Tour, Armenia Hidden Gems
- **Asian Tours** - Japan Cherry Blossom, Bali Luxury Getaway, Thailand Krabi Adventures
- **Central Asia** - Almaty Mountain Adventures

### Website Features
- **Responsive Design** - Mobile-friendly interface that works on all devices
- **Interactive Tour Gallery** - Visual tour experiences with detailed information
- **Booking System** - Integrated booking forms for tours, flights, and services
- **Events Calendar** - Upcoming Dubai tours and events
- **Image Gallery** - Showcasing destinations and experiences
- **Contact Forms** - Multiple ways to get in touch for different services

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript** - Interactive functionality and form handling
- **Font Awesome** - Icon library for UI elements
- **Google Fonts** - Poppins font family for typography

### Styling Architecture
- **Modular CSS** - Organized stylesheets by feature/page
- **Mobile-First Design** - Responsive breakpoints for all screen sizes
- **CSS Animations** - Smooth transitions and hover effects
- **Custom Properties** - CSS variables for consistent theming

## 📁 Project Structure

```
Beyond-miles/
├── index.html                 # Homepage
├── about-us.html             # Company information
├── tours.html                # All tours and packages
├── events.html               # Dubai events and activities
├── booking.html              # Universal booking form
├── flight-booking.html       # Flight booking service
├── hotel-booking.html        # Hotel reservation system
├── accommodations.html       # Hotel and lodging options
├── apply-visa.html           # Visa application form
├── visa-services.html        # Visa processing information
├── gallery.html              # Photo gallery
├── freight-services.html     # Cargo and shipping services
├── css/                      # Stylesheets directory
│   ├── hero-navbar.css       # Navigation and hero styles
│   ├── tours.css             # Tour cards and layouts
│   ├── booking.css           # Booking form styles
│   ├── mobile-tours.css      # Mobile responsive tour layouts
│   ├── gallery.css           # Gallery and image styles
│   ├── footer.css            # Footer component styles
│   └── ...                   # Additional component stylesheets
├── js/                       # JavaScript functionality
│   ├── hero-navbar.js        # Navigation interactions
│   ├── tour-modal.js         # Tour detail modals
│   └── ...                   # Additional scripts
├── images/                   # Media assets
│   ├── logo.jpg              # Company logo
│   ├── dubai video.mp4       # Hero background video
│   ├── [tour-images].jpg     # Tour and destination photos
│   └── ...                   # Additional images
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development) - optional but recommended

### Installation

1. **Clone or Download** the project files
   ```bash
   git clone [repository-url]
   cd Beyond-miles
   ```

2. **Local Development Server** (optional)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or simply open `index.html` directly in your browser

### File Dependencies
Ensure all files maintain their relative paths:
- CSS files in `/css/` directory
- JavaScript files in `/js/` directory  
- Images in `/images/` directory
- All HTML files in root directory

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: 1025px+
- **Large Desktop**: 1200px+

### Mobile Features
- Hamburger navigation menu
- Touch-friendly buttons and forms
- Optimized image loading
- Single-column tour layouts
- Mobile-specific tour cards

## 🎨 Customization

### Colors and Branding
Primary colors are defined in CSS custom properties:
- **Primary Blue**: #3498db
- **Secondary Orange**: #ff9500
- **Success Green**: #2ecc71
- **Warning Red**: #e74c3c
- **Dark Blue**: #2c3e50

### Adding New Tours
1. Add tour images to `/images/` directory
2. Update `tours.html` with new tour cards
3. Add corresponding entries in tour modal data
4. Update navigation links if needed

### Adding New Pages
1. Create HTML file in root directory
2. Link CSS stylesheets (hero-navbar.css, footer.css, page-specific.css)
3. Include navigation component
4. Add to main navigation menu

## 🔧 Features Configuration

### Booking System
- Forms use GET parameters for service identification
- Booking URLs: `booking.html?booking=tour`, `booking.html?service=pickup`
- Form validation and user feedback included

### Tour Modals
- Dynamic content loading for tour details
- Image galleries and pricing information
- Direct booking links integration

### Contact Integration
- Multiple contact forms for different services
- WhatsApp integration for quick communication
- Social media links (Instagram, Facebook, Threads)

## 📞 Contact Information

**Yuvinalis Tourism**
- **Website**: [Your Domain]
- **Email**: [Contact Email]
- **WhatsApp**: [WhatsApp Number]
- **Instagram**: @yuvinalistourism
- **Location**: Dubai, UAE & Nairobi, Kenya

## 🏗️ Development Notes

### Code Organization
- Semantic HTML structure with proper accessibility
- Modular CSS with component-based architecture  
- Progressive enhancement JavaScript
- Optimized images and media files

### Performance Optimization
- Compressed images in WebP format where supported
- Minified CSS and JavaScript in production
- Lazy loading for images and videos
- Efficient CSS selectors and animations

### Browser Compatibility
- Modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Graceful degradation for older browsers
- CSS fallbacks for unsupported features

## 🔄 Updates and Maintenance

### Regular Updates
- Tour packages and pricing
- Event dates and availability
- Contact information and social links
- Image gallery with new destinations

### Content Management
- Images: Add to `/images/` directory with descriptive names
- Tours: Update `tours.html` and modal configurations
- Events: Modify event cards in `index.html` and `events.html`
- Services: Update service cards in `index.html`

## 📄 License

This website is proprietary software for Yuvinalis Tourism. All rights reserved.

## 🤝 Contributing

For updates or modifications, please contact the development team or Yuvinalis Tourism directly.

---

**Built with ❤️ for Yuvinalis Tourism - Your Gateway to Dubai and Beyond**
