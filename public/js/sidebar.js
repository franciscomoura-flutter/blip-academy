import { getSidebarSections } from './firebase.js';

export async function createSidebar() {
  try {
    // Get sidebar sections from Firebase
    const sidebarSections = await getSidebarSections();

    if (Object.keys(sidebarSections).length === 0) {
      console.error('No sidebar sections found');
      return;
    }

    const sectionsHTML = Object.entries(sidebarSections).map(([sectionTitle, links]) => {
      // Separate links with and without URLs
      const activeLinks = [];
      const disabledLinks = [];

      Object.entries(links).forEach(([text, linkData]) => {
        if (linkData.url) {
          activeLinks.push([text, linkData]);
        } else {
          disabledLinks.push([text, linkData]);
        }
      });

      // Combine active links first, then disabled links
      const allLinks = [...activeLinks, ...disabledLinks];

      const linksHTML = allLinks.map(([text, linkData]) => {
        const iconClass = `icon-${linkData.icon}`;
        const isDisabled = !linkData.url;
        const disabledClass = isDisabled ? ' disabled' : '';

        return `
          <div class="sidebar-link${disabledClass}" data-link="${text}">
            <div class="sidebar-link-icon ${iconClass}"></div>
            <span class="sidebar-link-text">${text}</span>
            ${linkData.external && !isDisabled ? '<div class="sidebar-link-open"></div>' : ''}
            ${isDisabled ? '<div class="sidebar-link-coming-soon">Coming Soon</div>' : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="sidebar-section">
          <span class="sidebar-title">${sectionTitle}</span>
          ${linksHTML}
        </div>
      `;
    }).join('');

    const sidebarHTML = `
      <div class="sidebar">
        <div class="sidebar-section">
          <a href="/public/index.html"><img src="assets/logo.svg" alt="Logo" class="sidebar-logo"></a>
        </div>
        ${sectionsHTML}
      </div>
    `;

    const allLinks = {};
    Object.values(sidebarSections).forEach(section => {
      Object.assign(allLinks, section);
    });

    const sidebarDiv = document.createElement('div');
    sidebarDiv.innerHTML = sidebarHTML;
    document.body.insertBefore(sidebarDiv.firstElementChild, document.body.firstChild);

    const sidebarLinkElements = document.querySelectorAll('.sidebar-link[data-link]:not(.disabled)');
    sidebarLinkElements.forEach(element => {
      element.addEventListener('click', function () {
        const linkKey = this.getAttribute('data-link');
        const linkData = allLinks[linkKey];

        if (linkData && linkData.url) {
          if (linkData.external) {
            window.open(linkData.url, '_blank');
          } else {
            window.location.href = linkData.url;
          }
        }
      });
    });
  } catch (error) {
    console.error('Error creating sidebar:', error);
  }
}