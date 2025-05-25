// Scroll effects for tours and events sections

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll-reveal class to all tour and event cards
    const cards = document.querySelectorAll('.tour-card, .event-card');
    cards.forEach(card => {
        card.classList.add('scroll-reveal');
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll and reveal elements
    function handleScroll() {
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        scrollRevealElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('revealed')) {
                element.classList.add('revealed');
            }
        });
        
        // Subtle background gradient change on scroll
        const scrollPosition = window.scrollY;
        const toursSection = document.querySelector('.tours-section');
        
        // About Us section scroll animations
        const aboutSection = document.querySelector('.about-section');
        const aboutImage = document.querySelector('.about-image');
        const aboutText = document.querySelector('.about-text');
        
        if (aboutSection && isInViewport(aboutSection)) {
            aboutSection.setAttribute('data-aos', 'true');
            aboutSection.classList.add('aos-animate');
            
            if (aboutImage) {
                aboutImage.style.opacity = '1';
                aboutImage.style.transform = 'translateX(0)';
            }
            
            if (aboutText) {
                aboutText.style.opacity = '1';
                aboutText.style.transform = 'translateX(0)';
            }
        }
    }

    // Initial check on page load
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});
