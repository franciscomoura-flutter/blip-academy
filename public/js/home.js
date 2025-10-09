// Card data configuration
const cardData = [
  {
    image: 'assets/homecard_onboarding.jpeg',
    title: 'Onboarding',
    description: 'Every journey begins with a first step. Here\'s everything you need to enjoy, or support, an awesome onboarding experience.',
    url: 'https://flutter.interactgo.com/Interact/Pages/Content/Document.aspx?id=5990',
    external: true
  },
  {
    image: 'assets/homecard_humanskills.jpeg',
    title: 'Human Skills',
    description: 'Every human skill you develop creates waves of positive change that extend far beyond your immediate sphere.',
    url: '',
    external: false
  },
  {
    image: 'assets/homecard_leadership.jpeg',
    title: 'Leadership',
    description: 'When you develop your leadership skills, you don\'t just change your own trajectory – you influence everyone around you.',
    url: '',
    external: false
  },
  {
    image: 'assets/homecard_tech.jpeg',
    title: 'Tech',
    description: 'In the digital age, technical skills are superpowers that amplify your ability to create, innovate, and solve problems at scale.',
    url: '',
    external: false
  },
  {
    image: 'assets/homecard_sportsbetting.jpeg',
    title: 'Sports Betting',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
    url: '',
    external: false
  },
  {
    image: 'assets/homecard_toolspartnerships.jpeg',
    title: 'Tools & Partnerships',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
    url: '',
    external: false
  }
];

function createCard(card) {
  return `
    <div class="cta-card" data-url="${card.url}" data-external="${card.external}">
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
}

// Initialize cards when DOM is loaded
document.addEventListener('DOMContentLoaded', renderCards);

// Export for potential use in other modules
export { cardData, createCard, renderCards };