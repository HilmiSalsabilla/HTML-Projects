// ========== In-Memory Poll Data (replaces localStorage) ==========
let pollData = {
    "JavaScript": 0,
    "Python": 0,
    "Java": 0,
    "C++": 0
};

let pollMeta = {
    lastVoteTime: null,
    lastResetTime: null
};

// ========== DOM Elements ==========
const submitBtn = document.getElementById("submitBtn");
const resultBox = document.getElementById("result");
const pollForm = document.getElementById("pollForm");

// ========== Event Listener ==========
submitBtn.addEventListener("click", () => {
    const selected = pollForm.querySelector("input[name='poll']:checked");

    if (!selected) {
        alert("Please select an option before submitting!");
        return;
    }

    const choice = selected.value;
    pollData[choice]++;

    // Update metadata
    const now = new Date().toLocaleString();
    pollMeta.lastVoteTime = now;

    showResults();
});

// ========== Function: Show Results ==========
function showResults() {
    const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);
    if (totalVotes === 0) return;

    resultBox.innerHTML = "<h3>📊 Results</h3>";

    // Build each option bar
    for (const [option, votes] of Object.entries(pollData)) {
        const percent = ((votes / totalVotes) * 100).toFixed(1);

        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");

        const label = document.createElement("div");
        label.classList.add("label");
        label.textContent = `${option}: ${percent}% (${votes} votes)`;

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.width = `${percent}%`;

        barContainer.appendChild(label);
        barContainer.appendChild(bar);
        resultBox.appendChild(barContainer);
    }

    // ===== Analytics Section =====
    const analytics = document.createElement("div");
    analytics.classList.add("analytics", "active");

    const topOption = Object.entries(pollData)
        .sort((a, b) => b[1] - a[1])[0][0];

    const totalEl = document.createElement("p");
    totalEl.innerHTML = `<strong>Total Votes:</strong> ${totalVotes}`;

    const topEl = document.createElement("p");
    topEl.innerHTML = `<strong>Most Popular:</strong> ${topOption}`;

    const lastVote = document.createElement("p");
    lastVote.innerHTML = `<strong>Last Vote:</strong> ${pollMeta.lastVoteTime || "—"}`;

    const lastReset = document.createElement("p");
    lastReset.innerHTML = `<strong>Last Reset:</strong> ${pollMeta.lastResetTime || "—"}`;

    analytics.appendChild(totalEl);
    analytics.appendChild(topEl);
    analytics.appendChild(lastVote);
    analytics.appendChild(lastReset);

    resultBox.appendChild(analytics);

    // ===== Retry Button =====
    const retryBtn = document.createElement("button");
    retryBtn.textContent = "Retry Poll";
    retryBtn.classList.add("retry-btn");
    retryBtn.onclick = resetPoll;

    resultBox.appendChild(document.createElement("br"));
    resultBox.appendChild(retryBtn);

    resultBox.style.display = "block";
}

// ========== Function: Reset Poll ==========
function resetPoll() {
    if (!confirm("Are you sure you want to retry the poll? This will clear all votes.")) return;

    pollData = {
        "JavaScript": 0,
        "Python": 0,
        "Java": 0,
        "C++": 0
    };

    // Save reset time
    const now = new Date().toLocaleString();
    pollMeta.lastResetTime = now;
    pollMeta.lastVoteTime = null;

    // Reset UI
    pollForm.reset();
    resultBox.style.display = "none";
    resultBox.innerHTML = "";
}