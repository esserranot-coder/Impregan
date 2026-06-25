/**
 * main.js - Interactivity and animations for Suministros Impregan
 */

async function loadComponent(id, file) {
    try {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById(id).outerHTML = html;
    } catch (e) {
        console.warn('Failed to load ' + file, e);
    }
}

function initComponents() {
    const currentPage = document.body.dataset.page || '';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.pageMatch === currentPage) {
            link.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1');
            link.classList.remove('text-slate-600', 'hover:text-primary');
        }
    });
}

function initScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    const onScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-md', 'bg-white/98');
        } else {
            header.classList.remove('shadow-md', 'bg-white/98');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initForm() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }
}

function initSectionNav() {
    const links = document.querySelectorAll('[data-section-match]');
    const sections = [];
    const headerOffset = 140;

    links.forEach(link => {
        const id = link.dataset.sectionMatch;
        const el = document.getElementById(id);
        if (el && !sections.some(s => s.id === id)) sections.push({ el, id });
    });

    sections.sort((a, b) => a.el.offsetTop - b.el.offsetTop);

    function setActive(link, isActive) {
        link.classList.toggle('text-primary', isActive);
        link.classList.toggle('text-slate-500', !isActive && link.classList.contains('cat-nav-link'));
        link.classList.toggle('text-slate-600', !isActive && link.classList.contains('nav-link'));
        link.classList.toggle('border-b-2', isActive);
        link.classList.toggle('border-primary', isActive);
        link.classList.toggle('pb-1', isActive);
        if (link.classList.contains('nav-link')) {
            link.classList.toggle('hover:text-primary', !isActive);
        }
    }

    function updateActive() {
        let currentId = null;
        for (const { el, id } of sections) {
            if (el.getBoundingClientRect().top <= headerOffset + 50) {
                currentId = id;
            } else break;
        }

        // Only manage Inicio on index.html
        if (document.body.dataset.page === 'index') {
            const atTop = window.scrollY < headerOffset + 50;
            const inicioLink = document.querySelector('[data-page-match="index"]');
            if (inicioLink) setActive(inicioLink, atTop && !currentId);
        }

        links.forEach(link => setActive(link, link.dataset.sectionMatch === currentId));
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Suministros Impregan - Web Initialized');

    await Promise.all([
        loadComponent('header-placeholder', 'components/header.html'),
        loadComponent('footer-placeholder', 'components/footer.html'),
    ]);

    initComponents();
    initScrollEffect();
    initSmoothScroll();
    initForm();
    initSectionNav();
});
