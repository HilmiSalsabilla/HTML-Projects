// const chat = document.getElementById("chat");
// const jokeBtn = document.getElementById("jokeBtn");

// generateJoke();

// jokeBtn.addEventListener("click", generateJoke);

// async function generateJoke() {
//     jokeBtn.disabled = true;

//     const message = createMessageElement("Can you tell me a joke?");
//     appendMessage(message);

//     const joke = createMessageElement();
//     setElementContent(joke, '<i class="fa-solid fa-ellipsis"></i>');
//     appendMessage(joke);

//     // const res = await fetch("https://icanhazdadjoke.com", {
//     //     headers:{
//     //         Accept:"application/json",
//     //     },
//     // });

//     // if (res.ok) {
//     //     const data = await res.json();
//     //     console.log(data);
//     //     setElementContent(joke, data.joke);
//     //     jokeBtn.disable = false;
//     // }

//     try {
//         const res = await fetch("https://v2.jokeapi.dev/joke/Any", {
//             headers: { Accept: "application/json" },
//         });

//         if (!res.ok) throw new Error("Failed to fetch joke");

//         const data = await res.json();
//         console.log(data);

//         // Check type of joke
//         if (data.type === "single") {
//             setElementContent(joke, data.joke);
//         } else if (data.type === "twopart") {
//             setElementContent(joke, `<b>${data.setup}</b><br>🤖 ${data.delivery}`);
//         } else {
//             setElementContent(joke, "Oops! No joke found 😅");
//         }
//     } catch (err) {
//         console.error(err);
//         setElementContent(joke, "Sorry, I couldn't fetch a joke right now 😔");
//     }

//   jokeBtn.disabled = false;
// }

// function createMessageElement(content) {
//     const element = document.createElement("div");
//     element.classList.add("message");
//     if(content) {
//         element.classList.add("response");
//         setElementContent(element, content);
//     } else {
//         element.classList.add("joke");
//     }

//     return element;
// }

// function setElementContent(element, content) {
//     element.innerHTML = content;
// }

// function appendMessage(element) {
//     chat.appendChild(element);
//     chat.scrollTop = chat.scrollHeight;
// }

const chat = document.getElementById("chat");
const jokeBtn = document.getElementById("jokeBtn");

generateJoke();

jokeBtn.addEventListener("click", generateJoke);

async function generateJoke() {
    jokeBtn.disabled = true;

    // User message
    const message = createMessageElement("Can you tell me a joke?");
    appendMessage(message);

    // Robot typing indicator
    const typing = createTypingIndicator();
    appendMessage(typing);

    try {
        const res = await fetch("https://v2.jokeapi.dev/joke/Any", {
            headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch joke");

        const data = await res.json();
        console.log(data);

        // Remove typing indicator
        typing.remove();

        // Create robot message
        const joke = createMessageElement();
        joke.classList.add("joke");

        if (data.type === "single") {
            setElementContent(joke, data.joke);
        } else if (data.type === "twopart") {
            setElementContent(joke, `<b>${data.setup}</b><br>🤖 ${data.delivery}`);
        } else {
            setElementContent(joke, "Oops! No joke found 😅");
        }

        appendMessage(joke);
    } catch (err) {
        console.error(err);
        typing.remove();

        const errorMsg = createMessageElement("Sorry, I couldn't fetch a joke right now 😔");
        errorMsg.classList.add("joke");
        appendMessage(errorMsg);
    }

    jokeBtn.disabled = false;
}

function createMessageElement(content) {
    const element = document.createElement("div");
    element.classList.add("message");

    if (content) {
        element.classList.add("response");
        setElementContent(element, content);
    } else {
        element.classList.add("joke");
    }
    return element;
}

function setElementContent(element, content) {
    element.innerHTML = content;
}

function appendMessage(element) {
    chat.appendChild(element);
    chat.scrollTop = chat.scrollHeight; // Auto-scroll ke bawah
}

// Typing indicator (3 dots animation)
function createTypingIndicator() {
    const typing = document.createElement("div");
    typing.classList.add("message", "joke", "typing");
    typing.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    return typing;
}
