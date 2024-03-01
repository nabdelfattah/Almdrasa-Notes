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
    return this.id++;
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
    // place the note element in the right place
    if (type == 'normal') {
      notesListEl.prepend(noteEl);
    } else {
      pinnedNotesListEl.prepend(noteEl);
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
    noteEl.lastElementChild.addEventListener('click', (e) => this.deleteHandler(e));
    return noteEl;
  }

  deleteHandler(e) {
    const elementID = e.target.closest('.note').dataset.id;
    // delete note from local storage
    this.notesArr = this.notesArr.filter((el) => el.id != elementID);
    setStorageData('notes', this.notesArr);
    // delete note from UI
    e.target.closest('.note').remove();
  }
}
