// ===== Kalkulator Uang Rupiah Otomatis =====

// Format angka ke Rupiah
function formatRupiah(angka) {
    return angka.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
}

// Angka ke huruf (Bahasa Indonesia)
function numberToWords(num) {
    const satuan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

    if (num < 12) return satuan[num];
    else if (num < 20) return numberToWords(num - 10) + " belas";
    else if (num < 100) return numberToWords(Math.floor(num / 10)) + " puluh " + numberToWords(num % 10);
    else if (num < 200) return "seratus " + numberToWords(num - 100);
    else if (num < 1000) return numberToWords(Math.floor(num / 100)) + " ratus " + numberToWords(num % 100);
    else if (num < 2000) return "seribu " + numberToWords(num - 1000);
    else if (num < 1000000) return numberToWords(Math.floor(num / 1000)) + " ribu " + numberToWords(num % 1000);
    else if (num < 1000000000) return numberToWords(Math.floor(num / 1000000)) + " juta " + numberToWords(num % 1000000);
    else return "terlalu besar";
}

// Hitung total otomatis
const inputFields = document.querySelectorAll("input[type='number']");
const totalValue = document.getElementById("totalValue");
const totalWords = document.getElementById("totalWords");

const values = {
    n100k: 100000,
    n50k: 50000,
    n20k: 20000,
    n10k: 10000,
    n5k: 5000,
    n2k: 2000,
    n1k: 1000,
};

function hitungTotal() {
    let total = 0;
    for (const id in values) {
        const jumlah = parseInt(document.getElementById(id).value) || 0;
        total += jumlah * values[id];
    }

    totalValue.textContent = formatRupiah(total);
    totalWords.textContent =
        total > 0 ? "(" + numberToWords(total).trim() + " rupiah)" : "(nol rupiah)";
}

// Event input otomatis
inputFields.forEach(input => input.addEventListener("input", hitungTotal));

// Tombol reset
document.getElementById("resetBtn").addEventListener("click", () => {
    inputFields.forEach(i => (i.value = ""));
    totalValue.textContent = "Rp0";
    totalWords.textContent = "(nol rupiah)";
});
