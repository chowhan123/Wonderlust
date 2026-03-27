

  // // Fetch all the forms we want to apply custom Bootstrap validation styles to
  // const forms = document.querySelectorAll('.needs-validation')

  // // Loop over them and prevent submission
  // Array.from(forms).forEach(form => {
  //   form.addEventListener('submit', event => {
  //     if (!form.checkValidity()) {
  //       event.preventDefault()
  //       event.stopPropagation()
  //     }

  //     form.classList.add('was-validated')
  //   }, false)
  // })


/* ========================================
   MODERN TRAVEL WEBSITE - UPDATED SCRIPT.JS
   ======================================== */

// ========== BOOTSTRAP FORM VALIDATION ==========

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
            // Smooth scroll to first invalid field
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                firstInvalid.focus();
            }
        }

        form.classList.add('was-validated');
    }, false);
});

// ========== MOBILE NAVIGATION TOGGLE ==========

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        
        // Animate hamburger icon
        const icon = navToggle.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close mobile menu when clicking a link
    const navLinkItems = navLinks.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== CARD ANIMATIONS ON SCROLL ==========

// Intersection Observer for card animations
const cards = document.querySelectorAll('.listing-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Apply animation styles and observe cards
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// ========== IMAGE LAZY LOADING ==========

// Intersection Observer for lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            
            if (src) {
                img.src = src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== BUTTON LOADING STATES ==========

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .add-btn, .edit-btn').forEach(btn => {
    const originalClickHandler = btn.onclick;
    
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('loading')) return;
        
        // For form submissions, don't add loading state
        if (this.type === 'submit' || this.closest('form')) {
            return;
        }
        
        const originalText = this.innerHTML;
        this.classList.add('loading');
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        // Remove loading state after 2 seconds (adjust as needed)
        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// ========== WISHLIST/FAVORITE FUNCTIONALITY ==========

// Toggle wishlist/favorite (if you add heart icons to cards)
document.querySelectorAll('.wishlist-badge, .favorite-btn').forEach(badge => {
    badge.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const icon = badge.querySelector('i');
        if (icon) {
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                
                // Add animation
                badge.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 200);
                
                // Optional: Show toast notification
                showToast('Added to favorites!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('Removed from favorites', 'info');
            }
        }
    });
});

// ========== TOAST NOTIFICATIONS ==========

function showToast(message, type = 'success') {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colorMap = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    toast.innerHTML = `
        <i class="fas ${iconMap[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${colorMap[type] || '#10b981'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        font-size: 0.95rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast
if (!document.getElementById('toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .toast-notification {
                left: 1rem !important;
                right: 1rem !important;
                bottom: 1rem !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== SHARE FUNCTIONALITY ==========

const shareButton = document.querySelector('.share-button, .btn-share');
if (shareButton) {
    shareButton.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this amazing place!',
                    url: window.location.href
                });
                showToast('Shared successfully!', 'success');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Share cancelled');
                }
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!', 'success');
            } catch (err) {
                showToast('Failed to copy link', 'error');
            }
        }
    });
}

// ========== KEYBOARD NAVIGATION ==========

// Add keyboard navigation for cards
cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.querySelector('a')?.click();
        }
    });
});

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('show')) {
        navLinks.classList.remove('show');
        navToggle?.focus();
    }
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for scroll events
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

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== SCROLL PROGRESS BAR (OPTIONAL) ==========

// Uncomment to add a scroll progress bar at the top
/*
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #fe424d, #ff6b75);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', throttle(() => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
}, 100));
*/

// ========== PAGE LOAD INITIALIZATION ==========

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌍 Travel website loaded and ready!');
    
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Log viewport dimensions (useful for debugging responsive design)
    if (window.innerWidth <= 768) {
        console.log('📱 Mobile view');
    } else if (window.innerWidth <= 1024) {
        console.log('📱 Tablet view');
    } else {
        console.log('💻 Desktop view');
    }
});

// ========== RESIZE HANDLER ==========

window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navLinks?.classList.contains('show')) {
        navLinks.classList.remove('show');
        const icon = navToggle?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}, 250));

// ========== EXPORT FOR USE IN OTHER FILES ==========

window.travelApp = {
    showToast,
    debounce,
    throttle
};