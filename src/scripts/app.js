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
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});

updateCarousel();

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("scrollCanvas");
  const context = canvas.getContext("2d");

  const frameCount = 125;
  const currentFrame = index => `assets/images/DF/frames/frame_${index.toString().padStart(4, '0')}.webp`;

  const images = [];
  let img = new Image();
  img.src = currentFrame(1);
  images[0] = img;

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  const updateImage = index => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0);
  };

  gsap.to({ frame: 0 }, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 1,
      trigger: ".scroll__video",
      start: "top top",
      end: "+=900",
      pin: ".scroll__video",
    },
    onUpdate: function () {
      updateImage(Math.floor(this.targets()[0].frame));
    }
  });

  images[0].onload = () => {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    updateImage(0);
  };
});

document.querySelectorAll('.boutique__produit').forEach(produit => {
  const image = produit.querySelector('img');

  if (image) {
    produit.querySelectorAll('[data-img]').forEach(dot => {
      dot.addEventListener('click', () => {
        const newSrc = dot.getAttribute('data-img');
        image.src = newSrc;
      });
    });
  }
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
document.querySelectorAll('.btncmd').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.target);
      if (target) {
        gsap.to(window, {
          scrollTo: target,
          duration: 2,
          ease: 'power2.inOut'
        });
      }
    });
  });