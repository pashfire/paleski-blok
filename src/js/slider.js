const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const mql = window.matchMedia("(orientation: portrait)");

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = track.getBoundingClientRect().width * index + 'px';
}

//detects changes in the orientation of the viewport
mql.onchange = handleOrientationChange;
slides.forEach(setSlidePosition);

// Move slide
const moveToSlide = (currentSlide, targetSlide, targetDot, targetIndex) => {

  const currentDot = dotsNav.querySelector('.current-slide');
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');

  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');

  if (targetIndex === 0) {
    prevButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  } else if (targetIndex == slides.length - 1) {
    prevButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
  } else {
    prevButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');
  }
}

//move to first slide
const moveToFirstSlide = () => {
  const currentSlide = track.querySelector('.current-slide');
  const targetIndex = 0;
  const targetSlide = slides[targetIndex];
  const targetDot = dots[targetIndex];

  moveToSlide(currentSlide, targetSlide, targetDot, targetIndex);
}

//when screen orientation changed
function handleOrientationChange(e) {
  if(e.matches) // portrait orientation changed
  {
    slides.forEach(setSlidePosition);    
    moveToFirstSlide();
  }
  else //landscape orientation changed
  {
    slides.forEach(setSlidePosition);
    moveToFirstSlide();
  }    
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {

  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const slideIndex = slides.findIndex(slide => slide === prevSlide);
  const targetDot = dots[slideIndex];
  //move to the next slide
  moveToSlide(currentSlide, prevSlide, targetDot, slideIndex);
  if (prevSlide == currentSlide) {
    prevButton.classlist.add('hidden');
    moveToSlide(currentSlide, prevSlide, targetDot);
  }
});

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const slideIndex = slides.findIndex(slide => slide === nextSlide);
  const targetDot = dots[slideIndex];

  //move to the next slide
  if (slideIndex != -1)
    moveToSlide(currentSlide, nextSlide, targetDot, slideIndex);
});

// when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {

  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(currentSlide, targetSlide, targetDot, targetIndex);
});