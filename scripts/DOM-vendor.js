import { getDate } from './helper';
import { Notes } from './notes';

const notesObj = new Notes([]);

/// /////////////////////////////////////////////////////////
/// EXPORTED DOM ELEMENTS
/// //////////////////////
const formMenueEl = document.querySelector('.menue__form');
const navEl = document.querySelector('.menue__nav');

const addNoteBlock = document.querySelector('.content-wrapper__add-note');
const displayNoteBlock = document.querySelector('.content-wrapper__notes');
// form btns/ primary btns
const btnAddNote = document.querySelector('[data-role=add]');
const btnAddPinnedNote = document.querySelector('[data-role=addPinned]');

// ADD NOTE BUTTON
const btnNew = document.querySelector('.btn-add');
btnNew.addEventListener('click', () => {
  document.querySelector('[data-role=new]').click();
});

// APPLY NOTES SLIDER
const sectionContentEl = document.querySelector('.section-content');
const btnHide = document.querySelector('.btn-hide');
btnHide.addEventListener('click', () => {
  sectionContentEl.classList.toggle('shifted');
});

// ENABLE SEARCH BUTTON
const btnSearch = document.querySelector('.icon-search');
const stickyHeader = document.querySelector('.sticky');
btnSearch.addEventListener('click', () => {
  stickyHeader.classList.toggle('showSearch');
});

// ENABLE MENUE BUTTON
const menueEl = document.querySelector('.menue__nav');
function toggleMenue() {
  menueEl.classList.toggle('show-menue');
}
const btnMenue = document.querySelector('.icon-menue');
const btnCloseMenue = document.querySelector('.btn-close-menue');
btnMenue.addEventListener('click', toggleMenue);
btnCloseMenue.addEventListener('click', toggleMenue);

/// /////////////////////////////////////////////////////////
/// HELPER FUNCTIONS
/// ////////////////
function getNoteValues() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const noteContent = document.getElementById('noteContent').value;
  const time = getDate();
  if (title && author && noteContent) {
    return {
      title, author, time, noteContent,
    };
  }
  return null;
}

function resetAddNoteForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('noteContent').value = '';
}

/// /////////////////////////////////////////
/// HANDLERS
/// ////////////
function searchNotesHandler(e) {
  e.preventDefault();
  console.log('you are searching through notes');
}

function navLinkHandler(e) {
  const linkRole = e.target.dataset.role;
  switch (linkRole) {
    case 'new':
      displayNoteBlock.style.display = 'none';
      addNoteBlock.style.display = 'block';
      break;
    case 'notes':
      addNoteBlock.style.display = 'none';
      displayNoteBlock.style.display = 'grid';
      break;
  }
  document.querySelector('.menue__link-selected').classList.remove('menue__link-selected');
  e.target.classList.add('menue__link-selected');
}

function addHandler(e) {
  e.preventDefault();
  const noteValues = getNoteValues();
  if (!noteValues) {
    alert('Please fill the required inputs.');
    return;
  }
  noteValues.type = 'normal';
  notesObj.addNote(noteValues);
  resetAddNoteForm();
}

function addPinnedHandler(e) {
  e.preventDefault();
  const noteValues = getNoteValues();
  if (!noteValues) {
    alert('Please fill the required inputs.');
    return;
  }
  noteValues.type = 'pinned';
  notesObj.addNote(noteValues);
  resetAddNoteForm();
}

export {
  formMenueEl, navEl, btnAddNote, btnAddPinnedNote,
  searchNotesHandler, navLinkHandler, addHandler, addPinnedHandler,
};
