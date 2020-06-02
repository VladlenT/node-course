const port = process.env.PORT || 3000;
const { server, io } = require('./app');
const Filter = require('bad-words');
const { generateMessage, generateUrl } = require('./utils/messages');
const { addUser, getUser, getUsersInRoom, removeUser } = require('./utils/users');

io.on('connection', socket => {
  console.log('new WebSockets connection');

  socket.on('join', (options, callback) => {
    const { user, error } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('Welcome!', 'Admin'));
    socket.broadcast
      .to(user.room)
      .emit('message', generateMessage(`${user.username} has joined`, 'Admin'));

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Rejected. Profanity is not allowed!');
    }

    io.to(user.room).emit('message', generateMessage(message, user.username));
    callback('Delivered!');
  });

  socket.on('sendLocation', (coords, acknowledgement) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      'locationMessage',
      generateUrl(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
        user.username,
      ),
    );
    acknowledgement();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', generateMessage(`${user.username} has left.`, 'Admin'));
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
