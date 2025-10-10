// const sliders = document.querySelectorAll("input[type='range']");

// sliders.forEach(function(slider) {
//     slider.addEventListener("input", calculateTip)
// });

// const billInput = document.getElementById("bill");
// billInput.addEventListener("change", calculateTip);

// function calculateTip() {
//     let bill = parseFloat(billInput.value);
//     let tipPercent = document.getElementById("tip").value;
//     let noOfPeople = document.getElementById("no-of-people").value;

//     billInput.value = bill.toFixed(2);

//     let totalTip = parseFloat((bill * (tipPercent / 100)).toFixed(2));
//     let total = parseFloat((bill + totalTip).toFixed(2));

//     let tipPerPerson = (totalTip / noOfPeople).toFixed(2);
//     let totalPerperson = (total / noOfPeople).toFixed(2);

//     document.getElementById("tip-amount").textContent = `$${totalTip}`;
//     document.getElementById("total-amount").textContent = `$${total}`;
//     document.getElementById("tip-percent").textContent = `${tipPercent}%`;
//     document.getElementById("split-num").textContent = `${noOfPeople}`;
//     document.getElementById("tip-per-person").textContent = `$${tipPerPerson}`;
//     document.getElementById("total-per-person").textContent = `$${totalPerperson}`;
// }

// calculateTip();

const sliders = document.querySelectorAll("input[type='range']");
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("no-of-people");

// Tambahkan listener
sliders.forEach(slider => slider.addEventListener("input", calculateTip));
billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);
tipInput.addEventListener("input", calculateTip);

function calculateTip() {
    let bill = parseFloat(billInput.value) || 0;
    let tipPercent = parseInt(tipInput.value) || 0;
    let noOfPeople = parseInt(peopleInput.value) || 1;

    if (noOfPeople < 1) noOfPeople = 1; // cegah pembagian nol

    // Update input bill supaya tetap 2 desimal hanya jika ada value
    if (billInput.value !== "") {
        billInput.value = bill.toFixed(2);
    }

    let totalTip = bill * (tipPercent / 100);
    let total = bill + totalTip;

    let tipPerPerson = totalTip / noOfPeople;
    let totalPerPerson = total / noOfPeople;

    // Format dengan Intl.NumberFormat (lebih fleksibel)
    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    document.getElementById("tip-amount").textContent = currency.format(totalTip);
    document.getElementById("total-amount").textContent = currency.format(total);
    document.getElementById("tip-percent").textContent = `${tipPercent}%`;
    document.getElementById("split-num").textContent = noOfPeople;
    document.getElementById("tip-per-person").textContent = currency.format(tipPerPerson);
    document.getElementById("total-per-person").textContent = currency.format(totalPerPerson);
}

// Jalankan awal
calculateTip();
