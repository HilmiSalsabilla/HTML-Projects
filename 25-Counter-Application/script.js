let count = 0;

const value = document.querySelector("#value");
const buttons = document.querySelectorAll(".btn");

// Update counter display and style
function updateDisplay() {
    value.textContent = count;

    // Hapus semua class status
    value.classList.remove("positive", "negative", "neutral");

    // Tambahkan class sesuai kondisi nilai
    if (count > 0) {
        value.classList.add("positive");
    } else if (count < 0) {
        value.classList.add("negative");
    } else {
        value.classList.add("neutral");
    }

    // Animasi kecil setiap update
    value.style.transform = "scale(1.2)";
    setTimeout(() => {
        value.style.transform = "scale(1)";
    }, 150);
}

// Event listener untuk setiap tombol
buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        const action = e.currentTarget.id;

        if (action === "decrease") count--;
        else if (action === "reset") count = 0;
        else if (action === "increase") count++;

        updateDisplay();
    });
});

// Inisialisasi tampilan awal
updateDisplay();