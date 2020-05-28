const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const publicDirPath = path.join(__dirname, '../public');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
app.use(express.static(publicDirPath));

const server = http.createServer(app);
const io = socketio(server);

module.exports = { server, io };
