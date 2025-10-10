const inputTextArea = document.getElementById("input-textarea");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");

inputTextArea.addEventListener("input", () => {
    // characters count
    charCount.textContent = inputTextArea.value.length;

    // words count
    const txt = inputTextArea.value.trim();
    const wordArray = txt.split(/\s+/);

    let wordCountValue = 0;
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i] != "") {
            wordCountValue++;
        }
    }
    wordCount.textContent = wordCountValue;
});