// const passwordBox = document.getElementById("password");
// const copyBtn = document.getElementById("copy");
// const btn = document.getElementById("btn");

// const generatePassword = () => {
//     const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
//     let password = "";
//     const lenghtOfPassword = 10;

//     for (let i = 0; i < lenghtOfPassword; i++) {
//         password += chars.charAt(Math.floor(Math.random() * chars.length))
//         // console.log(password);
//     }

//     passwordBox.value = password;
// };

// btn.addEventListener("click", generatePassword);

// copyBtn.addEventListener("click", () => {
//     const passwordCopy = passwordBox.value.trim();

//     if (!passwordCopy) {
//         alert("No password to copy! Please generate a password first!");
//         return;
//     }

//     navigator.clipboard.writeText(passwordCopy)
//         .then(() => {
//             alert("Password copied to your clipboard!");
//         });
// });

const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("btn");
const copyBtn = document.getElementById("copy");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/";

function generatePassword(length = 12) {
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        password += randomChar;
    }
    return password;
}

generateBtn.addEventListener("click", () => {
    passwordInput.value = generatePassword(14);
    passwordInput.classList.add("highlight");

    setTimeout(() => passwordInput.classList.remove("highlight"), 400);
});

copyBtn.addEventListener("click", () => {
    const password = passwordInput.value.trim();

    if (password === "") {
        alert("⚠️ Belum ada password untuk disalin!");
        return;
    }

    navigator.clipboard.writeText(password)
        .then(() => {
            alert("✅ Password berhasil disalin ke clipboard!");
        })
        .catch(() => {
            alert("❌ Gagal menyalin password. Silakan coba lagi.");
        });
});
