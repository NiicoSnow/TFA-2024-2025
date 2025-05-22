'use strict'
const menu = document.querySelector(".header__nav");
const menuBtn = document.querySelector(".menu__btn");
const blurOverlay = document.querySelector(".blur-overlay");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("menu--open");
    blurOverlay.classList.toggle("hidden");
});