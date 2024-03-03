import { setStorageData } from './storage';

const pinnedNotesListEl = document.querySelector('.pinned-notes');
const notesListEl = document.querySelector('.unpinned-notes');

export class Notes {
  constructor(notesArr) {
    this.notesArr = notesArr;
    this.id = this.notesArr[this.notesArr.length - 1]
      ? this.notesArr[this.notesArr.length - 1].id : 0;
  }

  getID() {
    return ++this.id;
  }

  addNote(values) {
    const id = this.getID();
    // add note to local storage
    this.notesArr.push({ ...values, id });
    setStorageData('notes', this.notesArr);
    // create note DOM element
    const { type } = values;
    const noteEl = this.createNoteElement(
      id,
      values.title,
      values.noteContent,
      values.time,
    );
    this.placeNoteElement(type, noteEl);
  }

  placeNoteElement(type, element) {
    if (type == 'normal') {
      notesListEl.prepend(element);
    } else {
      pinnedNotesListEl.prepend(element);
    }
  }

  createNoteElement(id, title, content, time) {
    const noteEl = document.createElement('article');
    noteEl.className = 'note';
    noteEl.dataset.id = id;
    noteEl.tabIndex = '0';
    noteEl.innerHTML = `<p class="note-title">${title}</p>
                        <p class="note-content">${content}</p>
                        <div class="note-wrapper">
                          <p class="note-date">${time}</p>
                          <button class="note-btn">Delete</button>
                        </div>`;
    noteEl.lastElementChild.lastElementChild.addEventListener('click', (e) => this.deleteHandler(e));
    noteEl.addEventListener('click', (e) => this.clickNoteHandler(e));
    return noteEl;
  }

  clickNoteHandler(e) {
    const previouslySelectedNoteEl = document.querySelector('.note--selected');
    if (previouslySelectedNoteEl) {
      previouslySelectedNoteEl.classList.remove('note--selected');
    }
    e.currentTarget.classList.add('note--selected');
    // display note
    const { id } = e.currentTarget.dataset;
    const notes = this.notesArr.filter((item) => item.id == id);
    this.displayNote(notes[0]);
    // hide notes index if small screen
  }

  deleteHandler(e) {
    e.stopImmediatePropagation();
    const elementID = e.target.closest('.note').dataset.id;
    // delete note from local storage
    this.notesArr = this.notesArr.filter((el) => el.id != elementID);
    setStorageData('notes', this.notesArr);
    // delete note from UI
    e.target.closest('.note').remove();
  }

  renderNotes(arr) {
    arr.forEach((item) => {
      const DOMElement = this.createNoteElement(item.id, item.title, item.noteContent, item.time);
      this.placeNoteElement(item.type, DOMElement);
    });
  }

  displayNote(note) {
    const html = `<h2 class="note-review__note-heading">${note.title}</h2>
      <p class="note-review__author">${note.time} / By ${note.author}</p>
      <p class="note-review__note-content">${note.noteContent}</p>`;
    const parentEl = document.querySelector('.notes__review');
    parentEl.innerHTML = html;
    parentEl.style.display = 'block';
    // for mobile screen
    if (window.innerWidth < 944) {
      document.querySelector('.notes__index').style.display = 'none';
    }
  }
}
