import { html } from "../lib/html.js";
import { navItems, profile } from "../data/portfolio.js";
import { Icon } from "./Icons.jsx";

export function Header({ activePath, onNavigate }) {
  function handleClick(event, path) {
    event.preventDefault();
    event.currentTarget.closest(".site-header")?.classList.remove("is-open");
    onNavigate(path);
  }

  function toggleMenu(event) {
    const header = event.currentTarget.closest(".site-header");
    const isOpen = !header?.classList.contains("is-open");
    header?.classList.toggle("is-open", isOpen);
    event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  }

  return html`
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/" onClick=${(event) => handleClick(event, "/")} aria-label="Chitraksh's Portfolio">
          <img src=${profile.portrait} alt="" />
          <span>Chitraksh</span>
        </a>
        <button className="icon-button" type="button" aria-label="Open navigation" aria-expanded="false" onClick=${toggleMenu}>
          <${Icon} name="menu" />
        </button>
        <nav className="site-nav" aria-label="Main navigation">
          ${navItems.map(
            (item) => html`
              <a
                key=${item.path}
                className=${activePath === item.path || activePath.startsWith(`${item.path}/`) ? "is-active" : ""}
                href=${item.path}
                onClick=${(event) => handleClick(event, item.path)}
              >
                ${item.label}
              </a>
            `
          )}
        </nav>
      </div>
    </header>
  `;
}
