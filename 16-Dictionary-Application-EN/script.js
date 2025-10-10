// // DOM Elements
// const searchInput = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");
// const resultCont = document.getElementById("result-container");
// const wordTitle = document.getElementById("word-title");
// const wordDesc = document.getElementById("word-desc");
// const audioBtn = document.getElementById("audio-btn");

// searchBtn.addEventListener("click", () => {
//     search();
// });

// searchInput.addEventListener("keyup", (event) => {
//     if(event.key === "Enter") {
//         search();
//     }
// });

// function search() {
//     const searchTerm = searchInput.value.trim();
//     if(searchTerm === ''){
//         alert("Please enter a word to search")
//         return;
//     }

//     fetchDictionaryData(searchTerm);
// }

// async function fetchDictionaryData(searchTerm) {
//     try {
//         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
//         if(!response.ok) {
//             throw new Error("Failed to fetch the data")
//         } 
//         const data = await response.json();
//         displayResult(data);
//     } catch(error) {
//         console.log(error);
//         alert("An error occured");
//     }
// }

// function displayResult(data) {
//     resultCont.style.display = `block`;

//     const wordData = data[0]
//     wordTitle.textContent = wordData.word;
//     wordDesc.innerHTML = `
//         <ul>
//             ${wordData.meanings.map(meaning => `
//                 <li>
//                     <p><strong>Part of speech:</strong> ${meaning.partOfSpeech}</p>
//                     <p><strong>Definition:</strong> ${meaning.definitions[0].definition}</p>
//                 </li>
//             `).join(`\n`)}
//         </ul>
//     `;
// }

// audioBtn.addEventListener("click", () => {
//     const searchTerm = searchInput.value.trim();
//     if(searchTerm === ''){
//         alert("Please enter a word to search")
//         return;
//     }
//     speak(searchTerm);
// });

// function speak(word) {
//     const speech = new SpeechSynthesisUtterance(word);
//     speech.lang = `en-US`;
//     speech.volume = 2;
//     speech.rate = 1;
//     speech.pitch = 1;
//     window.speechSynthesis.speak(speech);
// }

// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultCont = document.getElementById("result-container");
const wordTitle = document.getElementById("word-title");
const wordDesc = document.getElementById("word-desc");
const audioBtn = document.getElementById("audio-btn");

// Event Listeners
searchBtn.addEventListener("click", () => handleSearch());
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") handleSearch();
});

audioBtn.addEventListener("click", () => {
    const word = searchInput.value.trim();
    if (!word) {
        alert("Please enter a word to search");
        return;
    }
    speak(word);
});

// Functions
const handleSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        alert("Please enter a word to search");
        return;
    }
    fetchDictionaryData(searchTerm);
};

const fetchDictionaryData = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error(error);
        alert("No definition found. Please try another word.");
    }
};

const displayResult = (data) => {
    if (!data || !data[0]) {
        resultCont.style.display = "none";
        alert("No results found.");
        return;
    }

    const { word, meanings } = data[0];

    resultCont.style.display = "block";
    wordTitle.textContent = word;

    wordDesc.innerHTML = `
        <ul>
            ${meanings.map(({ partOfSpeech, definitions }) => `
                <li>
                    <p><strong>Part of speech:</strong> ${partOfSpeech}</p>
                    <p><strong>Definition:</strong> ${definitions?.[0]?.definition || "No definition available"}</p>
                </li>
            `).join("")}
        </ul>
    `;
};

const speak = (word) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    speech.volume = 1; // max 1, bukan 2
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
};
