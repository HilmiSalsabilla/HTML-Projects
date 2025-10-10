const slidesCont = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const items = document.querySelectorAll(".item");

const slideWidth = slides[0].clientWidth;
let index = 0;

function updateSlideIndex(offset) {
    index += offset;
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }
}

function updateSlides() {
    slidesCont.style.transition = "all 0.3s ease-in-out";
    slidesCont.style.transform = `translateX(${-slideWidth * (index + 1)}px)`;
}

function setActiveItem() {
    items.forEach((item) => item.classList.remove("active"));
    items[index].classList.add("active");
}

function moveToNextSlide() {
    updateSlideIndex(1);
    updateSlides();
    setActiveItem();
}

function moveToPrevSlide() {
    updateSlideIndex(-1);
    updateSlides();
    setActiveItem();
}

function handleItemClick(i) {
    index = i;
    setActiveItem();
    updateSlides();
}

items.forEach((item, i) => item.addEventListener("click", () => handleItemClick(i)));

nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPrevSlide);

slidesCont.insertAdjacentHTML("afterbegin", slides[slides.length - 1]. outerHTML);
slidesCont.insertAdjacentHTML("beforeend", slides[0]. outerHTML);
slidesCont.style.transform = `translateX(${-slideWidth}px)`;

setActiveItem();