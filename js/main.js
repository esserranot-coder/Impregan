/**
 * main.js - Interactivity and animations for Suministros Impregan
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Suministros Impregan - Web Initialized');

    // Smooth scroll for anchor links
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

    // Sticky Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-md', 'bg-white/98');
        } else {
            header.classList.remove('shadow-md', 'bg-white/98');
        }
    });

    // Simple Form Validation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }
});
