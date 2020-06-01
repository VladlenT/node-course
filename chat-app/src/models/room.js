const { User } = require('./user');

class Room {
  constructor(id) {
    this.users = [];
    this.id = id;
  }

  addUser({ username, id, room }) {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!username || !room) {
      throw new Error('Username and room are required!');
    }

    if (this._isUserExist({ username, id, room })) {
      throw new Error('Username is in use.');
    }

    const newUser = new User(username, id, room);
    this.users.push(newUser);
    return newUser;
  }

  _isUserExist({ username, id, room }) {
    return this.users.find(u => room === u.room && u.name === username);
  }
}

const room = new Room(123);
room.addUser({ id: 22, username: 'Jopker', room: '   Personaaaa' });
room.addUser({ id: 123, username: 'Jopker', room: 'Personaaaa   ' });

console.log(room.users);
