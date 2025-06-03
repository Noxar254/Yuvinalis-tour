// URL Handler - Clean URL management with custom mappings
(function() {
    'use strict';
    
    // URL mapping for clean URLs
    const urlMappings = {
        'apply-visa.html': '/visa/',
        'visa-services.html': '/visa-services/',
        'flight-booking.html': '/flights/',
        'hotel-booking.html': '/hotels/',
        'accommodations.html': '/accommodations/',
        'events.html': '/events/',
        'tours.html': '/tours/',
        'dubai-packages.html': '/packages/',
        'gallery.html': '/gallery/',
        'about-us.html': '/about/',
        'plan-your-travel.html': '/plan/',
        'booking.html': '/booking/',
        'shop.html': '/shop/',
        'freight-services.html': '/freight/',
        'job-seekers.html': '/jobs/',
        'more-attractions.html': '/attractions/',
        'hatta-road-trip-details.html': '/hatta-trip/'
    };
    
    // Reverse mapping for navigation
    const reverseUrlMappings = {
        '/visa/': 'apply-visa.html',
        '/visa-services/': 'visa-services.html',
        '/flights/': 'flight-booking.html',
        '/hotels/': 'hotel-booking.html',
        '/accommodations/': 'accommodations.html',
        '/events/': 'events.html',
        '/tours/': 'tours.html',
        '/packages/': 'dubai-packages.html',
        '/gallery/': 'gallery.html',
        '/about/': 'about-us.html',
        '/plan/': 'plan-your-travel.html',
        '/booking/': 'booking.html',
        '/shop/': 'shop.html',
        '/freight/': 'freight-services.html',
        '/jobs/': 'job-seekers.html',
        '/attractions/': 'more-attractions.html',
        '/hatta-trip/': 'hatta-road-trip-details.html'
    };
    
    // Check if we're on a local development environment
    const isLocalDev = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' || 
                      window.location.hostname.startsWith('192.168.') ||
                      window.location.protocol === 'file:' ||
                      window.location.port !== '';
    
    console.log('URL Handler - Environment:', isLocalDev ? 'Local Development' : 'Production');
    
    // Handle link clicks to ensure proper navigation
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(function(link) {
            const href = link.getAttribute('href');
            
            // Process internal HTML links
            if (href && 
                !href.startsWith('http') && 
                !href.startsWith('mailto') && 
                !href.startsWith('tel') && 
                !href.startsWith('#') && 
                href.endsWith('.html')) {
                
                link.addEventListener('click', function(e) {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        e.preventDefault();
                        
                        if (isLocalDev) {
                            // On local development, navigate to .html file
                            window.location.href = href;
                        } else {
                            // On production, navigate to clean URL
                            const cleanUrl = urlMappings[href] || href;
                            window.location.href = cleanUrl;
                        }
                    }
                });
            }
        });
        
        // Clean up URL display only on production (where .htaccess works)
        if (!isLocalDev) {
            const currentPath = window.location.pathname;
            
            // Find matching HTML file and redirect to clean URL
            Object.entries(urlMappings).forEach(([htmlFile, cleanUrl]) => {
                if (currentPath.endsWith(htmlFile)) {
                    const newUrl = window.location.protocol + '//' + 
                                  window.location.host + 
                                  cleanUrl + 
                                  window.location.search + 
                                  window.location.hash;
                    
                    // Update URL display without reloading
                    window.history.replaceState({}, document.title, newUrl);
                }
            });
        }
    });
    
})();
