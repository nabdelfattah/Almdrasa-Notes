import {
  addHandler,
  addPinnedHandler,
  btnAddNote, btnAddPinnedNote, inputMenueEl, navEl,
  navLinkHandler,
  renderUserNotes,
  searchNotesHandler,
} from './DOM-vendor';

renderUserNotes();

// App Events
inputMenueEl.addEventListener('keydown', (e) => searchNotesHandler(e));
navEl.addEventListener('click', (e) => navLinkHandler(e));
btnAddNote.addEventListener('click', (e) => addHandler(e));
btnAddPinnedNote.addEventListener('click', (e) => addPinnedHandler(e));
