document.addEventListener('DOMContentLoaded', function () {
const slider = document.getElementById('procon');
const dotsContainer = document.getElementById('dot');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const slides = slider.getElementsByTagName('img');
const totalSlides = slides.length;
let currentIndex = 0;

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

function updateSlider() {
slider.style.transform = `translateX(-${currentIndex * 600}px)`;

Array.from(dotsContainer.children).forEach((dot, i) => {
dot.classList.toggle('active', i === currentIndex);
});

prev.classList.toggle('hidden', currentIndex === 0);
next.classList.toggle('hidden', currentIndex === totalSlides - 1);
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

prev.addEventListener('click', () => {
if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
}
});

next.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlider();
    }
});

pdateSlider();
});
