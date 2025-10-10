const dots = document.querySelectorAll(".dot-container button");
const images = document.querySelectorAll(".image-container img");

let currentSlide = 0;
const totalSlide = images.length;

function updateSlide(newIndex) {
    images[currentSlide].classList.remove("active");

    currentSlide = newIndex;
    images[currentSlide].classList.add("active");

    updateIndicator(currentSlide);

    const container = document.querySelector(".image-container");
    const activeImg = images[currentSlide];

    container.style.height = activeImg.offsetHeight + "px";
}

// set tinggi pertama kali
window.addEventListener("load", () => {
    const container = document.querySelector(".image-container");
    const activeImg = images[currentSlide];
    container.style.height = activeImg.offsetHeight + "px";
});

function updateIndicator(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function next() {
    const newIndex = (currentSlide + 1) % totalSlide;
    updateSlide(newIndex);
}

function prev() {
    const newIndex = (currentSlide - 1 + totalSlide) % totalSlide;
    updateSlide(newIndex);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateSlide(index));
});

// Auto play (opsional)
// setInterval(next, 5000);

updateSlide(0);