"use strict";

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header-navigation__wrapper');
 
  //Toggle Nav
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('nav-active');
  });  
}

navSlide();