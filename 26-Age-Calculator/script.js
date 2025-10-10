// function calculateAge() {
//     const today = new Date();
//     const birthdateInput = document.getElementById("birthdate").value;
//     const birthdateParts = birthdateInput.split("-");
//     const birthDay = birthdateParts[0];
//     const birthMonth = birthdateParts[1] - 1;
//     const birthYear = birthdateParts[2];
//     const birthDate = new Date(birthYear, birthMonth, birthDay);

//     console.log(birthdateInput);
//     console.log(birthdateParts);
//     console.log(birthDay);
//     console.log(birthMonth);
//     console.log(birthYear);

//     const isValidDate = (date) => {
//         return (
//             Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)
//         );
//     };

//     if (!isValidDate(birthDate)) {
//         alert("Invalid Date Format: Please Enter a valid date in DD-MM-YYYY format.");
//         return;
//     }

//     const ageInMilliseconds = today - birthDate;
//     const ageInSeconds = Math.floor(ageInMilliseconds/1000);
//     const ageInMinutes = Math.floor(ageInSeconds/60);
//     const ageInHours = Math.floor(ageInMinutes/60);
//     const ageInDays = Math.floor(ageInHours/24);
//     const ageInWeeks = Math.floor(ageInDays/7);
//     const ageInMonths = Math.floor(ageInDays/30.436875);
//     const ageInYears = Math.floor(ageInDays/365.25);

//     const resultCont = document.getElementById("result-container");
//     const result = document.getElementById("result");

//     result.innerHTML = `
//         <div class="result-item">
//             <h3>Age:</h3>
//             <p>${ageInYears} Years ${ageInMonths % 12} Months ${ageInDays % 30} Days</p>
//         </div>

//         <div class="result-item">
//             <h3>Months Passed:</h3>
//             <p>${ageInMonths}</p>
//         </div>

//         <div class="result-item">
//             <h3>Weeks Passed:</h3>
//             <p>${ageInWeeks}</p>
//         </div>

//         <div class="result-item">
//             <h3>Days Passed:</h3>
//             <p>${ageInDays}</p>
//         </div>

//         <div class="result-item">
//             <h3>Hours Passed:</h3>
//             <p>${ageInHours}</p>
//         </div>

//         <div class="result-item">
//             <h3>Minutes Passed:</h3>
//             <p>${ageInMinutes}</p>
//         </div>

//         <div class="result-item">
//             <h3>Seconds Passed:</h3>
//             <p>${ageInSeconds}</p>
//         </div>
//     `;

//     resultCont.style.display = "block";
// }

// const ageCal = document.getElementById("age-calculator");

// ageCal.addEventListener("submit", (event) => {
//     event.preventDefault();
//     calculateAge();
// });

// ================================
// 🌟 AGE CALCULATOR - YELLOW THEME
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("age-calculator");
    const resultContainer = document.getElementById("result-container");
    const result = document.getElementById("result");
    const input = document.getElementById("birthdate");

    // Add subtle focus animation on input
    input.addEventListener("focus", () => {
        input.style.boxShadow = "0 0 10px rgba(248, 193, 2, 0.4)";
    });

    input.addEventListener("blur", () => {
        input.style.boxShadow = "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        calculateAge();
    });

    function calculateAge() {
        const today = new Date();
        const birthdateInput = input.value.trim();

        // Check format (DD-MM-YYYY)
        const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        const match = birthdateInput.match(datePattern);

        if (!match) {
        showError("⚠️ Please enter a valid date in DD-MM-YYYY format.");
        return;
        }

        const [, day, month, year] = match;
        const birthDate = new Date(`${year}-${month}-${day}`);

        if (isNaN(birthDate)) {
        showError("❌ Invalid date. Please check the numbers entered.");
        return;
        }

        // Calculate ages
        const diff = today - birthDate;
        if (diff < 0) {
        showError("🚫 The birthdate cannot be in the future!");
        return;
        }

        const ageInSeconds = Math.floor(diff / 1000);
        const ageInMinutes = Math.floor(ageInSeconds / 60);
        const ageInHours = Math.floor(ageInMinutes / 60);
        const ageInDays = Math.floor(ageInHours / 24);
        const ageInWeeks = Math.floor(ageInDays / 7);
        const ageInMonths = Math.floor(ageInDays / 30.436875);
        const ageInYears = Math.floor(ageInDays / 365.25);

        // Build the result HTML
        result.innerHTML = `
        <div class="result-item fade-in">
            <h3>Age:</h3>
            <p>${ageInYears} Years ${ageInMonths % 12} Months ${ageInDays % 30} Days</p>
        </div>
        <div class="result-item fade-in">
            <h3>Months Passed:</h3>
            <p>${ageInMonths}</p>
        </div>
        <div class="result-item fade-in">
            <h3>Weeks Passed:</h3>
            <p>${ageInWeeks}</p>
        </div>
        <div class="result-item fade-in">
            <h3>Days Passed:</h3>
            <p>${ageInDays}</p>
        </div>
        <div class="result-item fade-in">
            <h3>Hours Passed:</h3>
            <p>${ageInHours}</p>
        </div>
        <div class="result-item fade-in">
            <h3>Minutes Passed:</h3>
            <p>${ageInMinutes}</p>
        </div>
        <div class="result-item fade-in">
            <h3>Seconds Passed:</h3>
            <p>${ageInSeconds}</p>
        </div>
        `;

        // Show result with animation
        resultContainer.style.display = "block";
        resultContainer.style.animation = "fadeInUp 0.8s ease";

        // Reset error (if any)
        removeError();
    }

    // Show inline error (no alert)
    function showError(message) {
        removeError();

        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        form.insertBefore(error, form.firstChild);

        error.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: "forwards" });

        resultContainer.style.display = "none";
    }

    function removeError() {
        const existingError = document.querySelector(".error-message");
        if (existingError) existingError.remove();
    }
});
