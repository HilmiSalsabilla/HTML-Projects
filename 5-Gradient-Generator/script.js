const colorOne = document.getElementById("color-a");
const colorTwo = document.getElementById("color-b");
const outputCode = document.getElementById("code");
const body = document.body;

let currentDirection = "to bottom";

function setDirection(value, button) {
    const directions = document.querySelectorAll(".buttons button");

    directions.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentDirection = value;
}

function generateCode() {
    const gradient = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
    
    outputCode.value = `background: ${gradient};`;
    body.style.background = gradient;
}

function copyText() {
    navigator.clipboard.writeText(outputCode.value)
        .then(()=>{
            alert('Gradient copied!');
        });
}

generateCode();