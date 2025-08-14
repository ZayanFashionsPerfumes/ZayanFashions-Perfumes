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
        initImageLoading();
        initSectionReveal();
        initScrollIndicator();
        initFloatingLogo();
        initCounterAnimation();
        initTypingEffect();
        initMobileOptimizations();
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

// Performance optimization: Throttle function
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

// Initialize image loading
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

// Initialize section reveal
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

// Initialize scroll indicator
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
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }, 16));
}

// Initialize floating logo effect
function initFloatingLogo() {
    const heroLogo = document.querySelector('.hero-logo-img');
    if (!heroLogo) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroLogo.style.transform = `translateY(${rate}px)`;
    }, 16));
}

// Initialize counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.count-number');
    if (counters.length === 0) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize typing effect
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    if (typingElements.length === 0) return;
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #D4AF37';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Touch event handling for mobile
    if ('ontouchstart' in window) {
        // Add touch-specific event listeners
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
        
        // Optimize scroll performance on mobile
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Prevent horizontal scroll on mobile
    function preventHorizontalScroll() {
        if (window.innerWidth <= 768) {
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
            
            // Ensure all sections respect viewport width
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.maxWidth = '100vw';
                section.style.overflowX = 'hidden';
            });
            
            // Fix any elements that might cause horizontal scroll
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                if (el.scrollWidth > window.innerWidth) {
                    el.style.maxWidth = '100vw';
                    el.style.overflowX = 'hidden';
                }
            });
        }
    }
    
    // Call on load and resize
    preventHorizontalScroll();
    window.addEventListener('resize', preventHorizontalScroll);
    
    // Mobile gesture support
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, {passive: true});
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for navigation
                console.log('Swipe down detected');
            }
        }
    }
    
    // Mobile performance optimizations
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            el.setAttribute('data-aos-duration', '800');
            el.setAttribute('data-aos-delay', '0');
        });
        
        // Optimize scroll events for mobile
        let ticking = false;
        function updateOnScroll() {
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, {passive: true});
        
        // Fix mobile viewport issues
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
        }
    }
}

// Initialize mobile optimizations
// initMobileOptimizations(); // This line is removed as it's now called in the main DOMContentLoaded listener

// Add preloader for better user experience
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <img src="images/logo/zayan-logo.jpg" alt="ZAYAN Logo">
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
