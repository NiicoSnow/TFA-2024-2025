'use strict'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


const menu = document.querySelector(".header__nav");
const menuBtn = document.querySelector(".menu__btn");
const blurOverlay = document.querySelector(".blur-overlay");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu--open");
    blurOverlay.classList.toggle("hidden");
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const PARALLAX_FACTOR = 0.02;

const bg = document.querySelector('.parallax-bg');

let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = -window.scrollY * PARALLAX_FACTOR;
      bg.style.transform = `translateY(${y}px) translateZ(0)`;
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const DESKTOP_BREAKPOINT = 1025;

function isDesktop() {
  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

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
      header.addEventListener('click', (e) => {
        if (e.target.closest('.contenu__lien')) return;
        if (activeClass) card.classList.toggle(activeClass);
      });
    }
  });
}

window.addEventListener('resize', wireUp);
