function updateHeightValue(value) {
    document.getElementById("height-value").textContent = value;
}

function updateWeightValue(value) {
    document.getElementById("weight-value").textContent = value;
}

function calculateBMI() {
    const age = Number(document.getElementById("age").value);
    const gender = document.querySelector("input[name='gender']:checked");
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);

    if(!age || !gender) {
        alert("Please fill in all fields!");
        return;
    }

    const bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(1));
    document.getElementById("bmi-result").textContent = bmi;

    let category = "";
    let bg = "";
    let color = "";

    if (bmi < 16.0) {
        category = "Severely Underweight";
        bg = "#e3f2fd"; color = "#0d47a1";
    } else if (bmi >= 16.0 && bmi <= 18.4) {
        category = "Underweight";
        bg = "#b3e5fc"; color = "#01579b";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal";
        bg = "#c8e6c9"; color = "#1b5e20";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight";
        bg = "#ffe0b2"; color = "#e65100";
    } else if (bmi >= 30.0 && bmi <= 34.9) {
        category = "Obese Class I";
        bg = "#ffcdd2"; color = "#b71c1c";
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        category = "Obese Class II";
        bg = "#f8bbd0"; color = "#880e4f";
    } else if (bmi >= 40.0) {
        category = "Obese Class III";
        bg = "#e1bee7"; color = "#4a148c";
    }

    const categoryElement = document.getElementById("bmi-category");
    categoryElement.textContent = category;
    categoryElement.style.backgroundColor = bg;
    categoryElement.style.color = color;
}