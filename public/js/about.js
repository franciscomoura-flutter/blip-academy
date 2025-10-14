import { getAllSections } from './firebase.js';

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
    } catch (error) {
        console.error('Error loading page data:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPageData);

// Export for potential use in other modules
export { loadPageData };