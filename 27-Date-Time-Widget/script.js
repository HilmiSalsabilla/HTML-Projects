// ========== CLOCK + THEME SCRIPT (Monochrome Transparent) ==========
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const dateEl = document.getElementById("date");
const clockEl = document.getElementById("clock");
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

let lastDate = "";
let manualTheme = localStorage.getItem("theme") || "auto"; // "dark" | "light" | "auto"

// ===== Update Clock & Date =====
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    fadeTransition(hoursEl, hours);
    fadeTransition(minutesEl, minutes);
    fadeTransition(secondsEl, seconds);
    pulseEffect(secondsEl);

    updateDate(now);
    updateGreyScaleByMinute(now.getMinutes());
    applyAutoTheme(hours);
}

// ===== Smooth Fade Transition =====
function fadeTransition(element, newText) {
    if (element.textContent !== newText) {
        element.style.transition = "opacity 0.4s ease";
        element.style.opacity = "0";
        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = "1";
        }, 200);
    }
}

// ===== Subtle Pulse per Second =====
function pulseEffect(element) {
    element.style.transition = "transform 0.25s ease, text-shadow 0.25s ease";
    element.style.transform = "scale(1.1)";
    element.style.textShadow = "0 0 16px rgba(180, 180, 180, 0.4)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.textShadow = "0 0 8px rgba(160, 160, 160, 0.25)";
    }, 200);
}

// ===== Date Update =====
function updateDate(now) {
    const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
    const day = now.getDate();
    const month = now.toLocaleDateString("en-US", { month: "long" });
    const year = now.getFullYear();
    const formatted = `${weekday}, ${day} ${month} ${year}`;
    if (formatted !== lastDate) {
        fadeTransition(dateEl, formatted);
        lastDate = formatted;
    }
}

// ===== Grayscale Glow that Shifts Every Minute =====
function updateGreyScaleByMinute(minute) {
    const brightness = 60 + (minute * 0.58); // 60–95%
    const grey = `hsl(0, 0%, ${brightness}%)`;
    const glow = 0.25 + (minute / 200);

    clockEl.style.color = grey;
    clockEl.style.textShadow = `
        0 0 15px rgba(200, 200, 200, ${glow}),
        0 0 30px rgba(160, 160, 160, ${glow * 0.5}),
        0 2px 8px rgba(0, 0, 0, 0.4)
    `;
}

// ===== Auto Theme (System + Time) =====
function applyAutoTheme(hours) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const hour = parseInt(hours);

    // Manual override
    if (manualTheme === "dark") return applyDarkTheme();
    if (manualTheme === "light") return applyLightTheme();

    // Auto: follow system, fallback to time
    if (prefersDark) applyDarkTheme();
    else if (prefersLight) applyLightTheme();
    else {
        if (hour >= 6 && hour < 18) applyLightTheme();
        else applyDarkTheme();
    }
}

// ===== Theme Functions =====
function applyDarkTheme() {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeToggle.textContent = "🌞";
}

function applyLightTheme() {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    themeToggle.textContent = "🌙";
}

// ===== Manual Toggle Click =====
themeToggle.addEventListener("click", () => {
    if (manualTheme === "dark" || manualTheme === "auto") {
        manualTheme = "light";
        applyLightTheme();
    } else {
        manualTheme = "dark";
        applyDarkTheme();
    }
    localStorage.setItem("theme", manualTheme);
});

// ===== Double Click = Reset Auto Mode =====
themeToggle.addEventListener("dblclick", () => {
    manualTheme = "auto";
    localStorage.setItem("theme", "auto");
    themeToggle.textContent = "🔄";
    setTimeout(() => updateClock(), 500);
});

// ===== Listen to System Theme Changes =====
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (manualTheme === "auto") updateClock();
});
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (manualTheme === "auto") updateClock();
});

// ===== Init =====
setInterval(updateClock, 1000);
updateClock();
