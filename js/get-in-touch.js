// Get in Touch Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span>Sending...</span>';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            }, 2000);
        });
    }
    
    // Form validation
    const formInputs = contactForm?.querySelectorAll('input, select, textarea');
    formInputs?.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', validateField);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                field.classList.add('valid');
            } else {
                field.classList.add('invalid');
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                field.classList.add('valid');
            } else {
                field.classList.add('invalid');
            }
        }
        
        // Required field validation
        if (field.hasAttribute('required')) {
            if (value) {
                field.classList.add('valid');
            } else {
                field.classList.add('invalid');
            }
        }
    }
    
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessages = contactForm.querySelectorAll('.form-success, .form-error');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        // Insert at the top of the form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
    // Social Media Icons Hover Effects
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Office Cards Hover Animation
    const officeCards = document.querySelectorAll('.office-card');
    officeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Contact Form Container Animation
    const contactFormContainer = document.querySelector('.contact-form-container');
    const socialContainer = document.querySelector('.social-media-container');
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    [contactFormContainer, socialContainer, ...officeCards].forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        }
    });
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format phone number (basic formatting)
            if (value.length > 0) {
                if (value.startsWith('254')) {
                    // Kenyan number
                    value = '+254 ' + value.substring(3);
                } else if (value.startsWith('971')) {
                    // UAE number
                    value = '+971 ' + value.substring(3);
                } else if (value.length > 3) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
                }
            }
            
            e.target.value = value;
        });
    });
    
    // Auto-set minimum date for preferred contact date
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Subject-specific form behavior
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    if (subjectSelect && messageTextarea) {
        subjectSelect.addEventListener('change', function() {
            const subject = this.value;
            let placeholder = 'Tell us how we can help you...';
            
            switch(subject) {
                case 'visa-services':
                    placeholder = 'Please specify the type of visa you need and your travel dates...';
                    break;
                case 'freight-services':
                    placeholder = 'Please provide details about your shipment including origin, destination, and cargo type...';
                    break;
                case 'tours-packages':
                    placeholder = 'Tell us about your preferred tour destination and dates...';
                    break;
                case 'business-setup':
                    placeholder = 'Describe the type of business you want to setup and your requirements...';
                    break;
                case 'airport-pickup':
                    placeholder = 'Please provide your flight details and pickup location...';
                    break;
                default:
                    placeholder = 'Tell us how we can help you...';
            }
            
            messageTextarea.placeholder = placeholder;
        });
    }
    
    // Real-time character count for message
    if (messageTextarea) {
        const maxLength = 500;
        
        // Create character counter
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            font-size: 0.8rem;
            color: #6c757d;
            text-align: right;
            margin-top: 5px;
        `;
        
        messageTextarea.parentNode.appendChild(charCounter);
        
        function updateCharCount() {
            const remaining = maxLength - messageTextarea.value.length;
            charCounter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                charCounter.style.color = '#dc3545';
            } else if (remaining < 100) {
                charCounter.style.color = '#ffc107';
            } else {
                charCounter.style.color = '#6c757d';
            }
        }
        
        messageTextarea.addEventListener('input', updateCharCount);
        messageTextarea.maxLength = maxLength;
        updateCharCount();
    }
});

// Helper function to copy contact info
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show copied notification
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 0.9rem;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Add click-to-copy functionality to phone numbers and emails
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const text = item.querySelector('p');
        if (text && (text.textContent.includes('@') || text.textContent.includes('+'))) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', () => {
                copyToClipboard(text.textContent.trim());
            });
        }
    });
});
