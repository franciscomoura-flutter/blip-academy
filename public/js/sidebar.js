export function createSidebar() {
  const sidebarHTML = `
    <div class="sidebar">
      <div class="sidebar-section">
        <a href="/"><img src="assets/logo.svg" alt="Logo" class="sidebar-logo"></a>
      </div>
      <div class="sidebar-section">
        <span class="sidebar-title">Start</span>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-home"></div>
            <span class="sidebar-link-text">Home</span>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-about"></div>
            <span class="sidebar-link-text">About Us</span>
        </div>
      </div>
      <div class="sidebar-section">
        <span class="sidebar-title">Learn</span>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-onboarding"></div>
            <span class="sidebar-link-text">Onboarding</span>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-human"></div>
            <span class="sidebar-link-text">Human Skills</span>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-leadership"></div>
            <span class="sidebar-link-text">Leadership</span>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-tech"></div>
            <span class="sidebar-link-text">Tech</span>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-sports"></div>
            <span class="sidebar-link-text">Sports Betting</span>
        </div>
      </div>
      <div class="sidebar-section">
        <span class="sidebar-title">Access</span>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-compliance"></div>
            <span class="sidebar-link-text">Compliance</span>
            <div class="sidebar-link-open"></div>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-sdf"></div>
            <span class="sidebar-link-text">Self-Development Fund</span>
            <div class="sidebar-link-open"></div>
        </div>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-tools"></div>
            <span class="sidebar-link-text">Tools & Partnerships</span>
        </div>
      </div>
      <div class="sidebar-section">
        <span class="sidebar-title">Feedback</span>
        <div class="sidebar-link">
            <div class="sidebar-link-icon icon-feedback"></div>
            <span class="sidebar-link-text">Help us grow</span>
            <div class="sidebar-link-open"></div>
        </div>
      </div>
    </div>
  `;

  const sidebarDiv = document.createElement('div');
  sidebarDiv.innerHTML = sidebarHTML;
  document.body.insertBefore(sidebarDiv.firstElementChild, document.body.firstChild);
}