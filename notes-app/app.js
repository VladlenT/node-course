const yargs = require('yargs');

const { addNote, removeNote, listNotes, readNote } = require('./notes');

yargs.command({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: false,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: false,
      type: 'string',
    },
  },
  handler: addNote,
});

yargs.command({
  command: 'remove',
  description: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: removeNote,
});

yargs.command({
  command: 'list',
  description: 'Print all notes',
  handler: listNotes,
});

yargs.command({
  command: 'read',
  description: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: readNote,
});

const command = yargs.argv;
