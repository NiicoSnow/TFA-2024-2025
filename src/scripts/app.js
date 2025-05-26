'use strict'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menu = document.querySelector(".header__nav");
const menuBtn = document.querySelector(".menu__btn");
const blurOverlay = document.querySelector(".blur-overlay");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu--open");
    blurOverlay.classList.toggle("hidden");
});

const carousel = document.querySelector('.avis');
const items = document.querySelectorAll('.avis__commentaire');
const dots = document.querySelectorAll('.statut span');
const gap = 24;
let index = 0;

function updateCarousel() {
  const itemWidth = items[0].offsetWidth;
  const offset = index * (itemWidth + gap);
  carousel.style.transform = `translateX(-${offset}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('statut__barre--active', i === index);
    dot.classList.toggle('statut__barre', i !== index);
  });
}

document.querySelector('.avis__prev').addEventListener('click', () => {
  index = (index - 1 + items.length) % items.length;
  updateCarousel();
});

document.querySelector('.avis__next').addEventListener('click', () => {
  index = (index + 1) % items.length;
  updateCarousel();
});

let startX = 0;
let isDragging = false;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const moveX = e.touches[0].clientX;
  const diff = moveX - startX;

  const itemWidth = items[0].offsetWidth;
  const baseOffset = index * (itemWidth + gap);

  carousel.style.transition = 'none';
  carousel.style.transform = `translateX(calc(-${baseOffset}px + ${diff}px))`;
});

carousel.addEventListener('touchend', (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    index = (index - 1 + items.length) % items.length;
  } else if (diff < -50) {
    index = (index + 1) % items.length;
  }

  carousel.style.transition = 'transform 0.4s ease';
  updateCarousel();
});

updateCarousel();

window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('ScrollVideo');

  video.addEventListener('loadedmetadata', () => {
    const duration = video.duration;

    gsap.to(video, {
      currentTime: duration,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-video",
        start: "top top",
        end: "+=3000", // plus grand = scroll plus long
        scrub: 1,      // ⚠️ utilise un petit lissage pour éviter les à-coups
        pin: true
      }
    });
  });
});