const elem = document.getElementById("element");
const code = document.getElementById("code");
const sliders = document.querySelectorAll(".sliders input");

sliders.forEach((slider) => {
    slider.addEventListener("input", generateShadow)
});

function generateShadow() {
    const shadowParams = getShadowParams();
    const boxShadow = createBoxShadow(...shadowParams);
    
    applyShadow(elem, boxShadow);
    updateCode(boxShadow);
}

function getShadowParams() {
    const hShadow = parseInt(document.getElementById("h-shadow").value);
    const vShadow = parseInt(document.getElementById("v-shadow").value);
    const blurRadius = parseInt(document.getElementById("blur-radius").value);
    const spreadRadius = parseInt(document.getElementById("spread-radius").value);
    const shadowColor = document.getElementById("shadow-color").value;
    const shadowColorOpacity = parseFloat(document.getElementById("shadow-color-opacity").value).toFixed(1);
    const shadowInset = document.getElementById("shadow-inset").checked;

    return [ hShadow, vShadow, blurRadius, spreadRadius, shadowColor, shadowColorOpacity, shadowInset ];
}

function createBoxShadow(hShadow, vShadow, blurRadius, spreadRadius, shadowColor, shadowColorOpacity, shadowInset) {
    const shadow = shadowInset ? "inset" : "";
    const rgbaColor = hexToRgba(shadowColor, shadowColorOpacity);

    return `${shadow} ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
}

function hexToRgba(shadowColor, shadowColorOpacity) {
    const r = parseInt(shadowColor.substr(1, 2), 16);
    const g = parseInt(shadowColor.substr(3, 2), 16);
    const b = parseInt(shadowColor.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${shadowColorOpacity})`;
}

function applyShadow(element, boxShadow) {
    element.style.boxShadow = boxShadow;
}

function updateCode(text) {
    code.textContent = `box-shadow: ${text};`;
}

function copyCode() {
    const codeText = code.textContent;
    navigator.clipboard.writeText(codeText)
        .then(()=>{
            alert("Code copied to clipboard!")
        });
}

window.onload = generateShadow;