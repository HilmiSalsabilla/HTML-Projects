const count = document.getElementById("char-count");
const input = document.getElementById("text-input");

input.addEventListener("keyup", () => {
    count.innerHTML = input.value.length;
});