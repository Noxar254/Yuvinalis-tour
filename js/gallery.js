// Gallery Page JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery functionality
    initializeGallery();
    initializeFilters();
    initializeLightbox();
    initializeNavbar();
    initializeViewMore();
    initializeSearch();
    initializeSharing();
    animateOnScroll();
    updateImageCounter();
});

// Global variables
let currentImageIndex = 0;
let visibleImages = [];
let allImages = [];
let favorites = JSON.parse(localStorage.getItem('galleryFavorites') || '[]');

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

// View More Functionality
function initializeViewMore() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    
    if (!viewMoreBtn || hiddenItems.length === 0) return;
    
    viewMoreBtn.addEventListener('click', function() {
        loadMoreImages();
    });
}

function loadMoreImages() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    const itemsToShow = 6; // Load 6 more images at a time
    
    // Add loading state
    viewMoreBtn.classList.add('loading');
    
    setTimeout(() => {
        let showCount = 0;
        
        for (let i = 0; i < hiddenItems.length && showCount < itemsToShow; i++) {
            const item = hiddenItems[i];
            if (item.classList.contains('hidden')) {
                item.classList.remove('hidden');
                
                // Lazy load the image
                const img = item.querySelector('img[data-src]');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                // Add animation delay
                setTimeout(() => {
                    item.classList.add('visible');
                }, showCount * 100);
                
                showCount++;
            }
        }
        
        // Update counter
        updateImageCounter();
        
        // Update lightbox images array
        updateVisibleImages();
        
        // Remove loading state
        viewMoreBtn.classList.remove('loading');
        
        // Hide button if no more images
        const remainingHidden = document.querySelectorAll('.gallery-item.hidden');
        if (remainingHidden.length === 0) {
            viewMoreBtn.style.display = 'none';
        }
        
    }, 1000); // Simulate loading time
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('gallerySearch');
    const searchBtn = document.querySelector('.search-btn');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    if (!searchInput) return;
    
    // Search input handler
    searchInput.addEventListener('input', debounce(performSearch, 300));
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Search button handler
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Suggestion tags handlers
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.dataset.search;
            searchInput.value = searchTerm;
            performSearch();
        });
    });
}

function performSearch() {
    const searchInput = document.getElementById('gallerySearch');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const allItems = document.querySelectorAll('.gallery-item');
    
    if (!searchTerm) {
        // Show all items if search is empty
        allItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('search-hidden');
        });
        return;
    }
    
    allItems.forEach(item => {
        const title = item.querySelector('.gallery-info h3')?.textContent.toLowerCase() || '';
        const description = item.querySelector('.gallery-info p')?.textContent.toLowerCase() || '';
        const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const categories = item.dataset.category.toLowerCase();
        
        const searchableText = `${title} ${description} ${tags.join(' ')} ${categories}`;
        
        if (searchableText.includes(searchTerm)) {
            item.style.display = 'block';
            item.classList.remove('search-hidden');
        } else {
            item.classList.add('search-hidden');
            setTimeout(() => {
                if (item.classList.contains('search-hidden')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
    
    updateVisibleImages();
}

// Sharing Functionality
function initializeSharing() {
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const shareClose = document.getElementById('shareClose');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const copyBtn = document.getElementById('copyBtn');
    const shareButtons = document.querySelectorAll('.share-btn[data-platform]');
    
    if (!shareBtn || !shareModal) return;
    
    shareBtn.addEventListener('click', openShareModal);
    shareClose.addEventListener('click', closeShareModal);
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) closeShareModal();
    });
    
    copyLinkBtn.addEventListener('click', copyCurrentLink);
    copyBtn.addEventListener('click', copyCurrentLink);
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            shareToSocialMedia(this.dataset.platform);
        });
    });
}

function openShareModal() {
    const shareModal = document.getElementById('shareModal');
    const shareLink = document.getElementById('shareLink');
    const modalImage = document.getElementById('modalImage');
    
    // Set the current image URL in the share link
    const currentImageUrl = modalImage.src;
    const shareUrl = `${window.location.origin}${window.location.pathname}?image=${encodeURIComponent(currentImageUrl)}`;
    shareLink.value = shareUrl;
    
    shareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    const shareModal = document.getElementById('shareModal');
    shareModal.classList.remove('active');
    document.body.style.overflow = '';
}

function copyCurrentLink() {
    const shareLink = document.getElementById('shareLink');
    const copyBtn = document.getElementById('copyBtn');
    
    shareLink.select();
    document.execCommand('copy');
    
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
    }, 2000);
}

function shareToSocialMedia(platform) {
    const modalTitle = document.getElementById('modalTitle').textContent;
    const shareLink = document.getElementById('shareLink').value;
    const modalImage = document.getElementById('modalImage').src;
    
    const shareText = `Check out this amazing destination: ${modalTitle}`;
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareLink)}&media=${encodeURIComponent(modalImage)}&description=${encodeURIComponent(shareText)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareLink)}`;
            break;
        case 'instagram':
            // Instagram doesn't have direct sharing URL, so copy to clipboard
            copyCurrentLink();
            alert('Link copied! You can now paste it in your Instagram story or post.');
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Lightbox/Modal functionality
function initializeLightbox() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalClose = document.getElementById('modalClose');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const viewButtons = document.querySelectorAll('.gallery-view-btn');
    
    // Update visible images array
    updateVisibleImages();

    // Open lightbox
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const imgSrc = button.getAttribute('data-img');
            const galleryItem = button.closest('.gallery-item');
            const title = galleryItem.querySelector('.gallery-info h3').textContent;
            const description = galleryItem.querySelector('.gallery-info p').textContent;
            const tags = Array.from(galleryItem.querySelectorAll('.tag'));
            
            openLightbox(imgSrc, title, description, tags);
        });
    });

    // Close lightbox
    modalClose.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    // Navigation
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Favorite functionality
    favoriteBtn.addEventListener('click', toggleFavorite);
    
    // Download functionality
    downloadBtn.addEventListener('click', downloadCurrentImage);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function openLightbox(imgSrc, title, description, tags) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    
    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Update tags
    modalTags.innerHTML = '';
    tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag.textContent;
        modalTags.appendChild(tagSpan);
    });
    
    // Update current index
    currentImageIndex = visibleImages.indexOf(imgSrc);
    
    // Update favorite state
    updateFavoriteButton();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add info animation delay
    setTimeout(() => {
        modal.classList.add('info-visible');
    }, 300);
}

function closeLightbox() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active', 'info-visible');
    document.body.style.overflow = '';
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalImage();
    }
}

function showNextImage() {
    if (currentImageIndex < visibleImages.length - 1) {
        currentImageIndex++;
        updateModalImage();
    }
}

function updateModalImage() {
    const newImgSrc = visibleImages[currentImageIndex];
    const galleryItems = document.querySelectorAll('.gallery-item:not([style*="display: none"])');
    let targetItem = null;
    
    galleryItems.forEach(item => {
        const viewBtn = item.querySelector('.gallery-view-btn');
        if (viewBtn && viewBtn.dataset.img === newImgSrc) {
            targetItem = item;
        }
    });
    
    if (targetItem) {
        const title = targetItem.querySelector('.gallery-info h3').textContent;
        const description = targetItem.querySelector('.gallery-info p').textContent;
        const tags = Array.from(targetItem.querySelectorAll('.tag'));
        
        openLightbox(newImgSrc, title, description, tags);
    }
}

function toggleFavorite() {
    const modalImage = document.getElementById('modalImage');
    const currentImg = modalImage.src;
    
    if (favorites.includes(currentImg)) {
        favorites = favorites.filter(img => img !== currentImg);
    } else {
        favorites.push(currentImg);
    }
    
    localStorage.setItem('galleryFavorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const modalImage = document.getElementById('modalImage');
    const currentImg = modalImage.src;
    
    if (favorites.includes(currentImg)) {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.querySelector('i').className = 'fas fa-heart';
    } else {
        favoriteBtn.classList.remove('favorited');
        favoriteBtn.querySelector('i').className = 'far fa-heart';
    }
}

function downloadCurrentImage() {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    const link = document.createElement('a');
    link.href = modalImage.src;
    link.download = `${modalTitle.textContent.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleKeyboardNavigation(e) {
    const modal = document.getElementById('imageModal');
    if (!modal.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'f':
        case 'F':
            toggleFavorite();
            break;
        case 'd':
        case 'D':
            downloadCurrentImage();
            break;
    }
}

function updateVisibleImages() {
    const galleryItems = document.querySelectorAll('.gallery-item:not([style*="display: none"]):not(.search-hidden)');
    visibleImages = Array.from(galleryItems).map(item => {
        const viewBtn = item.querySelector('.gallery-view-btn');
        return viewBtn ? viewBtn.getAttribute('data-img') : null;
    }).filter(Boolean);
}

function updateImageCounter() {
    const totalImagesCounter = document.getElementById('totalImages');
    const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden):not([style*="display: none"])');
    
    if (totalImagesCounter) {
        totalImagesCounter.textContent = visibleItems.length;
    }
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
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe stats when they come into view
    const statsItems = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statsItems.forEach(item => {
        statsObserver.observe(item);
    });
}

function animateNumber(element) {
    const finalNumber = element.textContent;
    const isPlus = finalNumber.includes('+');
    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let currentNumber = 0;
    const increment = Math.ceil(numericValue / 30);
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        element.textContent = currentNumber + (isPlus ? '+' : '');
    }, 50);
}

// Utility function for debouncing
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
