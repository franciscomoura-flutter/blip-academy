import { createSidebar } from './sidebar.js';

function isInIframe() {
    const bypassDomains = ['localhost', '127.0.0.1'];
    if (bypassDomains.some(domain => window.location.hostname.includes(domain))) {
        return true;
    }
    return window.self !== window.top;
}

function createLoader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <img src="assets/logo.svg" alt="Blip Academy" class="loader-logo">
            <div class="loader-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;

    // Add loader styles
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: radial-gradient(62.74% 59.4% at 81.88% -2.15%, rgb(var(--primary)) 0%, rgb(var(--black)) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.4s ease-out;
        }

        #loader::before {
            content: "";
            background-color: transparent;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' fill='%23000000'/%3E%3C/svg%3E");
            background-repeat: repeat;
            background-size: 600px;
            opacity: 1;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            filter: brightness(1.2);
            mix-blend-mode: multiply;
        }

        .loader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 50px;
        }

        .loader-logo {
            width: 500px;
            height: auto;
            animation: logoFloat 2s ease-in-out infinite alternate;
        }

        .loader-dots {
            display: flex;
            gap: 8px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgb(var(--primary));
            animation: dotPulse 1.5s infinite;
        }

        .dot:nth-child(1) {
            animation-delay: 0s;
        }

        .dot:nth-child(2) {
            animation-delay: 0.3s;
        }

        .dot:nth-child(3) {
            animation-delay: 0.6s;
        }

        @keyframes logoFloat {
            0% {
                transform: translateY(0px);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }

        @keyframes dotPulse {
            0%, 60%, 100% {
                transform: scale(1);
                opacity: 0.7;
            }
            30% {
                transform: scale(1.3);
                opacity: 1;
            }
        }

        #loader.fade-out {
            opacity: 0;
            pointer-events: none;
        }

        body.loading .main,
        body.loading .sidebar {
            opacity: 0;
            pointer-events: none;
        }

        body:not(.loading) .main,
        body:not(.loading) .sidebar {
            opacity: 1;
            transition: opacity 0.4s ease-in 0.1s;
        }
    `;

    document.head.appendChild(loaderStyles);
    document.body.appendChild(loader);
    document.body.classList.add('loading');
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        document.body.classList.remove('loading');

        // Faster transition with shorter delay
        setTimeout(() => {
            loader.classList.add('fade-out');

            // Remove loader after animation completes
            setTimeout(() => {
                loader.remove();
            }, 400);
        }, 50);
    }
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

async function initCommon() {
    if (!isInIframe()) {
        document.body.style.display = 'none';
        return;
    }

    // Show loader immediately
    createLoader();

    try {
        // Wait for sidebar to be created (this loads Firestore data)
        await createSidebar();

        // Reduced minimum loading time for faster transition
        await new Promise(resolve => setTimeout(resolve, 500));

        // Hide loader and show content
        hideLoader();

        // Add scroll event listener to the main element
        const mainElement = document.querySelector('.main');
        if (mainElement) {
            mainElement.addEventListener('scroll', handleScroll);
        }
    } catch (error) {
        console.error('Error loading page:', error);
        // Hide loader even if there's an error
        hideLoader();
    }
}

// Export hideLoader for use in other modules if needed
window.hideLoader = hideLoader;

document.addEventListener('DOMContentLoaded', initCommon);