// Form elements
const emailInput = document.getElementById('email');
const emailForm = document.getElementById('emailForm');

// Email validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(input, message) {
    const errorSpan = document.getElementById(input.id + '-error');
    input.classList.add('error');
    input.classList.remove('success');
    input.setAttribute('aria-invalid', 'true');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('visible');
    }
}

// Clear error message
function clearError(input) {
    const errorSpan = document.getElementById(input.id + '-error');
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('visible');
    }
}

// Show success state
function showInputSuccess(input) {
    input.classList.add('success');
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
}

// Klaviyo integration using onsite SDK
async function submitToKlaviyo(email, submitBtn) {
    const LIST_ID = "Yqt3J8";
    
    try {
        // Wait for Klaviyo SDK to load
        if (typeof _learnq === 'undefined') {
            throw new Error('Klaviyo SDK not loaded');
        }
        
        // Identify the user with their email
        _learnq.push(['identify', {
            '$email': email
        }]);
        
        // Subscribe to the list using Klaviyo's Subscribe API
        const formData = new FormData();
        formData.append('email', email);
        formData.append('g', LIST_ID);
        
        const response = await fetch(`https://manage.kmail-lists.com/ajax/subscriptions/subscribe`, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Important for Klaviyo forms endpoint
        });
        
        // no-cors mode doesn't give us response, so we assume success
        // Track the event
        _learnq.push(['track', 'Signed Up', {
            'email': email,
            'source': 'Landing Page'
        }]);
        
        console.log('Klaviyo signup successful:', {
            email: email,
            list: LIST_ID
        });
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        setTimeout(() => {
            showSuccess('Welcome aboard! 🎉');
        }, 300);
        
        // Reset form
        setTimeout(() => {
            emailForm.reset();
            emailInput.classList.remove('success');
        }, 500);
        
    } catch (error) {
        console.error('Klaviyo error:', error);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show error message
        showError(emailInput, 'Something went wrong. Please try again.');
    }
}

// Real-time email validation
emailInput.addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else if (this.value) {
        clearError(this);
        showInputSuccess(this);
    }
});

emailInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        if (isValidEmail(this.value)) {
            clearError(this);
            showInputSuccess(this);
        }
    }
});

// Email form submission with validation
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (!email) {
        showError(emailInput, 'Email is required');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    clearError(emailInput);
    
    // Submit to Klaviyo
    submitToKlaviyo(email, submitBtn);
});

// Fade-in on load
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
        
        // Trigger can animation
        const can = document.querySelector('.can');
        if (can) {
            setTimeout(() => {
                can.classList.add('visible');
            }, 800);
        }
        
        // Start carousel after page loads
        initCarousel();
    }, 100);
});

// Feature Carousel Rotation
function initCarousel() {
    const features = document.querySelectorAll('.feature-item');
    if (features.length === 0) return;
    
    let currentIndex = 0;
    
    // Set first item as active
    features[currentIndex].classList.add('active');
    announceFeature(features[currentIndex].textContent);
    
    // Rotate every 1.2 seconds
    setInterval(() => {
        // Mark current as exiting
        features[currentIndex].classList.remove('active');
        features[currentIndex].classList.add('exiting');
        
        // Move to next feature
        currentIndex = (currentIndex + 1) % features.length;
        
        // Show next feature
        features[currentIndex].classList.remove('exiting');
        features[currentIndex].classList.add('active');
        
        // Announce to screen readers
        announceFeature(features[currentIndex].textContent);
        
        // Clean up exiting class after transition
        setTimeout(() => {
            features.forEach(feature => {
                if (!feature.classList.contains('active')) {
                    feature.classList.remove('exiting');
                }
            });
        }, 600);
    }, 1200);
}

// Scroll animations for elements (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Parallax effect for can on desktop
let ticking = false;

function updateParallax() {
    const can = document.querySelector('.can');
    const canSection = document.querySelector('.can-section');
    
    if (!can || !canSection || window.innerWidth < 768) {
        return;
    }
    
    const scrolled = window.pageYOffset;
    const canPosition = canSection.offsetTop;
    const windowHeight = window.innerHeight;
    
    // Only apply parallax when can is in viewport
    if (scrolled + windowHeight > canPosition && scrolled < canPosition + canSection.offsetHeight) {
        const offset = (scrolled - canPosition) * 0.15;
        can.style.setProperty('--parallax-offset', `${offset}px`);
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Smooth form input focus animations
const inputs = document.querySelectorAll('.email-input, .text-input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Enhanced success state animation
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.setAttribute('role', 'status');
    successDiv.setAttribute('aria-live', 'polite');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        background: #000;
        color: #fff;
        padding: 24px 48px;
        border-radius: 12px;
        font-family: 'Figtree', sans-serif;
        font-size: 18px;
        font-weight: 600;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translate(-50%, -50%) scale(0.95)';
        setTimeout(() => successDiv.remove(), 400);
    }, 2800);
}

// Micro-interaction: Input field animations
const allInputs = document.querySelectorAll('.email-input');
allInputs.forEach(input => {
    // Subtle scale on focus
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.005)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Visual feedback on typing
    input.addEventListener('input', function() {
        if (this.value.length > 0) {
            this.style.fontWeight = '500';
        } else {
            this.style.fontWeight = '400';
        }
    });
});

// Button micro-interaction - ripple effect on click
document.querySelectorAll('.submit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Announce carousel changes to screen readers (debounced)
let lastAnnouncedFeature = '';
function announceFeature(featureText) {
    if (featureText !== lastAnnouncedFeature) {
        lastAnnouncedFeature = featureText;
        const carousel = document.querySelector('.feature-carousel');
        if (carousel) {
            carousel.setAttribute('aria-label', 'Product feature: ' + featureText.replace('→ ', ''));
        }
    }
}

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
    const can = document.querySelector('.can');
    if (can) can.style.animation = 'none';
    
    // Disable carousel rotation for reduced motion
    const features = document.querySelectorAll('.feature-item');
    if (features.length > 0) {
        features[0].classList.add('active');
        features[0].style.opacity = '1';
        features[0].style.top = '0';
    }
}

// Feature Modal System
const featureModals = {
    sparkling: document.getElementById('sparklingModal'),
    botanicals: document.getElementById('botanicalsModal'),
    nosugar: document.getElementById('nosugarModal')
};

const featureButtons = document.querySelectorAll('.feature-pill-btn');
let currentOpenModal = null;

// Open modal function
function openFeatureModal(modalId) {
    const modal = featureModals[modalId];
    if (!modal) return;

    currentOpenModal = modal;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus on close button
    setTimeout(() => {
        const closeBtn = modal.querySelector('.feature-modal-close');
        if (closeBtn) closeBtn.focus();
    }, 400);

    // Trap focus within modal
    trapModalFocus(modal);
}

// Close modal function
function closeFeatureModal(modal) {
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentOpenModal = null;

    // Return focus to the button that opened it
    const modalId = modal.id.replace('Modal', '');
    const button = document.querySelector(`[data-modal="${modalId}"]`);
    if (button) {
        setTimeout(() => button.focus(), 100);
    }
}

// Trap focus within modal
function trapModalFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    function handleTabKey(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }

    modal.addEventListener('keydown', handleTabKey);
}

// Add click listeners to feature buttons
featureButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        openFeatureModal(modalId);
    });

    // Keyboard support
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openFeatureModal(modalId);
        }
    });
});

// Add close button listeners
Object.values(featureModals).forEach(modal => {
    const closeBtn = modal.querySelector('.feature-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeFeatureModal(modal);
        });
    }

    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeFeatureModal(modal);
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentOpenModal) {
        closeFeatureModal(currentOpenModal);
    }
});

// Email Form Sticky/Docked Behavior - Unified for all devices
const emailFormContainer = document.getElementById('emailFormContainer');
const emailFormWrapper = document.querySelector('.email-form-wrapper');

if (emailFormWrapper && emailFormContainer) {
    // Use Intersection Observer for better performance
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the wrapper is in view (at least 10%), dock the form
            if (entry.isIntersecting) {
                emailFormContainer.classList.add('docked');
            } else {
                emailFormContainer.classList.remove('docked');
            }
        });
    }, {
        root: null,
        // Trigger when wrapper is visible
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.1
    });

    // Start observing
    formObserver.observe(emailFormWrapper);

    // Handle resize to ensure proper behavior
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-trigger observation on resize
            formObserver.disconnect();
            formObserver.observe(emailFormWrapper);
        }, 150);
    });
}

// Ingredients Banner Visibility on Mobile
const ingredientsBanner = document.querySelector('.ingredients-banner');
if (ingredientsBanner && window.innerWidth < 768) {
    const bannerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    bannerObserver.observe(ingredientsBanner);
} else if (ingredientsBanner) {
    // On desktop, show immediately
    ingredientsBanner.classList.add('visible');
}

