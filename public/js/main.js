import { createSidebar } from './sidebar.js';

function isInIframe() {
    const bypassDomains = ['localhost', '127.0.0.1', 'franciscomoura-flutter.github.io'];
    if (bypassDomains.some(domain => window.location.hostname.includes(domain))) {
        return true;
    }
    return window.self !== window.top;
}

function handleScroll() {
    const mainElement = document.querySelector('.main');
    const heroHeader = document.querySelector('.hero-header');

    if (!heroHeader) return;

    const heroHeaderHeight = heroHeader.offsetHeight;
    const scrollThreshold = heroHeaderHeight;

    if (mainElement.scrollTop > scrollThreshold) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

function initCommon() {
    if (!isInIframe()) {
        document.body.style.display = 'none';
        return;
    }

    createSidebar();

    // Add scroll event listener to the main element
    const mainElement = document.querySelector('.main');
    if (mainElement) {
        mainElement.addEventListener('scroll', handleScroll);
    }
}

document.addEventListener('DOMContentLoaded', initCommon);