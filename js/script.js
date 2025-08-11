// Greek Chapter Bulk Benefits - Premium JavaScript (FIXED VERSION)
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    mobileMenuBtn?.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Update ARIA attributes
        this.setAttribute('aria-expanded', !isActive);
        mobileMenu.setAttribute('aria-hidden', isActive);
    });
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            // Update ARIA attributes
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Counter Animation =====
    const counter = document.querySelector('.counter');
    if (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    }
    
    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smoother animations
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with performance optimization
    const animatedElements = document.querySelectorAll('.reveal-text, .process-step, .pricing-card, .fade-in');
    
    // Only observe if elements exist
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }
    
    // ===== Floating Action Button =====
    const fab = document.getElementById('fab');
    if (fab) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                fab.classList.add('visible');
            } else {
                fab.classList.remove('visible');
            }
        });
    }
    
    // ===== Review Carousel =====
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentReview = 0;
    let reviewInterval;
    
    function showReview(index) {
        reviewCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (reviewCards[index] && dots[index]) {
            reviewCards[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentReview = index;
            showReview(currentReview);
            // Reset auto-rotation timer
            clearInterval(reviewInterval);
            startReviewRotation();
        });
    });
    
    // Start auto-rotation
    function startReviewRotation() {
        if (reviewCards.length > 0) {
            reviewInterval = setInterval(() => {
                currentReview = (currentReview + 1) % reviewCards.length;
                showReview(currentReview);
            }, 5000);
        }
    }
    
    startReviewRotation();
    
    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===== Email Support Banner =====
    const emailBanner = document.getElementById('email-support-banner');
    const bannerClose = document.getElementById('banner-close');
    
    // Show banner and add body class
    if (emailBanner) {
        document.body.classList.add('has-banner');
    }
    
    bannerClose?.addEventListener('click', () => {
        emailBanner.classList.add('hidden');
        document.body.classList.remove('has-banner');
    });
    
    // ===== Social Proof Notifications =====
    const socialProofContainer = document.getElementById('social-proof');
    const notifications = [
        { name: 'John', org: 'UCLA', action: 'just requested a quote' },
        { name: 'Sarah', org: 'Ohio State', action: 'ordered 45 hoodies' },
        { name: 'Mike', org: 'Texas A&M', action: 'saved $650 on their order' },
        { name: 'Emily', org: 'Florida State', action: 'customized 30 shirts' },
        { name: 'Alex', org: 'Georgia Tech', action: 'received their order' }
    ];
    
    function showNotification() {
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        const notificationEl = document.createElement('div');
        notificationEl.className = 'social-proof-notification';
        notificationEl.innerHTML = `
            <i class="fas fa-bell"></i>
            <div class="social-proof-text">
                <strong>${notification.name}</strong> from ${notification.org} ${notification.action}
            </div>
        `;
        
        socialProofContainer.appendChild(notificationEl);
        
        setTimeout(() => notificationEl.classList.add('show'), 100);
        
        setTimeout(() => {
            notificationEl.classList.remove('show');
            setTimeout(() => notificationEl.remove(), 500);
        }, 5000);
    }
    
    // Show notifications periodically with cleanup
    let notificationInterval;
    if (socialProofContainer) {
        // Initial notification after 3 seconds
        const initialTimeout = setTimeout(showNotification, 3000);
        
        // Regular notifications every 15 seconds
        notificationInterval = setInterval(showNotification, 15000);
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearTimeout(initialTimeout);
            clearInterval(notificationInterval);
        });
    }
    
    // ===== Form Handling - COMPLETELY DISABLED FOR FORMSPREE =====
    const form = document.getElementById('bulk-quote-form');
    if (!form) return;
    
    // DISABLE ALL FORM JAVASCRIPT - LET FORM SUBMIT NATURALLY TO FORMSPREE
    console.log('Form handling disabled - using native form submission to Formspree');
    return;
    
    // ===== Parallax Effects =====
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-particles');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let headerTicking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--primary-black)';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
        headerTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!headerTicking) {
            window.requestAnimationFrame(updateHeader);
            headerTicking = true;
        }
    }, { passive: true });
});
