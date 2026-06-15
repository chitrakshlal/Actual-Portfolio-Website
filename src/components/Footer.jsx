import { html } from "../lib/html.js";
import { navItems, profile } from "../data/portfolio.js";
import { Icon } from "./Icons.jsx";

export function Footer({ onNavigate }) {
  return html`
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h2>${profile.name}</h2>
          <p>${profile.label}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          ${navItems.map(
            (item) => html`
              <a
                key=${item.path}
                href=${item.path}
                onClick=${(event) => {
                  event.preventDefault();
                  onNavigate(item.path);
                }}
              >
                ${item.label}
              </a>
            `
          )}
        </nav>
        <div className="footer-socials">
          <a className="social-link" href=${`mailto:${profile.email}`} aria-label="Email Chitraksh">
            <span className="social-link__icon"><${Icon} name="mail" /><//>
          </a>
          <a className="social-link" href=${profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <span className="social-link__icon"><${Icon} name="linkedin" /><//>
          </a>
          <a className="social-link" href=${profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <span className="social-link__icon"><${Icon} name="whatsapp" /><//>
          </a>
        </div>
      </div>
    </footer>
  `;
}
