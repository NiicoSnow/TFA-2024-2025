'use strict'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

//Ici n'a pas eu d'usage d'IA
const ruxouvert = document.querySelector('.projets__rux');
const ruxfermé = document.querySelector('.projets__rux-header');

const janusouvert = document.querySelector('.projets__janus');
const janusfermé = document.querySelector('.projets__janus-header');

const DFouvert = document.querySelector('.projets__DF');
const DFfermé = document.querySelector('.projets__DF-header');

ruxfermé.addEventListener('click', () => {
  ruxouvert.classList.toggle('projets__rux--active');
});

janusfermé.addEventListener('click', () => {
  janusouvert.classList.toggle('projets__janus--active');
});

DFfermé.addEventListener('click', () => {
  DFouvert.classList.toggle('projets__DF--active');
});
