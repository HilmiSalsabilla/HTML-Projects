// === DOM Elements ===
const blurSlider = document.getElementById("blur");
const brightnessSlider = document.getElementById("brightness");
const contrastSlider = document.getElementById("contrast");
const grayscaleSlider = document.getElementById("grayscale");
const hueRotateSlider = document.getElementById("hue-rotate");
const invertSlider = document.getElementById("invert");
const opacitySlider = document.getElementById("opacity");
const saturateSlider = document.getElementById("saturate");
const sepiaSlider = document.getElementById("sepia");

const noFlipBtn = document.getElementById("no-flip");
const flipXBtn = document.getElementById("flip-x");
const flipYBtn = document.getElementById("flip-y");

const uploadInput = document.getElementById("upload-button");
const image = document.getElementById("chosen-image");
const resetButton = document.getElementById("reset-button");
const downloadButton = document.getElementById("download-button");

// === Reset Filters ===
function resetFilter() {
    blurSlider.value = "0";
    brightnessSlider.value = "100";
    contrastSlider.value = "100";
    grayscaleSlider.value = "0";
    hueRotateSlider.value = "0";
    invertSlider.value = "0";
    opacitySlider.value = "100";
    saturateSlider.value = "100";
    sepiaSlider.value = "0";
    noFlipBtn.checked = true;

    applyFilters();
    applyFlip();
    showRangeValue();
}

// === Reset Button Event ===
resetButton.addEventListener("click", () => {
    resetFilter();
});

// === Upload Image ===
uploadInput.addEventListener("change", ()=> {
    resetFilter();
    document.querySelector(".image-container").style.display = "block";

    const reader = new FileReader();
    reader.readAsDataURL(uploadInput.files[0]);
    reader.onload = ()=> {
        image.src = reader.result;
    }
});

// === Apply Filter ===
const sliders = document.querySelectorAll(".filter input[type='range']");
sliders.forEach(slider => {
    slider.addEventListener("input", applyFilters);
    slider.addEventListener("input", showRangeValue);
});

function showRangeValue() {
    const rangeValues = document.querySelectorAll(".range-value");
    sliders.forEach((slider, index) => {
        let unit = "%";
        if (slider.id === "blur") unit = "px";
        if (slider.id === "hue-rotate") unit = "°";
        rangeValues[index].textContent = `${slider.value}${unit}`;
    });
}

function applyFilters() {
    image.style.filter = `
        blur(${blurSlider.value}px)
        brightness(${brightnessSlider.value}%)
        contrast(${contrastSlider.value}%)
        grayscale(${grayscaleSlider.value}%)
        hue-rotate(${hueRotateSlider.value}deg)
        invert(${invertSlider.value}%)
        opacity(${opacitySlider.value}%)
        saturate(${saturateSlider.value}%)
        sepia(${sepiaSlider.value}%)
        `;
}

// === Flip Options ===
const radioBtn = document.querySelectorAll(".flip-option input[type='radio']");
radioBtn.forEach(radio => {
    radio.addEventListener("click", applyFlip);
});

function applyFlip() {
    if (flipXBtn.checked) {
        image.style.transform = "scaleX(-1)";
    } else if (flipYBtn.checked) {
        image.style.transform = "scaleY(-1)";
    } else {
        image.style.transform = "scale(1,1)";
    }
}

// === Presets ===
const presets = {
    warm: { brightness:110, contrast:110, saturate:130, sepia:20 },
    cool: { brightness:105, contrast:105, saturate:110, "hue-rotate":180 },
    vintage: { brightness:105, contrast:90, saturate:80, sepia:40 },
    noir: { brightness:120, contrast:130, grayscale:100 },
    pop: { brightness:110, contrast:120, saturate:160 },
    dreamy: { brightness:115, contrast:95, saturate:120, blur:2, opacity:95 }
};

function applyPreset(name) {
    const preset = presets[name];
    if (!preset) return;

    // update sliders sesuai preset
    if (preset.blur !== undefined) blurSlider.value = preset.blur;
    if (preset.brightness !== undefined) brightnessSlider.value = preset.brightness;
    if (preset.contrast !== undefined) contrastSlider.value = preset.contrast;
    if (preset.grayscale !== undefined) grayscaleSlider.value = preset.grayscale;
    if (preset["hue-rotate"] !== undefined) hueRotateSlider.value = preset["hue-rotate"];
    if (preset.invert !== undefined) invertSlider.value = preset.invert;
    if (preset.opacity !== undefined) opacitySlider.value = preset.opacity;
    if (preset.saturate !== undefined) saturateSlider.value = preset.saturate;
    if (preset.sepia !== undefined) sepiaSlider.value = preset.sepia;

    applyFilters();
    showRangeValue();
}

// === Download Edited Image ===
downloadButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply filter
        ctx.filter = image.style.filter;

        // Handle flip
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (flipXBtn.checked) {
            ctx.scale(-1, 1);
        } else if (flipYBtn.checked) {
            ctx.scale(1, -1);
        }
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        // Download
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL();
        link.click();
    };
    img.src = image.src;
});

// Init
resetFilter();