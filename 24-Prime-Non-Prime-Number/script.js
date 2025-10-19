// Ambil elemen DOM
const numberInput = document.getElementById("number-input");
const checkBtn = document.getElementById("checkBtn");
const resultMsg = document.getElementById("resultMsg");

// Fungsi cek bilangan prima
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Event listener tombol
checkBtn.addEventListener("click", () => {
    const value = parseInt(numberInput.value);

    if (isNaN(value)) {
        resultMsg.textContent = "Please enter a valid number!";
        resultMsg.style.color = "red";
        return;
    }

    if (isPrime(value)) {
        resultMsg.textContent = `${value} is a Prime Number`;
        resultMsg.style.color = "green";
    } else {
        resultMsg.textContent = `${value} is NOT a Prime Number`;
        resultMsg.style.color = "red";
    }
});
