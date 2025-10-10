// const numberEl = document.getElementById("random-number");
// const btn = document.getElementById("generate-btn");

// btn.addEventListener("click", () => {
//     const randomNumber = Math.floor(Math.random() * 100) + 1;
//     numberEl.textContent = randomNumber;
// });

// Ambil elemen yang dibutuhkan
const numberEl = document.getElementById("random-number");
const generateBtn = document.getElementById("generate-btn");

// Event saat tombol diklik
generateBtn.addEventListener("click", () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Tambahkan efek animasi setiap kali angka berubah
    numberEl.style.opacity = 0;
    numberEl.style.transform = "scale(0.8)";

    setTimeout(() => {
        numberEl.textContent = randomNumber;
        numberEl.style.opacity = 1;
        numberEl.style.transform = "scale(1)";
    }, 200);
});
