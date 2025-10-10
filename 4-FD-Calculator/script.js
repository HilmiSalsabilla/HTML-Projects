document.addEventListener("DOMContentLoaded", function() {
    const investmentInput = document.getElementById("investment");
    const interestRateInput = document.getElementById("interest-rate");
    const timePeriodInput = document.getElementById("time-period");

    // Event listeners
    investmentInput.addEventListener(
        "input", () => updateInvestmentValue(investmentInput.value)
    );
    interestRateInput.addEventListener(
        "input", () => updateInterestRateValue(interestRateInput.value)
    );
    timePeriodInput.addEventListener(
        "input", () => updateTimePeriodValue(timePeriodInput.value)
    );

    // Initial values
    updateInvestmentValue(investmentInput.value);
    updateInterestRateValue(interestRateInput.value);
    updateTimePeriodValue(timePeriodInput.value);

});

// Helper: Format ke Rupiah
function formatRupiah(value) {
    return "Rp " + parseFloat(value).toLocaleString("id-ID");
}

// Update UI
function updateInvestmentValue(value) {
    document.getElementById("investment-value").innerText = formatRupiah(value);
}

function updateInterestRateValue(value) {
    document.getElementById("interest-rate-value").innerText = parseFloat(value).toFixed(1) + "%";
}

function updateTimePeriodValue(value) {
    document.getElementById("time-period-value").innerText = value + " Year";
}

//Compound Interest Quarterly
function calculateFD() {
    const principal = parseFloat(document.getElementById("investment").value);
    const rate = parseFloat(document.getElementById("interest-rate").value) / 100;
    const years  = parseFloat(document.getElementById("time-period").value);

    // compounding quarterly
    const n = 4;
    const totalAmount = principal * Math.pow(1 + (rate / n), n * years );
    const interestEarned = totalAmount - principal;

    document.getElementById("invested-amount").innerText = formatRupiah(principal);
    document.getElementById("estimated-returns").innerText = formatRupiah(Math.round(interestEarned));
    document.getElementById("total-value").innerText = formatRupiah(Math.round(totalAmount));
}