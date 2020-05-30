const port = process.env.PORT || 3000;
const { server, io } = require('./app');
const Filter = require('bad-words');

io.on('connection', socket => {
  console.log('new WebSockets connection');

  socket.emit('message', 'Welcome!');
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Rejected. Profanity is not allowed!');
    }

    io.emit('message', message);
    callback('Delivered!');
  });

  socket.on('sendLocation', (coords, acknowledgement) => {
    io.emit(
      'message',
      `Location: https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
    );
    acknowledgement();
  });

  socket.on('disconnect', () => {
    io.emit('message', 'User has left');
  });
});

server.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
