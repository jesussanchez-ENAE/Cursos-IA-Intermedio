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

// Chart.js Initialization
const initCharts = () => {
    const lineCtx = document.getElementById('lineChart');
    const barCtx = document.getElementById('barChart');

    if (lineCtx) {
        const years = ['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'];
        const sinIA = [18, 22, 27, 33, 39, 46, 52, 56, 58, 60, 61, 62];
        const conIA = [8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12];

        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Sin IA',
                        data: sinIA,
                        borderColor: '#a81730',
                        backgroundColor: 'rgba(168,23,48,0.08)',
                        borderWidth: 2.5,
                        pointBackgroundColor: '#a81730',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Con IA adoptada',
                        data: conIA,
                        borderColor: '#1D9E75',
                        backgroundColor: 'rgba(29,158,117,0.06)',
                        borderWidth: 2.5,
                        pointBackgroundColor: '#1D9E75',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderDash: [6,3],
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => ' ' + ctx.dataset.label + ': ' + ctx.parsed.y + '%'
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0, max: 75,
                        ticks: {
                            callback: v => v + '%',
                            font: { size: 11 },
                            color: '#888780'
                        },
                        grid: { color: 'rgba(136,135,128,0.15)' },
                        border: { dash: [4,4] }
                    },
                    x: {
                        ticks: {
                            font: { size: 11 },
                            color: '#888780',
                            autoSkip: false,
                            maxRotation: 0
                        },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    if (barCtx) {
        const professions = [
            'Auxiliar administrativo',
            'Cajero bancario',
            'Operador de datos',
            'Diseñador gráfico básico',
            'Agente de seguros',
            'Contable básico',
            'Paralegal',
            'Analista financiero',
            'Periodista generalista',
            'Especialista marketing'
        ];
        const risks = [90, 87, 85, 77, 73, 70, 65, 58, 52, 44];
        const colors = risks.map(r =>
            r >= 80 ? '#a81730' :
            r >= 65 ? '#EF9F27' :
            r >= 50 ? '#BA7517' : '#1D9E75'
        );

        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: professions,
                datasets: [{
                    label: 'Riesgo de obsolescencia',
                    data: risks,
                    backgroundColor: colors,
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => ' Riesgo: ' + ctx.parsed.x + '%'
                        }
                    }
                },
                scales: {
                    x: {
                        min: 0, max: 100,
                        ticks: {
                            callback: v => v + '%',
                            font: { size: 11 },
                            color: '#888780'
                        },
                        grid: { color: 'rgba(136,135,128,0.15)', borderDash: [4,4] }
                    },
                    y: {
                        ticks: {
                            font: { size: 11 },
                            color: '#5F5E5A'
                        },
                        grid: { display: false }
                    }
                }
            }
        });
    }
};

// Initialize everything on load
const initAll = () => {
    initCharts();
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

    document.querySelectorAll('.glass, .bento-card, canvas').forEach(el => {
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
