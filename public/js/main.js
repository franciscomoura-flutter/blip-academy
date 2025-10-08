import { createSidebar } from './sidebar.js';

function isInIframe() {
    const bypassDomains = ['localhost', '127.0.0.1'];
    if (bypassDomains.some(domain => window.location.hostname.includes(domain))) {
        return true;
    }
    return window.self !== window.top;
}

function initCommon() {
    if (!isInIframe()) {
        document.body.style.display = 'none';
        return;
    }

    createSidebar();
}

document.addEventListener('DOMContentLoaded', initCommon);