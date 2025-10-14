import { getCardSections, getAllSections } from './firebase.js';

function createCard(card) {
  const isDisabled = !card.url;
  const disabledClass = isDisabled ? ' disabled' : '';
  const actionText = isDisabled ? 'Coming Soon' : 'Learn more';

  return `
    <div class="cta-card${disabledClass}" data-url="${card.url || ''}" data-external="${card.external}">
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
          <span class="cta-card-action-text">${actionText}</span>
          <div class="cta-card-action-btn">
            <div class="cta-card-action-icon"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to setup hero button click event
async function setupHeroButton() {
  const heroBtn = document.querySelector('.hero-btn');

  if (!heroBtn) {
    console.error('Hero button not found');
    return;
  }

  try {
    // Get all sections from Firebase
    const sections = await getAllSections();

    // Find the about section with the specific ID
    const aboutSection = sections.find(section => section.id === 'RNwyBpqx6kzKv48X0K8O');

    if (aboutSection && aboutSection.url) {
      heroBtn.addEventListener('click', function () {
        if (aboutSection.external) {
          window.open(aboutSection.url, '_blank');
        } else {
          window.location.href = aboutSection.url;
        }
      });

      // Add cursor pointer style
      heroBtn.style.cursor = 'pointer';
    } else {
      console.warn('About section URL not found');
    }
  } catch (error) {
    console.error('Error setting up hero button:', error);
  }
}

// Function to render all cards
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

    // Separate cards with and without URLs
    const activeCards = cardData.filter(card => card.url);
    const disabledCards = cardData.filter(card => !card.url);

    // Combine active cards first, then disabled cards
    const allCards = [...activeCards, ...disabledCards];

    // Generate HTML for all cards
    const cardsHTML = allCards.map(card => createCard(card)).join('');

    // Insert cards into container
    cardsContainer.innerHTML = cardsHTML;

    // Add click event listeners only to active cards (those with URLs)
    const cardElements = document.querySelectorAll('.cta-card[data-url]:not(.disabled)');
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

// Initialize page when DOM is loaded
async function initializePage() {
  await setupHeroButton();
  await renderCards();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Export for potential use in other modules
export { createCard, renderCards, setupHeroButton };