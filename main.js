// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const leadForm = document.getElementById('lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = leadForm.querySelector('button');
        const originalText = button.innerText;
        
        button.innerText = 'PROCESANDO...';
        button.style.opacity = '0.7';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            button.innerText = '¡REGISTRO COMPLETADO!';
            button.style.backgroundColor = '#28a745';
            button.style.opacity = '1';
            
            // Reset form after delay
            setTimeout(() => {
                leadForm.reset();
                button.innerText = originalText;
                button.style.backgroundColor = 'var(--accent-color)';
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Interactive Mouse-Tracking Card Glows
const initMouseGlow = () => {
    const cards = document.querySelectorAll('.bento-card, .glass');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

// Interactive Vertical Timeline Accordion
const initAccordion = () => {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                items.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
};



// Initialize everything on load
const initAll = () => {
    initMouseGlow();
    initAccordion();

    // Navbar mobile toggle
    const toggleBtn = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleBtn && navLinks) {
        const toggleMenu = (forceClose = false) => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            const shouldOpen = forceClose ? false : !isExpanded;
            
            toggleBtn.setAttribute('aria-expanded', shouldOpen);
            toggleBtn.setAttribute('aria-label', shouldOpen ? 'Cerrar menú' : 'Abrir menú');
            
            if (shouldOpen) {
                navLinks.classList.add('active');
            } else {
                navLinks.classList.remove('active');
            }
        };

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
                toggleMenu(true);
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(true);
            });
        });
    }
    
    // Observer for reveal-on-scroll animations
    const observerOptions = { threshold: 0.05 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass, .bento-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
};

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
