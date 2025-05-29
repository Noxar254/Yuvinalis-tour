// Gallery Page JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery functionality
    initializeGallery();
    initializeFilters();
    initializeLightbox();
    initializeNavbar();
    animateOnScroll();
});

// Gallery initialization
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add loading animation delays
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.gallery-card img').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter gallery items
            filterGalleryItems(galleryItems, filterValue);
        });
    });
}

function filterGalleryItems(items, filterValue) {
    items.forEach((item, index) => {
        const categories = item.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
            // Show item with animation
            setTimeout(() => {
                item.style.display = 'block';
                item.classList.remove('filtered-out');
                item.style.animationDelay = `${index * 0.1}s`;
            }, index * 50);
        } else {
            // Hide item
            item.classList.add('filtered-out');
            setTimeout(() => {
                if (item.classList.contains('filtered-out')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Lightbox/Modal functionality
function initializeLightbox() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    const viewButtons = document.querySelectorAll('.gallery-view-btn');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    // Update visible images array
    function updateVisibleImages() {
        const galleryItems = document.querySelectorAll('.gallery-item:not(.filtered-out)');
        visibleImages = Array.from(galleryItems).map(item => {
            const img = item.querySelector('.gallery-view-btn');
            return img.getAttribute('data-img');
        });
    }

    // Open modal
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            updateVisibleImages();
            currentImageIndex = Array.from(viewButtons).indexOf(button);
            openModal(button.getAttribute('data-img'));
        });
    });

    // Gallery card click to open modal
    document.querySelectorAll('.gallery-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            updateVisibleImages();
            const viewBtn = card.querySelector('.gallery-view-btn');
            currentImageIndex = index;
            openModal(viewBtn.getAttribute('data-img'));
        });
    });

    function openModal(imageSrc) {
        modalImage.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyboardNavigation);
    }

    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    // Navigation functions
    function showPreviousImage() {
        updateVisibleImages();
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        modalImage.src = visibleImages[currentImageIndex];
    }

    function showNextImage() {
        updateVisibleImages();
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        modalImage.src = visibleImages[currentImageIndex];
    }

    // Navigation button events
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    function handleKeyboardNavigation(e) {
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage(); // Swipe left - next image
            } else {
                showPreviousImage(); // Swipe right - previous image
            }
        }
    }
}

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;

        // Add background to navbar on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.gallery-item, .cta-content, .filter-buttons').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (if needed in future)
function initializeSearch() {
    const searchInput = document.getElementById('gallerySearch');
    if (!searchInput) return;

    const searchHandler = debounce((searchTerm) => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const title = item.querySelector('.gallery-info h3').textContent.toLowerCase();
            const description = item.querySelector('.gallery-info p').textContent.toLowerCase();
            const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const searchableText = [title, description, ...tags].join(' ');
            
            if (searchableText.includes(searchTerm.toLowerCase()) || searchTerm === '') {
                item.style.display = 'block';
                item.classList.remove('filtered-out');
            } else {
                item.classList.add('filtered-out');
                setTimeout(() => {
                    if (item.classList.contains('filtered-out')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }, 300);

    searchInput.addEventListener('input', (e) => {
        searchHandler(e.target.value);
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-card img').forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder image on error
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
            this.alt = 'Image not found';
        });
    });
});

// Performance optimization
function optimizePerformance() {
    // Preload critical images
    const criticalImages = document.querySelectorAll('.gallery-item:nth-child(-n+6) img');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });

    // Defer non-critical JavaScript
    const deferredScripts = ['analytics', 'social-media'];
    deferredScripts.forEach(script => {
        window.addEventListener('load', () => {
            // Load deferred scripts
        });
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Export functions for external use
window.GalleryApp = {
    filterGalleryItems,
    initializeFilters,
    initializeLightbox,
    animateOnScroll
};
