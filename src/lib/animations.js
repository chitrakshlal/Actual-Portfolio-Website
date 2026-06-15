import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis;
let rafId;

export function startMotion() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  if (reducedMotion) {
    document.querySelectorAll("[data-reveal]").forEach((node) => {
      node.style.opacity = "1";
      node.style.transform = "none";
    });
    return () => {};
  }

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.05,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
  }

  gsap.set("[data-reveal]", { autoAlpha: 0, y: 28 });
  gsap.utils.toArray("[data-reveal]").forEach((node) => {
    gsap.to(node, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: node,
        start: "top 84%",
      },
    });
  });

  gsap.utils.toArray("[data-parallax]").forEach((node) => {
    gsap.to(node, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: node.parentElement || node,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function stopMotion() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  if (rafId) cancelAnimationFrame(rafId);
  if (lenis) lenis.destroy();
  rafId = undefined;
  lenis = undefined;
}
