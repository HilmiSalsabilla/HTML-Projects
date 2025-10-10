const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// let notes = [];
getNotes().forEach((note)=>{
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty note";
    element.value = content;

    element.addEventListener("dblclick", ()=>{
        if (confirm("Are you sure you want to delete this note?")) {
            deleteNote(id, element);
        }
    });

    element.addEventListener("input", ()=>{
        updateNote(id, element.value);
    });

    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note)=>note.id!=id);
    saveNote(notes);
    if (appEl.contains(element)) {
        appEl.removeChild(element);
    }
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.find((note) => note.id == id);
    if (target) {
        target.content = content;
        saveNote(notes);
    }
}

function addNote() {
    //id, content
    const notes = getNotes();

    const noteObj = {
        // id: Math.floor(Math.random() * 10000),
        id: Date.now(),
        content: ""
    };

    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObj);
    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem("note-application", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-application") || "[]");
}

btnEl.addEventListener("click", addNote);