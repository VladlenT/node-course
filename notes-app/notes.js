const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
  return 'Your notes...';
}

function addNote({ title, body }) {
  const notes = loadNotes();

  if (!notes.has(title)) {
    notes.set(title, body);
    saveNotes(notes);

    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title is taken!'));
  }
}

function removeNote({ title }) {
  const notes = loadNotes();

  if (notes.has(title)) {
    notes.delete(title);
    saveNotes(notes);

    console.log(chalk.green.inverse(`Note with title: "${title}" was deleted!`));
  } else {
    console.log(chalk.red.inverse('No such note.'));
  }
}

function listNotes() {
  const notes = loadNotes();

  console.log(chalk.magenta('Your notes: '));

  notes.forEach((value, key) => console.log(key));
}

function readNote({ title }) {
  const notes = loadNotes();

  notes.has(title)
    ? console.log(notes.get(title))
    : console.log(chalk.red.inverse('No such note.'));
}

function loadNotes() {
  try {
    const notes = fs.readFileSync('notes.json').toString();
    return new Map(JSON.parse(notes));
  } catch (e) {
    return new Map();
  }
}

const saveNotes = notes =>
  fs.writeFileSync('notes.json', JSON.stringify(Array.from(notes.entries())));

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
