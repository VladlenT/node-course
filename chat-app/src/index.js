const port = process.env.PORT || 3000;
const { server, io } = require('./app');

io.on('connection', () => {
  console.log('new WebSockets connection');
});

server.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
