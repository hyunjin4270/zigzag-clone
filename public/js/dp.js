const slider = document.querySelector('.slide');
const slides = document.querySelectorAll('.slide img');
const counter = document.getElementById('counter');

let index = 0;
const total = slides.length;

function showSlide(i) {
    slider.style.transform = `translateX(${-600 * i}px)`;
    counter.textContent = `${i + 1} / ${total}`;
}

function nextSlide() {
    index = (index + 1) % total;
    showSlide(index);
}

showSlide(index);
setInterval(nextSlide, 3000);

const wrapper = document.querySelector('.pi');
const button = document.getElementById('pib');

button.addEventListener('click', () => { 
wrapper.classList.toggle('expanded');

if (wrapper.classList.contains('expanded')) {
    button.textContent = '상품정보 접기';
} 
else {
button.textContent = '상품정보 더보기';
}
});