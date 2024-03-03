import { getDate } from './helper';
import { Notes } from './notes';
import { getStorageData } from './storage';

const notesArr = getStorageData('notes');
const notesObj = new Notes(notesArr || []);

/// /////////////////////////////////////////////////////////
/// EXPORTED DOM ELEMENTS
/// //////////////////////
const inputMenueEl = document.querySelector('.menue__input');
const navEl = document.querySelector('.menue__nav');
const addNavLinkEl = document.querySelector('[data-role=new]');
const notesNavLinkEl = document.querySelector('[data-role=notes]');

const addNoteBlock = document.querySelector('.content-wrapper__add-note');
const displayNoteBlock = document.querySelector('.content-wrapper__notes');
// form btns/ primary btns
const btnAddNote = document.querySelector('[data-role=add]');
const btnAddPinnedNote = document.querySelector('[data-role=addPinned]');

// ADD NOTE BUTTON
const btnNew = document.querySelector('.btn-add');
btnNew.addEventListener('click', () => {
  addNavLinkEl.click();
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
  if (notesObj.notesArr.some((el) => el.title == title)) {
    alert('Chose another title for your note, please.🙏🏻');
    return;
  }
  const author = document.getElementById('author').value;
  const noteContent = document.getElementById('noteContent').value;
  const time = getDate();
  if (title && author && noteContent) {
    return {
      title, author, time, noteContent,
    };
  }
  alert('Please fill the required inputs.🗒️');
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
  if (e.key != 'Enter') {
    return;
  }
  e.preventDefault();
  const title = e.currentTarget.value;
  const storedNote = notesObj.notesArr.filter((item) => item.title == title);
  if (!storedNote.length) {
    alert('This note doesn\'t exist❌');
    e.currentTarget.value = '';
    return;
  }
  notesNavLinkEl.click();
  document.querySelector(`[data-id="${storedNote[0].id}"`).click();
  e.currentTarget.value = '';
}

function navLinkHandler(e) {
  const linkRole = e.target.dataset.role;
  if (!linkRole) return;
  switch (linkRole) {
    case 'new':
      displayNoteBlock.style.display = 'none';
      addNoteBlock.style.display = 'block';
      break;
    case 'notes':
      addNoteBlock.style.display = 'none';
      displayNoteBlock.style.display = 'grid';
      displayNoteBlock.firstElementChild.style.display = 'block';
      if (window.innerWidth < 944) {
        displayNoteBlock.querySelector('.notes__review').style.display = 'none';
        return;
      }
      const firstNote = document.querySelector('.note');
      if (firstNote) {
        firstNote.click();
      }
      break;
  }
  document.querySelector('.menue__link-selected').classList.remove('menue__link-selected');
  e.target.classList.add('menue__link-selected');
}

function addHandler(e) {
  e.preventDefault();
  const noteValues = getNoteValues();
  if (!noteValues) {
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
    return;
  }
  noteValues.type = 'pinned';
  notesObj.addNote(noteValues);
  resetAddNoteForm();
}
function renderUserNotes() {
  const notesArr = getStorageData('notes');
  if (!notesArr || notesArr.lenght) {
    addNavLinkEl.click();
    return;
  }
  notesObj.renderNotes(notesArr);
  notesNavLinkEl.click();
}

export {
  inputMenueEl, navEl, btnAddNote, btnAddPinnedNote,
  searchNotesHandler, navLinkHandler, addHandler, addPinnedHandler, renderUserNotes,
};
