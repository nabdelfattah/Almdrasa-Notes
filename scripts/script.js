import {
  addHandler,
  addPinnedHandler,
  btnAddNote, btnAddPinnedNote, formMenueEl, navEl,
  navLinkHandler,
  searchNotesHandler,
} from './DOM-vendor';

// App Events
formMenueEl.addEventListener('submit', (e) => searchNotesHandler(e));
navEl.addEventListener('click', (e) => navLinkHandler(e));
btnAddNote.addEventListener('click', (e) => addHandler(e));
btnAddPinnedNote.addEventListener('click', (e) => addPinnedHandler(e));
