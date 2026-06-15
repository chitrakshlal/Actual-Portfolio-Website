import { html } from "../lib/html.js";
import { Icon } from "../components/Icons.jsx";
import { ImageLightbox } from "../components/ImageLightbox.jsx";
import { renderFormattedProjectParagraph } from "../lib/projectFormatting.js";
import {
  aboutParagraphs,
  certifications,
  experiences,
  homeCards,
  profile,
  getProjectPreview,
  projectCases,
  softSkills,
  technicalSkills,
} from "../data/portfolio.js";

function LinkButton({ href, onNavigate, children, variant = "primary" }) {
  return html`
    <a className=${`button button--${variant}`} href=${href} onClick=${(event) => {
      if (!onNavigate || href.startsWith("mailto:") || href.startsWith("http")) return;
      event.preventDefault();
      onNavigate(href);
    }}>
      <span>${children}</span>
      <${Icon} name="arrow" />
    </a>
  `;
}

function PageTitle({ title, text }) {
  return html`
    <section className="page-title shell" data-reveal>
      <h1>${title}</h1>
      ${text ? html`<p>${text}</p>` : null}
    </section>
  `;
}

function SocialLinks() {
  return html`
    <div className="social-row">
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
  `;
}

function TextBlock({ children }) {
  return html`<div className="text-block glass-panel" data-reveal>${children}</div>`;
}

function SkillList({ title, items }) {
  return html`
    <section className="list-panel glass-panel" data-reveal>
      <h2>${title}</h2>
      <ul>
        ${items.map((item) => html`<li key=${item}>${item}</li>`)}
      </ul>
    </section>
  `;
}

export function HomePage({ onNavigate }) {
  return html`
    <main id="main-content">
      <section className="home-intro shell">
        <div data-reveal>
          <p className="eyebrow">Portfolio</p>
          <h1>${profile.name}</h1>
          <p>${profile.label}</p>
        </div>
        <img src=${profile.portraitLarge} alt="Chitraksh Lal Ajit Kumar" width="280" height="280" />
      </section>

      <section className="content-section shell">
        <h2 className="section-heading" data-reveal>Featured project areas</h2>
        <div className="home-card-grid">
          ${homeCards.map((card) => html`
            <article key=${card.title} className="home-card glass-panel" data-reveal>
              <img src=${card.image} alt="" />
              <div>
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <${LinkButton} href=${card.path} onNavigate=${onNavigate} variant="secondary">${card.button}<//>
              </div>
            </article>
          `)}
        </div>
      </section>
    </main>
  `;
}

export function AboutPage() {
  return html`
    <main id="main-content">
      <${PageTitle} title="About Me" />
      <section className="content-section shell about-layout">
        <div className="about-photo-card glass-panel" data-reveal>
          <img className="about-photo" src=${profile.portraitLarge} alt="Chitraksh Lal Ajit Kumar" />
        </div>
        <${TextBlock}>
          ${aboutParagraphs.map((paragraph) => html`<p key=${paragraph}>${paragraph}</p>`)}
        <//>
      </section>
      <section className="content-section shell contact-grid">
        <div className="contact-card glass-panel" data-reveal>
          <h2>Email</h2>
          <a href=${`mailto:${profile.email}`}>${profile.email}</a>
        </div>
        <div className="contact-card glass-panel" data-reveal>
          <h2>Socials</h2>
          <${SocialLinks} />
        </div>
      </section>
    </main>
  `;
}

export function ProjectsPage({ onNavigate }) {
  return html`
    <main id="main-content">
      <${PageTitle} title="Projects" />
      <section className="content-section shell">
        <div className="project-card-grid">
          ${projectCases.map((item) => html`
            <a
              key=${item.id}
              className="project-card glass-panel"
              href=${`/aeronautical-projects/${item.id}`}
              onClick=${(event) => {
                if (!onNavigate) return;
                event.preventDefault();
                onNavigate(`/aeronautical-projects/${item.id}`);
              }}
              data-reveal
            >
              <img src=${item.image} alt="" />
              <div>
                <h3>${item.title}</h3>
                <p>${renderFormattedProjectParagraph(getProjectPreview(item))}</p>
              </div>
            </a>
          `)}
        </div>
      </section>
    </main>
  `;
}

export function ProjectDetailPage({ project, onNavigate }) {
  return html`
    <main id="main-content">
      <section className="page-title shell" data-reveal>
        <${LinkButton} href="/aeronautical-projects" onNavigate=${onNavigate} variant="ghost">Back to projects<//>
        <h1>${project.title}</h1>
      </section>
      <section className="project-list shell">
        <article className="project-section" data-reveal>
          <${ImageLightbox} images=${project.images} alt=${project.title} />
          <div className="project-copy glass-panel">
            <h2>${project.title}</h2>
            ${project.techStack?.length ? html`
              <ul className="project-tech-stack">
                ${project.techStack.map((item) => html`<li key=${item}>${item}</li>`)}
              </ul>
            ` : null}
            ${project.links?.demo ? html`
              <p className="project-links">
                <a href=${project.links.demo} target="_blank" rel="noreferrer">Open dashboard demo</a>
              </p>
            ` : null}
            ${project.fullDescription.map((paragraph) => html`
              <p key=${paragraph}>${renderFormattedProjectParagraph(paragraph)}</p>
            `)}
          </div>
        </article>
      </section>
    </main>
  `;
}

export function SkillsPage() {
  return html`
    <main id="main-content">
      <${PageTitle} title="Skills & Experiences" />
      <section className="content-section shell skill-layout">
        <${SkillList} title="Soft Skills" items=${softSkills} />
        <${SkillList} title="Technical Skills" items=${technicalSkills} />
      </section>

      <section className="content-section shell">
        <h2 className="section-heading" data-reveal>Experiences & Soft Skills Attainment</h2>
        <div className="experience-list">
          ${experiences.map((item) => html`
            <article key=${item.title} className="experience-row glass-panel" data-reveal>
              <img src=${item.image} alt=${item.title} />
              <div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </article>
          `)}
        </div>
      </section>
    </main>
  `;
}

export function CertificationsPage() {
  return html`
    <main id="main-content">
      <${PageTitle} title="Certifications & Awards" />
      <section className="content-section shell cert-list">
        <article className="cert-row glass-panel" data-reveal>
          <img src=${certifications[0].image} alt="" />
          <ul>
            <li>Certificate Of Completion Gas Turbine Operation & Maintenance</li>
            <li>Certificate of Attendance Aircraft Ground Handling & Practices</li>
          </ul>
        </article>
        <article className="cert-row glass-panel" data-reveal>
          <img src=${certifications[1].image} alt="" />
          <ul>
            <li>Certificate of Academic Excellence</li>
          </ul>
        </article>
      </section>
    </main>
  `;
}
