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
  const moi      = document.querySelector(".header__image");

  if (!menu || !menuBtn || !overlay || !moi) return;

  const openMenu = () => {
    menu.classList.add("menu--open");
    overlay.classList.remove("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    menu.classList.remove("menu--open");
    overlay.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => {
    if (menu.classList.contains("menu--open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  menu.addEventListener("click", (e) => {
    if (e.target.closest(".menu__link")) {
      closeMenu();
    }
  });

  moi.addEventListener("mouseover", () => {
    moi.src = "assets/images/moi__2.webp";
  });
  moi.addEventListener("mouseout", () => {
    moi.src = "assets/images/moi__1.webp";
  });
})();

// ============ ANCRAGES SMOOTH (optionnel, safe) ============
(function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');

      // Si c'est juste "#", on ne fait rien
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return; // si l’ancre n’existe pas, comportement normal

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

// ————— PARALLAX STARS (couches + vitesses par étoile) —————
(function initParallaxStars() {
  // 1) Crée le conteneur (une seule fois)
  let container = document.querySelector('.parallax-stars');
  if (!container) {
    container = document.createElement('div');
    container.className = 'parallax-stars';
    document.body.appendChild(container);
  }

  // 2) Paramètres
  const LAYERS = [
    { count: 75, speed: 0.012, size: [2, 3] },  // arrière-plan
    { count: 50, speed: 0.025, size: [4, 5] },  // milieu
    { count: 25, speed: 0.050, size: [6, 12] },  // avant-plan
  ];

  // 3) Génère les couches + étoiles (vitesse individuelle par étoile)
  const layers = LAYERS.map(cfg => {
    const layer = document.createElement('div');
    layer.className = 'parallax-stars__layer';
    layer.dataset.speed = String(cfg.speed);
    container.appendChild(layer);

    for (let i = 0; i < cfg.count; i++) {
      const star = document.createElement('div');
      star.className = 'parallax-star';

      const size = rand(cfg.size[0], cfg.size[1]);
      star.style.width  = `${size}px`;
      star.style.height = `${size}px`;

      // position aléatoire (légèrement hors viewport pour éviter les bords vides)
      star.style.left = `${Math.random() * 102 - 1}%`;
      star.style.top  = `${Math.random() * 102 - 1}%`;

      // vitesse PAR ÉTOILE (autour de la vitesse de la couche)
      star.dataset.speed = String(cfg.speed * (0.6 + Math.random() * 0.8));

      // variations subtiles
      star.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
      if (Math.random() < 0.25) star.style.filter = 'blur(0.5px)';

      layer.appendChild(star);
    }
    return layer;
  });

  // 4) Scroll handler — anime chaque étoile individuellement
  let ticking = false;
  function update() {
    const y = window.scrollY;

    layers.forEach(layer => {
      layer.querySelectorAll('.parallax-star').forEach(star => {
        const s = parseFloat(star.dataset.speed || layer.dataset.speed || '0');
        star.style.transform = `translateY(${-y * s}px) translateZ(0)`;
      });
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  // utilitaire
  function rand(min, max) { return Math.random() * (max - min) + min; }
})();

// --- curseur custom ---
const cursor = document.getElementById('custom-cursor');

// suit la souris
window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// sélecteur de tout ce qui est cliquable (ajoute tes classes si besoin)
const CLICKABLE_SEL = 'a, button, [role="button"], .bouton, .menu__btn, input[type="button"], input[type="submit"]';
const isClickable = (el) => !!el.closest(CLICKABLE_SEL);

// 🔁 DÉLÉGATION : marche pour tout (même éléments ajoutés dynamiquement)
document.addEventListener('mouseover', (e) => {
  cursor.classList.toggle('link-hover', isClickable(e.target));
});
document.addEventListener('mouseout', (e) => {
  if (isClickable(e.target)) cursor.classList.remove('link-hover');
});

// accessibilité clavier (Tab sur un “faux bouton”)
document.addEventListener('focusin', (e) => {
  if (isClickable(e.target)) cursor.classList.add('link-hover');
});
document.addEventListener('focusout', () => cursor.classList.remove('link-hover'));

