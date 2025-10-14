import { getAllSections, getCardSections, getToolsPartnerships } from './firebase.js';

function createToolCard(tool) {
    // Determine what to show in the first section - icon or name as fallback
    const hasIcon = tool.icon && tool.icon.trim() !== '';
    const mainContent = hasIcon
        ? `<div class="tools-card-icon">
             <img src="${tool.icon}" alt="${tool.name || 'Tool'}" />
           </div>`
        : `<h3 class="tools-card-title">${tool.name || 'Tool Name'}</h3>`;

    return `
        <div class="tools-card" data-url="${tool.url || ''}" data-external="true">
            <div class="tools-card-section">
                ${mainContent}
                <span class="tools-card-description">${tool.description || 'Tool description'}</span>
            </div>
            <div class="tools-card-section">
                <div class="tools-card-action">
                    <span class="tools-card-action-text">Visit</span>
                    <div class="tools-card-action-btn">
                        <div class="tools-card-action-icon"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createCard(card) {
    return `
    <div class="cta-card" data-url="${card.url}" data-external="${card.external}">
      <div class="cta-card-section">
        <div class="cta-card-image">
          <img src="${card.image}" alt="${card.name}" />
        </div>
      </div>
      <div class="cta-card-section">
        <h3 class="cta-card-title">${card.name}</h3>
        <span class="cta-card-description">${card.description}</span>
      </div>
      <div class="cta-card-section">
        <div class="cta-card-action">
          <span class="cta-card-action-text">Learn more</span>
          <div class="cta-card-action-btn">
            <div class="cta-card-action-icon"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupScrollButtons() {
    const cardsContainer = document.querySelector('.cta-cards');
    const prevBtn = document.querySelector('.btn-previous');
    const nextBtn = document.querySelector('.btn-next');

    if (!cardsContainer || !prevBtn || !nextBtn) {
        console.error('Scroll buttons or cards container not found');
        return;
    }

    const cardWidth = 550; // Width of each card
    const gap = 25; // Gap between cards
    const scrollDistance = cardWidth + gap; // Total distance to scroll per card

    function scrollToNext() {
        const maxScrollLeft = cardsContainer.scrollWidth - cardsContainer.clientWidth;
        const currentScroll = cardsContainer.scrollLeft;
        const newScrollPosition = Math.min(currentScroll + scrollDistance, maxScrollLeft);

        cardsContainer.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });
    }

    function scrollToPrevious() {
        const currentScroll = cardsContainer.scrollLeft;
        const newScrollPosition = Math.max(currentScroll - scrollDistance, 0);

        cardsContainer.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });
    }

    // Previous button (scroll left)
    prevBtn.addEventListener('click', scrollToPrevious);

    // Next button (scroll right)
    nextBtn.addEventListener('click', scrollToNext);

    // Touch events for mobile
    prevBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    nextBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    // Prevent text selection
    prevBtn.addEventListener('selectstart', (e) => e.preventDefault());
    nextBtn.addEventListener('selectstart', (e) => e.preventDefault());
}

async function renderToolsCards() {
    const toolsContainer = document.querySelector('.tools-cards');

    if (!toolsContainer) {
        console.error('Tools cards container not found');
        return;
    }

    try {
        // Show loading state
        toolsContainer.innerHTML = '<p>Loading tools...</p>';

        // Get tools data from Firebase
        const toolsData = await getToolsPartnerships();

        if (toolsData.length === 0) {
            toolsContainer.innerHTML = '<p>No tools available at the moment.</p>';
            return;
        }

        // Generate HTML for tools cards
        const toolsHTML = toolsData.map(tool => createToolCard(tool)).join('');

        // Insert tools into container
        toolsContainer.innerHTML = toolsHTML;

        // Add click event listeners to tools cards with URLs
        const toolElements = document.querySelectorAll('.tools-card[data-url]');
        toolElements.forEach(toolElement => {
            toolElement.addEventListener('click', function () {
                const url = this.getAttribute('data-url');
                const isExternal = this.getAttribute('data-external') === 'true';

                if (url && url.trim() !== '') {
                    if (isExternal) {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error rendering tools cards:', error);
        toolsContainer.innerHTML = '<p>Error loading tools. Please try again later.</p>';
    }
}

async function renderCards() {
    const cardsContainer = document.querySelector('.cta-cards');

    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }

    try {
        // Show loading state
        cardsContainer.innerHTML = '<p>Loading cards...</p>';

        // Get card data from Firebase
        const cardData = await getCardSections();

        // Filter out cards without URLs
        const activeCards = cardData.filter(card => card.url);

        if (activeCards.length === 0) {
            cardsContainer.innerHTML = '<p>No cards available at the moment.</p>';
            return;
        }

        // Generate HTML for cards with URLs only
        const cardsHTML = activeCards.map(card => createCard(card)).join('');

        // Insert cards into container
        cardsContainer.innerHTML = cardsHTML;

        // Add click event listeners to all cards
        const cardElements = document.querySelectorAll('.cta-card[data-url]');
        cardElements.forEach(cardElement => {
            cardElement.addEventListener('click', function () {
                const url = this.getAttribute('data-url');
                const isExternal = this.getAttribute('data-external') === 'true';

                if (url) {
                    if (isExternal) {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }
            });
        });

        // Setup scroll buttons after cards are rendered
        setupScrollButtons();
    } catch (error) {
        console.error('Error rendering cards:', error);
        cardsContainer.innerHTML = '<p>Error loading cards. Please try again later.</p>';
    }
}

async function loadPageData() {
    try {
        // Get all sections from Firebase
        const sections = await getAllSections();

        // Find the section with the specific ID for Tools
        const toolsSection = sections.find(section =>
            section.id === 'xN4FtYFSBhdMCXPvrrJ6'
        );

        if (toolsSection) {
            // Update the hero page section with data from Firestore
            const heroPageSectionElement = document.querySelector('.hero-page-section');
            const heroPageNameElement = document.querySelector('.hero-page-name');

            if (heroPageSectionElement && toolsSection.sidebarSection) {
                heroPageSectionElement.textContent = toolsSection.sidebarSection;
            }

            if (heroPageNameElement && toolsSection.name) {
                heroPageNameElement.textContent = toolsSection.name;
            }
        } else {
            console.warn('Tools section not found in Firestore');
        }

        // Render both tools cards and CTA cards
        await Promise.all([
            renderToolsCards(),
            renderCards()
        ]);
    } catch (error) {
        console.error('Error loading page data:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPageData);

// Export for potential use in other modules
export { loadPageData, createCard, renderCards, createToolCard, renderToolsCards };