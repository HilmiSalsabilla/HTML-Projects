// let outputCode = document.getElementById("css-code");

// let sliders = document.querySelectorAll("input[type='range']");
// sliders.forEach(function(slider){
//     slider.addEventListener("input", createBlob);
// });

// let inputs = document.querySelectorAll("input[type='number']");
// inputs.forEach(function(inp){
//     inp.addEventListener("change", createBlob);
// });

// function createBlob() {
//     let radiusOne = sliders[0].value;
//     let radiusTwo = sliders[1].value;
//     let radiusThree = sliders[2].value;
//     let radiusFour = sliders[3].value;

//     let blobHeight = inputs[0].value;
//     let blobWidth = inputs[1].value;

//     let borderRadius = `${radiusOne}% ${100 - radiusOne}% ${100 - radiusThree}% ${radiusThree}% / ${radiusFour}% ${radiusTwo}% ${100 - radiusTwo}% ${100 - radiusFour}%`;
//     let blobStyle = `border-radius: ${borderRadius}; height: ${blobHeight}px; width: ${blobWidth}px;`;

//     document.querySelector(".blob").style.cssText = blobStyle;
//     outputCode.value = blobStyle;
// }

// document.getElementById("copy").addEventListener("click", function() {
//     //copy code
//     navigator.clipboard.writeText(outputCode.value)
//         .then(function(){
//             alert("Code copied!")
//         });
// });

// createBlob();

// E D I T

// Elements
const blob = document.querySelector(".blob");
const outputCode = document.getElementById("css-code");
const sliders = document.querySelectorAll("input[type='range']");
const inputs = document.querySelectorAll("input[type='number']");
const copyBtn = document.getElementById("copy");

// Event Listeners
sliders.forEach(slider => {
    slider.addEventListener("input", createBlob);
});

inputs.forEach(input => {
    input.addEventListener("change", createBlob);
});

copyBtn.addEventListener("click", copyCode);

// Generate Blob
function createBlob() {
    const [r1, r2, r3, r4] = [...sliders].map(slider => slider.value);
    const [blobHeight, blobWidth] = [...inputs].map(input => input.value);

    const borderRadius = `${r1}% ${100 - r1}% ${100 - r3}% ${r3}% / ${r4}% ${r2}% ${100 - r2}% ${100 - r4}%`;

    const blobStyle = `
border-radius: ${borderRadius}; height: ${blobHeight}px;  width: ${blobWidth}px;
`;

    blob.style.cssText = blobStyle;
    outputCode.value = blobStyle.trim();
}

// Copy to Clipboard
function copyCode() {
    navigator.clipboard.writeText(outputCode.value)
        .then(() => {
            alert("✅ Code copied!");
        })
}

// Initial Blob
createBlob();