// hero-navbar.js: Navigation and hero section interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    navToggle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            navMenu.classList.toggle('active');
        }
    });

    // Dropdowns for mobile
    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 700) {
                e.preventDefault();
                const parent = toggle.parentElement;
                parent.classList.toggle('open');
                const menu = parent.querySelector('.dropdown-menu');
                if (menu) menu.style.display = parent.classList.contains('open') ? 'flex' : 'none';
            }
        });
    });

    // Close nav on link click (mobile)
    document.querySelectorAll('.nav-link, .dropdown-link').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 700) {
                navMenu.classList.remove('active');
                document.querySelectorAll('.nav-item.dropdown').forEach(function(item) {
                    item.classList.remove('open');
                    const menu = item.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = '';
                });
            }
        });
    });

    // Smooth scrolling animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.scroll-reveal').forEach(function(el) {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Navbar background opacity on scroll
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.style.background = 'linear-gradient(90deg, rgba(15,32,39,0.95) 0%, rgba(44,83,100,0.95) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(90deg, #0f2027 0%, #2c5364 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
