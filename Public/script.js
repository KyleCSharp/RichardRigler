const slidesContainer = document.getElementById('slides');
const slides = document.querySelectorAll('.slide');
const fullscreenExitBtn = document.getElementById('fullscreen-exit');

let currentIndex = 0;
let autoScrollTimer;
let resumeTimeout;

function getSlidesPerView() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slides-per-view')) || 1;
}

function scrollSlides(direction) {
  const slide = slides[0];
  const slideWidth = slide.offsetWidth;
  const visibleSlides = getSlidesPerView();

  const maxIndex = slides.length - visibleSlides;
  currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));

  const scrollAmount = slideWidth * currentIndex;

  slidesContainer.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });

  pauseAutoScroll();
}


function startAutoScroll() {
  autoScrollTimer = setInterval(() => {
    scrollSlides(1);
  }, 5000);
}

function pauseAutoScroll() {
  clearInterval(autoScrollTimer);
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    startAutoScroll();
  }, 5 * 60 * 1000);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') scrollSlides(-1);
  if (e.key === 'ArrowRight') scrollSlides(1);
});

slides.forEach((slide) => {
  slide.querySelector('img').addEventListener('click', () => {
    const clone = slide.querySelector('img').cloneNode(true);
    clone.classList.add('fullscreen-image-clone');
    document.body.appendChild(clone);
    fullscreenExitBtn.classList.add('show');
  });
});

fullscreenExitBtn.addEventListener('click', () => {
  document.querySelectorAll('.fullscreen-image-clone').forEach(el => el.remove());
  fullscreenExitBtn.classList.remove('show');
});

startAutoScroll();
