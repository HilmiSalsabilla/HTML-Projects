// document.addEventListener("DOMContentLoaded", () => {
//     const et2000 = document.getElementById("et2000");
//     const et500 = document.getElementById("et500");
//     const et200 = document.getElementById("et200");
//     const et100 = document.getElementById("et100");
//     const et50 = document.getElementById("et50");
//     const et20 = document.getElementById("et20");
//     const et10 = document.getElementById("et10");
//     const et5 = document.getElementById("et5");
//     const et2 = document.getElementById("et2");
//     const et1 = document.getElementById("et1");

//     const txt2000 = document.getElementById("txt2000");
//     const txt500 = document.getElementById("txt500");
//     const txt200 = document.getElementById("txt200");
//     const txt100 = document.getElementById("txt100");
//     const txt50 = document.getElementById("txt50");
//     const txt20 = document.getElementById("txt20");
//     const txt10 = document.getElementById("txt10");
//     const txt5 = document.getElementById("txt5");
//     const txt2 = document.getElementById("txt2");
//     const txt1 = document.getElementById("txt1");

//     const txtFinalCash = document.getElementById("txtFinalCash");
//     const txtFinalCashInWords = document.getElementById("txtFinalCashInWords");
//     const btnReset = document.getElementById("btnReset");

//     const cashInputs = [et2000, et500, et200, et100, et50, et20, et10, et5, et2, et1];
//     const cashTexts = [txt2000, txt500, txt200, txt100, txt50, txt20, txt10, txt5, txt2, txt1];

//     cashInputs.forEach((input, index) => {
//         input.addEventListener("input", () => {
//             cashCalculate(index);
//         })
//     });

//     function cashCalculate(index) {
//         const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
//         const rowValue = cashInputs[index].value * denominations[index];
//         cashTexts[index].textContent = rowValue.toFixed(0);
        
//         totalCash();
//     }

//     function totalCash() {
//         let totalCashValue = 0;
//         cashTexts.forEach((text) => {
//             totalCashValue += parseInt(text.textContent);
//         });
        
//         txtFinalCash.textContent = "Total Cash: " + totalCashValue;

//         txtFinalCashInWords.textContent = `Total Cash in words: ${convertToWords(totalCashValue)}`;
//     }

//     btnReset.addEventListener("click", clearData);
//     function clearData() {
//         cashInputs.forEach((input) => {
//             input.value = "";
//         });

//         cashTexts.forEach((text) => {
//             text.textContent = "0";
//         });

//         totalCash();
//     }

//     cashInputs.forEach(input => {
//         input.addEventListener("input", () => {
//             const value = parseInt(input.value, 10);
//             if(isNaN(value) || value < 0) {
//                 input.value = "";
//             }
//         });
//     });

//     function convertToWords(number) {
//         const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
//         const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
//         const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

//         if(number === 0) {
//             return "Zero";
//         }

//         let words = "";

//         if(Math.floor(number / 10000000) > 0) {
//             words += convertToWords(Math.floor(number / 10000000)) + " Crore ";
//             number %= 10000000;
//         }

//         if(Math.floor(number / 100000) > 0) {
//             words += convertToWords(Math.floor(number / 100000)) + " Lakh ";
//             number %= 100000;
//         }

//         if(Math.floor(number / 1000) > 0) {
//             words += convertToWords(Math.floor(number / 1000)) + " Thousand ";
//             number %= 1000;
//         }

//         if(Math.floor(number / 100) > 0) {
//             words += convertToWords(Math.floor(number / 100)) + " Hundred ";
//             number %= 100;
//         }

//         if(number > 0) {
//             if(number < 10) {
//                 words += units[number];
//             } else if(number < 20) {
//                 words += teens[number - 10];
//             } else {
//                 words += tens[Math.floor(number / 10)];
//                 if(number % 10 > 0) {
//                     words += " " + units[number % 10];
//                 }
//             }
//         }
//         return words.trim();
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    // Input fields
    const cashInputs = [
        "et2000", "et500", "et200", "et100", "et50",
        "et20", "et10", "et5", "et2", "et1"
    ].map(id => document.getElementById(id));

    // Output fields
    const cashTexts = [
        "txt2000", "txt500", "txt200", "txt100", "txt50",
        "txt20", "txt10", "txt5", "txt2", "txt1"
    ].map(id => document.getElementById(id));

    const txtFinalCash = document.getElementById("txtFinalCash");
    const txtFinalCashInWords = document.getElementById("txtFinalCashInWords");
    const btnReset = document.getElementById("btnReset");

    const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

    // Update per input
    cashInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            const value = parseInt(input.value, 10);
            input.value = isNaN(value) || value < 0 ? "" : value;

            const total = (input.value || 0) * denominations[index];
            cashTexts[index].textContent = total;
            updateTotal();
        });
    });

    // Reset semua nilai
    btnReset.addEventListener("click", () => {
        cashInputs.forEach(i => (i.value = ""));
        cashTexts.forEach(t => (t.textContent = "0"));
        updateTotal();
    });

    // Hitung total keseluruhan
    function updateTotal() {
        const totalCash = cashTexts.reduce((sum, text) => sum + parseInt(text.textContent), 0);
        txtFinalCash.textContent = `Total Cash: ${totalCash}`;
        txtFinalCashInWords.textContent = `Total Cash in words: ${convertToWords(totalCash)}`;
    }

    // Konversi angka ke kata
    function convertToWords(num) {
        if (num === 0) return "Zero";

        const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", 
                       "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

        let words = "";

        const process = (value, label) => {
            if (Math.floor(num / value) > 0) {
                words += `${convertToWords(Math.floor(num / value))} ${label} `;
                num %= value;
            }
        };

        process(10000000, "Crore");
        process(100000, "Lakh");
        process(1000, "Thousand");
        process(100, "Hundred");

        if (num > 0) {
            if (num < 10) words += units[num];
            else if (num < 20) words += teens[num - 10];
            else {
                words += tens[Math.floor(num / 10)];
                if (num % 10 > 0) words += " " + units[num % 10];
            }
        }

        return words.trim();
    }
});
