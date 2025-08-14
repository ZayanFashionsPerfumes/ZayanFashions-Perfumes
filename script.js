// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Check if AOS is available before initializing
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    } else {
        console.warn('AOS library not loaded. Animations may not work properly.');
    }

    // Initialize all functionality
    try {
        initNavigation();
        initSmoothScrolling();
        initBackToTop();
        initMapMarkers();
        initLifestyleHover();
        initScrollEffects();
        initParallaxEffects();
    } catch (error) {
        console.error('Error initializing functionality:', error);
    }
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Interactive map markers
function initMapMarkers() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
        
        marker.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            showLocationInfo(location);
        });
    });
}

// Show location information modal
function showLocationInfo(location) {
    const locationData = {
        'Deira': {
            name: 'Deira Showroom',
            status: 'Current Location',
            address: 'Naif, Deira, Dubai',
            description: 'Our flagship showroom offering the complete ZAYAN experience.'
        },
        'Al Seef': {
            name: 'Al Seef Mall',
            status: 'Coming Soon',
            address: 'Al Seef, Dubai Creek',
            description: 'New location in the heart of Dubai\'s cultural district.'
        },
        'Bur Dubai': {
            name: 'Bur Dubai',
            status: 'Coming Soon',
            address: 'Bur Dubai District',
            description: 'Expanding our presence to serve more customers.'
        }
    };
    
    const info = locationData[location];
    if (info) {
        createLocationModal(info);
    }
}

// Create location information modal
function createLocationModal(info) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.location-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.name}</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <p class="status ${info.status === 'Current Location' ? 'current' : 'planned'}">${info.status}</p>
                <p class="address"><i class="fas fa-map-marker-alt"></i> ${info.address}</p>
                <p class="description">${info.description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .location-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #D4AF37;
            }
            
            .modal-header h3 {
                color: #D4AF37;
                margin: 0;
            }
            
            .modal-close {
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: #D4AF37;
            }
            
            .status {
                display: inline-block;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: 600;
                margin-bottom: 1rem;
            }
            
            .status.current {
                background: #D4AF37;
                color: white;
            }
            
            .status.planned {
                background: #F4E4BC;
                color: #B8860B;
            }
            
            .address {
                color: #666;
                margin-bottom: 1rem;
            }
            
            .address i {
                color: #D4AF37;
                margin-right: 0.5rem;
            }
            
            .description {
                color: #333;
                line-height: 1.6;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// Lifestyle section hover effects
function initLifestyleHover() {
    const lifestyleItems = document.querySelectorAll('.lifestyle-item');
    
    lifestyleItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in effect
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax effects for background elements
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax for texture overlay
        const textureOverlay = document.querySelector('.texture-overlay');
        if (textureOverlay) {
            textureOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax for Dubai skyline
        const dubaiSkyline = document.querySelector('.dubai-skyline');
        if (dubaiSkyline) {
            dubaiSkyline.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Enhanced scroll indicator animation
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Add pulse effect
        scrollIndicator.style.animation = 'bounce 2s infinite, pulse 2s infinite';
        
        // Add custom pulse animation
        if (!document.querySelector('#pulse-animation')) {
            const pulseStyle = document.createElement('style');
            pulseStyle.id = 'pulse-animation';
            pulseStyle.textContent = `
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(pulseStyle);
        }
    }
}

// Initialize scroll indicator
initScrollIndicator();

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial opacity to 1 to ensure visibility
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // Keep image visible even if it fails to load
            this.style.opacity = '1';
            this.style.filter = 'grayscale(100%)';
            // Add a fallback background color
            this.style.backgroundColor = '#f0f0f0';
        });
    });
}

// Initialize image loading
initImageLoading();

// Add smooth reveal animation for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        // Ensure sections are visible by default
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Add revealed class styles
    if (!document.querySelector('#reveal-styles')) {
        const revealStyles = document.createElement('style');
        revealStyles.id = 'reveal-styles';
        revealStyles.textContent = `
            section.revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(revealStyles);
    }
}

// Initialize section reveal
initSectionReveal();

// Add floating animation for hero logo
function initFloatingLogo() {
    const heroLogo = document.querySelector('.hero-logo-img');
    
    if (heroLogo) {
        heroLogo.style.animation = 'float 6s ease-in-out infinite';
        
        if (!document.querySelector('#float-animation')) {
            const floatStyle = document.createElement('style');
            floatStyle.id = 'float-animation';
            floatStyle.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(floatStyle);
        }
    }
}

// Initialize floating logo
initFloatingLogo();

// Add counter animation for store counts
function initCounterAnimation() {
    const counters = document.querySelectorAll('.count-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2000; // 2 seconds
                const increment = finalValue / (duration / 16); // 60fps
                let currentValue = 0;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + (target.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + (target.textContent.includes('+') ? '+' : '');
                    }
                }, 16);
                
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize counter animation
initCounterAnimation();

// Add typing effect for hero tagline
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid #D4AF37';
        tagline.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                    tagline.style.animation = 'none';
                }, 1000);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 2000);
        
        // Add blink animation
        if (!document.querySelector('#blink-animation')) {
            const blinkStyle = document.createElement('style');
            blinkStyle.id = 'blink-animation';
            blinkStyle.textContent = `
                @keyframes blink {
                    0%, 50% { border-color: #D4AF37; }
                    51%, 100% { border-color: transparent; }
                }
            `;
            document.head.appendChild(blinkStyle);
        }
    }
}

// Initialize typing effect
initTypingEffect();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for better performance
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    
    // Update navbar background
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
}, 16)); // 60fps throttling

// Add preloader for better user experience
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <img src="https://images.unsplash.com/photo-1615639164213-aab04da93c7c?w=200&h=200&fit=crop&crop=center" alt="ZAYAN Logo">
            </div>
            <div class="preloader-text">ZAYAN</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Add preloader styles
    if (!document.querySelector('#preloader-styles')) {
        const preloaderStyles = document.createElement('style');
        preloaderStyles.id = 'preloader-styles';
        preloaderStyles.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100000;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .preloader-content {
                text-align: center;
                color: #D4AF37;
            }
            
            .preloader-logo img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                border: 3px solid #D4AF37;
                margin-bottom: 1rem;
            }
            
            .preloader-text {
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 2rem;
                letter-spacing: 3px;
            }
            
            .preloader-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(212, 175, 55, 0.3);
                border-top: 3px solid #D4AF37;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .preloader.hidden {
                opacity: 0;
                visibility: hidden;
            }
        `;
        document.head.appendChild(preloaderStyles);
    }
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500);
    });
}

// Initialize preloader
initPreloader();
