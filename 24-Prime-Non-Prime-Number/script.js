// document.addEventListener("DOMContentLoaded", function() {
//     const numberEl = document.getElementById("number-input");
//     const checkBtn = document.getElementById("checkBtn");
//     const resultMsg = document.getElementById("resultMsg");

//     checkBtn.addEventListener("click", function() {
//         const number = parseInt(numberEl.value);

//         if (isNaN(number)) {
//             resultMsg.textContent = "Please enter a number at input box!";
//             resultMsg.style.color = "#e62568ff";
//             return;
//         }

//         if (isPrime(number)) {
//             resultMsg.textContent = `${number} is a prime number!`
//             resultMsg.style.color = "#40ae51ff"
//         } else {
//             resultMsg.textContent = `${number} is not a prime number!`
//             resultMsg.style.color = "#e62568ff";
//         }
//     });

//     function isPrime(num) {
//         if(num <= 1) return false;
//         if(num <= 3) return true;

//         if(num % 2 === 0 || num % 3 === 0) return false;
//         return true;
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.getElementById("number-input");
    const checkBtn = document.getElementById("checkBtn");
    const resultMsg = document.getElementById("resultMsg");

    // Smooth reset result when typing again
    numberInput.addEventListener("input", () => {
        resultMsg.textContent = "";
        resultMsg.style.opacity = "0";
    });

    checkBtn.addEventListener("click", () => {
        const number = parseInt(numberInput.value);

        // Input validation
        if (isNaN(number)) {
            showResult("Please enter a number in the box!", "#e62568");
            return;
        }

        // Check if number is prime
        if (isPrime(number)) {
            showResult(`${number} is a prime number!`, "#40ae51");
        } else {
            showResult(`${number} is not a prime number!`, "#e62568");
        }
    });

    // Function to check if a number is prime
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;

        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }

    // Display result with animation
    function showResult(message, color) {
        resultMsg.textContent = message;
        resultMsg.style.color = color;
        resultMsg.style.opacity = "0";

        // Add fade-in animation manually
        setTimeout(() => {
            resultMsg.style.transition = "opacity 0.4s ease-in-out";
            resultMsg.style.opacity = "1";
        }, 50);
    }
});
