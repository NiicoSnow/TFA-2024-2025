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

  accueil.classList.add("accueil--active");
  accueil.style.display = "grid";
  projets.style.display = "none";

  boutonProjets.addEventListener("click", () => {
    gsap.to(accueil, {
      duration: 0.5,
      opacity: 0,
      y: -50,
      onComplete: () => {
        accueil.classList.remove("accueil--active");
        accueil.style.display = "none";

        projets.classList.add("projets--active");
        projets.style.display = "grid";

        gsap.fromTo(projets,
          { opacity: 0, y: 50 },
          { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }
        );
      }
    });
  });

  boutonRetour.addEventListener("click", () => {
    gsap.to(projets, {
      duration: 0.5,
      opacity: 0,
      y: 50,
      onComplete: () => {
        projets.classList.remove("projets--active");
        projets.style.display = "none";

        accueil.classList.add("accueil--active");
        accueil.style.display = "grid";

        gsap.fromTo(accueil,
          { opacity: 0, y: -50 },
          { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }
        );
      }
    });
  });

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
});
