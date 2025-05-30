/* Image loading animations for tour cards */
@keyframes imageFadeIn {
    from {
        opacity: 0;
        transform: scale(1.05);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.tour-image img {
    animation: imageFadeIn 0.8s ease forwards;
}

/* Stagger image loading for a more dynamic appearance */
.tour-card:nth-child(1) .tour-image img { animation-delay: 0.1s; }
.tour-card:nth-child(2) .tour-image img { animation-delay: 0.2s; }
.tour-card:nth-child(3) .tour-image img { animation-delay: 0.3s; }
.tour-card:nth-child(4) .tour-image img { animation-delay: 0.4s; }
.tour-card:nth-child(5) .tour-image img { animation-delay: 0.5s; }
.tour-card:nth-child(6) .tour-image img { animation-delay: 0.6s; }
.tour-card:nth-child(7) .tour-image img { animation-delay: 0.7s; }
.tour-card:nth-child(8) .tour-image img { animation-delay: 0.8s; }

/* Preload effect */
.tour-image {
    position: relative;
}

.tour-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
    z-index: 3;
    animation: shimmer 1.5s infinite;
    transform: skewX(-20deg);
    pointer-events: none;
    opacity: 0;
}

.tour-image.loading::before {
    opacity: 1;
}

@keyframes shimmer {
    0% {
        transform: translateX(-150%) skewX(-20deg);
    }
    100% {
        transform: translateX(150%) skewX(-20deg);
    }
}

/* Image error fallback */
.tour-image img.error {
    object-fit: cover;
    object-position: center;
    background-color: #f8f8f8;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 48px;
}

/* Add a script to handle image loading/errors */
document.addEventListener('DOMContentLoaded', function() {
    const tourImages = document.querySelectorAll('.tour-image img');
    
    tourImages.forEach(img => {
        img.parentElement.classList.add('loading');
        
        img.onload = function() {
            img.parentElement.classList.remove('loading');
        };
        
        img.onerror = function() {
            img.classList.add('error');
            img.parentElement.classList.remove('loading');
        };
    });
});
