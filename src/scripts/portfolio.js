'use strict';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// ============ MENU (optionnel, safe) ============
(function initMenu() {
  const menu     = document.querySelector(".header__nav");
  const menuBtn  = document.querySelector(".menu__btn");
  const overlay  = document.querySelector(".blur-overlay");

  if (!menu || !menuBtn || !overlay) return; // pas de header/menu => on sort

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu--open");
    overlay.classList.toggle("hidden");
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("menu--open");
    overlay.classList.add("hidden");
  });
})();


// ============ ANCRAGES SMOOTH (optionnel, safe) ============
(function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (!target) return; // si l’ancre n’existe pas, on laisse le comportement normal
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

// ============ PARALLAXE ============
(function initParallax() {
  const bg = document.querySelector('.parallax-bg');
  if (!bg) return; // pas de calque => on sort

  const PARALLAX_FACTOR = 0.02;
  let ticking = false;

  const update = () => {
    const y = -window.scrollY * PARALLAX_FACTOR;
    bg.style.transform = `translateY(${y}px) translateZ(0)`;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();

// ============ CARTES / BOUTONS ============
const DESKTOP_BREAKPOINT = 1025;
const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;

function activeClassFor(card) {
  const base = [...card.classList].find(c => c.startsWith('projets__') && !c.includes('--'));
  return base ? `${base}--active` : null;
}

function wireUp() {
  document.querySelectorAll('.bouton').forEach(card => {
    const clone = card.cloneNode(true);
    card.replaceWith(clone);
  });

  document.querySelectorAll('.bouton').forEach(card => {
    const link = card.querySelector('.contenu__lien');
    const header = card.querySelector('[class$="header"]') || card;
    const activeClass = activeClassFor(card);

    if (isDesktop()) {
      if (link) {
        card.addEventListener('click', (e) => {
          if (e.target.closest('a')) return;
          window.location.href = link.href;
        });
      }
    } else {
      if (header && activeClass) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.contenu__lien')) return;
          card.classList.toggle(activeClass);
        });
      }
    }
  });
}

wireUp();
window.addEventListener('resize', () => wireUp());
