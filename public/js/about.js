import { getAllSections, getCardSections } from './firebase.js';

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

        if (cardData.length === 0) {
            cardsContainer.innerHTML = '<p>No cards available at the moment.</p>';
            return;
        }

        // Generate HTML for all cards
        const cardsHTML = cardData.map(card => createCard(card)).join('');

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
    } catch (error) {
        console.error('Error rendering cards:', error);
        cardsContainer.innerHTML = '<p>Error loading cards. Please try again later.</p>';
    }
}

async function loadPageData() {
    try {
        // Get all sections from Firebase
        const sections = await getAllSections();

        // Find the section with the specific ID
        const aboutSection = sections.find(section =>
            section.id === 'RNwyBpqx6kzKv48X0K8O'
        );

        if (aboutSection) {
            // Update the hero page section with data from Firestore
            const heroPageSectionElement = document.querySelector('.hero-page-section');
            const heroPageNameElement = document.querySelector('.hero-page-name');

            if (heroPageSectionElement && aboutSection.sidebarSection) {
                heroPageSectionElement.textContent = aboutSection.sidebarSection;
            }

            if (heroPageNameElement && aboutSection.name) {
                heroPageNameElement.textContent = aboutSection.name;
            }
        } else {
            console.warn('About Us section not found in Firestore');
        }

        // Also render the cards
        await renderCards();
    } catch (error) {
        console.error('Error loading page data:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPageData);

// Export for potential use in other modules
export { loadPageData, createCard, renderCards };