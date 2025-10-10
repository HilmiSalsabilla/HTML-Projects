// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultCont = document.getElementById("result-container");
const wordTitle = document.getElementById("word-title");
const wordDesc = document.getElementById("word-desc");
const audioBtn = document.getElementById("audio-btn");

// Event Listeners
searchBtn.addEventListener("click", () => handleSearch());
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
});

audioBtn.addEventListener("click", () => {
    const word = wordTitle.textContent.trim();
    if (!word) {
        alert("Tidak ada kata untuk dibacakan");
        return;
    }
    speak(word);
});

const handleSearch = () => {
    const word = searchInput.value.trim();
    if (!word) {
        alert("Masukkan kata untuk dicari");
        return;
    }
    fetchKBBI(word);
};

const fetchKBBI = async (word) => {
    try {
        const url = `https://x-labs.my.id/api/kbbi/search/${encodeURIComponent(word)}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Gagal mem-fetch data");

        const wrapped = await response.json();
        const json = JSON.parse(wrapped.contents); // ambil isi asli API

        displayResult(json);
    } catch (err) {
        console.error("Error fetch KBBI:", err);
        resultCont.style.display = "block";
        wordTitle.textContent = word;
        wordDesc.innerHTML = `<p>Tidak ada definisi yang tersedia.</p>`;
    }
};

const displayResult = (json) => {
    if (!json?.data || !Array.isArray(json.data) || json.data.length === 0) {
        resultCont.style.display = "none";
        alert("Tidak ada hasil ditemukan");
        return;
    }

    // ambil word & lema dari hasil pertama
    const { word, lema } = json.data[0];

    let output = "";
    json.data.forEach(entry => {
        const { lema, arti } = entry;
        output += `
            <h3>${lema}</h3>
            <ul>
                ${arti.map(item => `<li>${item.deskripsi}</li>`).join("")}
            </ul>
        `;
    });

    resultCont.style.display = "block";
    wordTitle.innerHTML = `
        <span class="word">${word}</span>
        <span class="lema">(${lema})</span>
    `;
    wordDesc.innerHTML = output;
};

const speak = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "id-ID";
    utter.volume = 1;
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
};
