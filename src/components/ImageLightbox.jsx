import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { html } from "../lib/html.js";
import { Icon } from "./Icons.jsx";

export function ImageLightbox({ images, alt = "" }) {
  const [selectedSrc, setSelectedSrc] = useState(null);

  useEffect(() => {
    if (!selectedSrc) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedSrc(null);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSrc]);

  function closeLightbox() {
    setSelectedSrc(null);
  }

  const lightbox = selectedSrc
    ? html`
        <div
          className="image-lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick=${closeLightbox}
        >
          <img
            className="image-lightbox__image"
            src=${selectedSrc}
            alt=${alt}
            onClick=${(event) => event.stopPropagation()}
          />
        </div>
      `
    : null;

  return html`
    <${React.Fragment}>
      <div className="project-images">
        ${images.map((src) => html`
          <button
            key=${src}
            type="button"
            className="project-image-button glass-panel"
            onClick=${() => setSelectedSrc(src)}
            aria-label="View image fullscreen"
          >
            <img src=${src} alt=${alt} />
            <span className="project-image-button__zoom" aria-hidden="true">
              <${Icon} name="zoom" />
            </span>
          </button>
        `)}
      </div>
      ${lightbox ? createPortal(lightbox, document.body) : null}
    <//>
  `;
}
