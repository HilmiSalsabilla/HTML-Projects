// function detectChar() {
//     const input = document.getElementById("input-type").value;
    
//     if(input) {
//         const unicodeValue = input.charCodeAt(0);
//         const result = `The Unicode value of "${input}" is ${unicodeValue}`;
//         document.getElementById("result").textContent = result;
//     } else {
//         document.getElementById("result").textContent = `Please enter a character`;
//     }
// }

function detectChar() {
    const input = document.getElementById("input-type").value.trim();
    const resultEl = document.getElementById("result");

    if (input) {
        const unicodeValue = input.charCodeAt(0);
        resultEl.textContent = `The Unicode value of "${input}" is ${unicodeValue}`;
        resultEl.style.color = "#333";
    } else {
        resultEl.textContent = "Please enter a character";
        resultEl.style.color = "#d62839";
    }
}
