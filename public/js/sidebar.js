export function createSidebar() {
  const sidebarSections = {
    'Start': {
      'Home': { url: '/public/index.html', external: false, icon: 'home' },
      'About Us': { url: '', external: false, icon: 'about' }
    },
    'Learn': {
      'Onboarding': { url: '', external: false, icon: 'onboarding' },
      'Human Skills': { url: '', external: false, icon: 'human' },
      'Leadership': { url: '', external: false, icon: 'leadership' },
      'Tech': { url: '/tech', external: false, icon: 'tech' },
      'Sports Betting': { url: '', external: false, icon: 'sports' }
    },
    'Access': {
      'Compliance': { url: 'https://wd3.myworkday.com/flutterbe/learning/mylearning', external: true, icon: 'compliance' },
      'Self-Development Fund': { url: 'https://www.therewardhub.com/flutterportugal/flex/shop/edit/_developmentcustomer#306dbf58-a947-474c-b311-948ff4a6dcc8', external: true, icon: 'sdf' },
      'Tools & Partnerships': { url: '', external: false, icon: 'tools' }
    },
    'Feedback': {
      'Help us grow': { url: '', external: true, icon: 'feedback' }
    }
  };

  const sectionsHTML = Object.entries(sidebarSections).map(([sectionTitle, links]) => {
    const linksHTML = Object.entries(links).map(([text, linkData]) => {
      const iconClass = `icon-${linkData.icon}`;

      return `
        <div class="sidebar-link" data-link="${text}">
          <div class="sidebar-link-icon ${iconClass}"></div>
          <span class="sidebar-link-text">${text}</span>
          ${linkData.external ? '<div class="sidebar-link-open"></div>' : ''}
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

  const sidebarLinkElements = document.querySelectorAll('.sidebar-link[data-link]');
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
}