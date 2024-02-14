document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.getElementById('notes-container');
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');

    // Load notes from localStorage on page load
    loadNotes();

    noteForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const timestamp = new Date().toLocaleString();
            addNoteToContainer(noteText, timestamp);
            saveNoteToLocalStorage(noteText, timestamp);
            noteInput.value = '';
        }
    });

    function addNoteToContainer(text, timestamp) {
        const note = createNoteElement(text, timestamp);
        notesContainer.appendChild(note);
    }

    function createNoteElement(text, timestamp) {
        const note = document.createElement('div');
        note.classList.add('note');
        const noteText = document.createElement('p');
        noteText.textContent = text;
        const noteTime = document.createElement('span');
        noteTime.textContent = "Created at " + timestamp;
        note.appendChild(noteText);
        note.appendChild(noteTime);
        note.addEventListener('click', function () {
            notesContainer.removeChild(note);
            removeNoteFromLocalStorage(text);
        });
        return note;
    }

    function saveNoteToLocalStorage(note, timestamp) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ text: note, timestamp: timestamp });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function removeNoteFromLocalStorage(note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const index = notes.findIndex(item => item.text === note);
        if (index !== -1) {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(function (note) {
            addNoteToContainer(note.text, note.timestamp);
        });
    }
});
