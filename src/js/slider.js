const sliderSize = document.querySelectorAll('.slider__box');
const sliderContent = document.querySelector('.slider__content');
const prevButton = document.querySelector('.slider__button-box--left');
const nextButton = document.querySelector('.slider__button-box--right');
const circles = document.querySelectorAll('.slider__circle');
let count = 0;
let slideWidth;
countSlideWidth();

window.addEventListener('resize', () => {
  countSlideWidth();
  changeSlide();
})

prevButton.addEventListener('click', () => {
  count--;
  if (count < 0) count = sliderSize.length - 1;
  changeSlide();
  changeCircleBackwards();
})  

nextButton.addEventListener('click', () => {
  count++;
  if (count >= sliderSize.length) count = 0;
  changeSlide();
  changeCircleForward();
})

function changeSlide() {
  sliderContent.style.transform = `translateX(-${slideWidth * count}px)`;
}

function changeCircleForward() {
  circles[count].classList.add('active');
  if (count == 0) {
    circles[circles.length - 1].classList.remove('active');
  } else {
    circles[count - 1].classList.remove('active');
  }
}

function changeCircleBackwards() {
  circles[count].classList.add('active');
  if (count == circles.length - 1) {
    circles[0].classList.remove('active');
  } else {
    circles[count + 1].classList.remove('active');
  }
}

function countSlideWidth() {
  slideWidth = sliderSize[0].offsetWidth;
}