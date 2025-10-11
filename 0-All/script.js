// ===== Project Data =====
const projects = [
    { id: 1, name: "Shake on Invalid Input" },
    { id: 2, name: "Box Shadow Generator" },
    { id: 3, name: "Notes Application" },
    { id: 4, name: "FD Calculator" },
    { id: 5, name: "Gradient Generator" },
    { id: 6, name: "BMI Calculator" },
    { id: 7, name: "Tip Calculator" },
    { id: 8, name: "Blob Maker" },
    { id: 9, name: "Basic Image Editor" },
    { id: 10, name: "Input Character Counter" },
    { id: 11, name: "Image Slider" },
    { id: 12, name: "Day of the Week" },
    { id: 13, name: "Live Word Counter" },
    { id: 14, name: "Video Slider" },
    { id: 15, name: "Get Unicode Value" },
    { id: 16, name: "Dictionary Application EN" },
    { id: 17, name: "Dictionary Application ID" },
    { id: 18, name: "Paragraph Generator" },
    { id: 19, name: "CSS Changer" },
    { id: 20, name: "Robot Joke Generator" },
    { id: 21, name: "Star Rating" },
    { id: 22, name: "Generate Random Password" },
    { id: 23, name: "Random Number Generator" },
    { id: 24, name: "Prime Non-Prime Number" },
    { id: 25, name: "Counter Application" },
    { id: 26, name: "Age Calculator" },
    { id: 27, name: "Date Time Widget" },
    { id: 28, name: "Advance Image Carousel Application" },
    { id: 29, name: "Code Editor" },
    { id: 30, name: "Poll System" },
    { id: 31, name: "Cash Calculator Rupee" },
    { id: 32, name: "Cash Calculator Rupiah" }
];

// ===== Render Projects =====
const baseURL = "http://127.0.0.1:5500";
const projectList = document.getElementById("projectList");

projects.forEach(project => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const folderName = `${project.id}-${project.name.replace(/\s+/g, "-")}/`;

    a.href = `${baseURL}/${folderName}`;
    a.textContent = `${project.id}. ${project.name}`;

    li.appendChild(a);
    projectList.appendChild(li);
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load previous theme from localStorage
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.textContent = "🌞";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    const isLight = body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "🌞" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});
