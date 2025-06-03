// Clean URL Manager - Removes .html extension from browser URLs
(function() {
    'use strict';
    
    // Check if we're on a local development server
    const isLocalDev = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' || 
                      window.location.hostname.startsWith('192.168.') ||
                      window.location.protocol === 'file:';
    
    // Only run clean URL changes on production servers, not local development
    if (!isLocalDev && window.location.pathname.endsWith('.html')) {
        // Get clean path without .html
        const cleanPath = window.location.pathname.replace('.html', '');
        
        // Build new URL with same search params and hash
        const newUrl = window.location.protocol + '//' + 
                      window.location.host + 
                      cleanPath + 
                      window.location.search + 
                      window.location.hash;
        
        // Replace current URL without page reload
        window.history.replaceState({}, document.title, newUrl);
    }
    
    // Handle internal link clicks
    document.addEventListener('DOMContentLoaded', function() {
        // Get all internal links
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(function(link) {
            const href = link.getAttribute('href');
            
            // Process internal links that might need .html extension
            if (href && 
                !href.startsWith('http') && 
                !href.startsWith('mailto') && 
                !href.startsWith('tel') && 
                !href.startsWith('#') && 
                !href.includes('.') && 
                href !== '/' &&
                href.length > 0) {
                
                // On local development, always add .html
                // On production, let .htaccess handle it
                if (isLocalDev) {
                    link.addEventListener('click', function(e) {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                            const actualHref = href + '.html';
                            window.location.href = actualHref;
                            e.preventDefault();
                        }
                    });
                }
            }
        });
    });    
    // Update any dynamically created links (only needed on local dev)
    function updateDynamicLinks() {
        if (!isLocalDev) return; // Skip on production
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            const links = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
                            links.forEach(function(link) {
                                const href = link.getAttribute('href');
                                if (href && 
                                    !href.startsWith('http') && 
                                    !href.startsWith('mailto') && 
                                    !href.startsWith('tel') && 
                                    !href.startsWith('#') && 
                                    !href.includes('.') && 
                                    href !== '/' &&
                                    href.length > 0) {
                                    
                                    link.addEventListener('click', function(e) {
                                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                                            const actualHref = href + '.html';
                                            window.location.href = actualHref;
                                            e.preventDefault();
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize dynamic link observer after DOM loads (only on local dev)
    if (isLocalDev) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateDynamicLinks);
        } else {
            updateDynamicLinks();
        }
    }
    
})();
