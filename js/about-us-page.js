// About Us Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initScrollAnimations();
    initTimelineAnimations();
    initStatsCounters();
    initTeamMemberInteractions();
    initHoverEffects();
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe sections for scroll animations
        const sections = document.querySelectorAll('.journey-section, .mission-vision-section, .team-section, .why-choose-section, .values-section, .cta-section');
        sections.forEach(section => {
            section.classList.add('fade-in-up');
            observer.observe(section);
        });

        // Observe cards for staggered animations
        const cards = document.querySelectorAll('.timeline-item, .mission-card, .vision-card, .team-member, .reason-card, .value-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
            observer.observe(card);
        });
    }

    // Timeline Animations
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                }
            });
        }, {
            threshold: 0.5
        });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Stats Counter Animation
    function initStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    let isPercentage = finalNumber.includes('%');
                    let isPlus = finalNumber.includes('+');
                    let number = parseInt(finalNumber.replace(/[^\d]/g, ''));
                    
                    animateCounter(target, 0, number, 2000, isPercentage, isPlus);
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    function animateCounter(element, start, end, duration, isPercentage = false, isPlus = false) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            let displayValue = current;
            if (isPercentage) displayValue += '%';
            if (isPlus && current === end) displayValue += '+';
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Team Member Interactions
    function initTeamMemberInteractions() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            const image = member.querySelector('.member-image');
            const overlay = member.querySelector('.member-overlay');
            
            member.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
                member.style.transform = 'translateY(-10px)';
            });
            
            member.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
                member.style.transform = 'translateY(0)';
            });

            // Social links click tracking
            const socialLinks = member.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const memberName = member.querySelector('h4').textContent;
                    console.log(`Social link clicked for ${memberName}`);
                    // Add actual social media links here
                });
            });
        });
    }

    // Enhanced Hover Effects
    function initHoverEffects() {
        // Reason cards hover effects
        const reasonCards = document.querySelectorAll('.reason-card');
        reasonCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            });
        });

        // Value cards hover effects
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.value-icon i');
                icon.style.transform = 'rotate(360deg) scale(1.1)';
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.value-icon i');
                icon.style.transform = 'rotate(0deg) scale(1)';
                card.style.transform = 'translateY(0)';
            });
        });

        // Mission and Vision cards
        const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
        missionVisionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.card-icon i');
                icon.style.transform = 'scale(1.2)';
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.card-icon i');
                icon.style.transform = 'scale(1)';
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // CTA Button Interactions
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });

        btn.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Timeline item click interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add pulse animation
            item.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                item.style.animation = '';
            }, 600);
        });
    });

    // Page load progress indicator
    function showLoadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(45deg, #FDBB2D, #FFA500)';
        progressBar.style.zIndex = '9999';
        progressBar.style.transition = 'width 0.3s ease';
        document.body.appendChild(progressBar);

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.remove();
                }, 500);
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }

    // Initialize loading progress
    showLoadingProgress();

    // Add entrance animations for hero section
    const heroElements = document.querySelectorAll('.about-hero h1, .about-hero p, .hero-stats');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.about-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        });
    }

    // Initialize form interactions if contact form exists
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        initContactFormInteractions(contactForm);
    }

    function initContactFormInteractions(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', () => {
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    console.log('About Us page initialized successfully!');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }

    .fade-in-up.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-animate {
        animation: timelineSlideIn 0.8s ease forwards;
    }

    @keyframes timelineSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        background-color: rgba(255, 255, 255, 0.6);
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: linear-gradient(45deg, #FDBB2D, #FFA500);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }

    .member-image img {
        transition: transform 0.3s ease;
    }

    .member-overlay {
        transition: opacity 0.3s ease;
    }

    .value-icon i, .card-icon i {
        transition: transform 0.3s ease;
    }

    .cta-btn i {
        transition: transform 0.3s ease;
    }

    .focused {
        transform: scale(1.02);
    }

    .has-value {
        color: #FDBB2D;
    }
`;

document.head.appendChild(style);
