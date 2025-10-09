// Card data configuration
const cardData = [
    {
        image: 'assets/homecard_onboarding.jpeg',
        title: 'Onboarding',
        description: 'Every journey begins with a first step. Here\'s everything you need to enjoy, or support, an awesome onboarding experience.'
    },
    {
        image: 'assets/homecard_humanskills.jpeg',
        title: 'Human Skills',
        description: 'Every human skill you develop creates waves of positive change that extend far beyond your immediate sphere.'
    },
    {
        image: 'assets/homecard_leadership.jpeg',
        title: 'Leadership',
        description: 'When you develop your leadership skills, you don\'t just change your own trajectory – you influence everyone around you.'
    },
    {
        image: 'assets/homecard_tech.jpeg',
        title: 'Tech',
        description: 'In the digital age, technical skills are superpowers that amplify your ability to create, innovate, and solve problems at scale. '
    },
    {
        image: 'assets/homecard_sportsbetting.jpeg',
        title: 'Sports Betting',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.'
    },
    {
        image: 'assets/homecard_toolspartnerships.jpeg',
        title: 'Tools & Partnerships',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.'
    }
];

function createCard(card) {
    return `
    <div class="cta-card">
      <div class="cta-card-section">
        <div class="cta-card-image">
          <img src="${card.image}" alt="${card.title}" />
        </div>
      </div>
      <div class="cta-card-section">
        <h3 class="cta-card-title">${card.title}</h3>
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

// Function to render all cards
function renderCards() {
    const cardsContainer = document.querySelector('.cta-cards');

    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }

    // Generate HTML for all cards
    const cardsHTML = cardData.map(card => createCard(card)).join('');

    // Insert cards into container
    cardsContainer.innerHTML = cardsHTML;
}

// Initialize cards when DOM is loaded
document.addEventListener('DOMContentLoaded', renderCards);

// Export for potential use in other modules
export { cardData, createCard, renderCards };