'use strict'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const accueil = document.getElementById("accueil");
  const projets = document.getElementById("projets");
  const boutonProjets = document.querySelector(".accueil__projets");
  const boutonRetour = document.querySelector(".projets__retour");

  // Affiche accueil au démarrage
  accueil.classList.add("accueil--active");

  boutonProjets.addEventListener("click", () => {
    accueil.classList.remove("accueil--active");
    projets.classList.add("projets--active");
  });

  boutonRetour.addEventListener("click", () => {
    projets.classList.remove("projets--active");
    accueil.classList.add("accueil--active");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const ruxouvert = document.querySelector('.projets__rux');
  const ruxfermé = document.querySelector('.projets__rux-header');

  const janusouvert = document.querySelector('.projets__janus');
  const janusfermé = document.querySelector('.projets__janus-header');

  const DFouvert = document.querySelector('.projets__DF');
  const DFfermé = document.querySelector('.projets__DF-header');

  ruxfermé.addEventListener('click', function () {
    ruxouvert.classList.toggle('projets__rux--active');
  });

  janusfermé.addEventListener('click', function () {
    janusouvert.classList.toggle('projets__janus--active');
  });

  DFfermé.addEventListener('click', function () {
    DFouvert.classList.toggle('projets__DF--active');
  });
});