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

document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.querySelector(".recommended-items");
    const leftBtn = document.querySelector(".left");
    const rightBtn = document.querySelector(".right");

    const slideAmount = 95;
    const visibleWidth = 600;
    const totalWidth = itemsContainer.scrollWidth;
    let currentOffset = 0;

    function updateSlidePosition() {
        itemsContainer.style.transform = `translateX(-${currentOffset}px)`;
        itemsContainer.style.transition = "transform 0.3s ease";

        leftBtn.style.display = currentOffset <= 0 ? "none" : "block";
        rightBtn.style.display = currentOffset >= totalWidth - visibleWidth ? "none" : "block";
    }

    leftBtn.addEventListener("click", () => {
        currentOffset -= slideAmount;
        if (currentOffset < 0) currentOffset = 0;
        updateSlidePosition();
    });

    rightBtn.addEventListener("click", () => {
        currentOffset += slideAmount;
        const maxOffset = totalWidth - visibleWidth;
        if (currentOffset > maxOffset) currentOffset = maxOffset;
        updateSlidePosition();
    });

    updateSlidePosition();
});

document.getElementById('up').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('down').addEventListener('click', function () {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});