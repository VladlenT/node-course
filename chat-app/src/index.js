const port = process.env.PORT || 3000;
const { server, io } = require('./app');
const Filter = require('bad-words');
const { generateMessage, generateUrl } = require('./utils/messages');

io.on('connection', socket => {
  console.log('new WebSockets connection');

  socket.emit('message', generateMessage('Welcome!'));
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Rejected. Profanity is not allowed!');
    }

    io.emit('message', generateMessage(message));
    callback('Delivered!');
  });

  socket.on('sendLocation', (coords, acknowledgement) => {
    io.emit(
      'locationMessage',
      generateUrl(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`),
    );
    acknowledgement();
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('User has left'));
  });
});

server.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
