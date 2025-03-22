const express = require('express');
const { createServer } = require('node:http');
// const { createServer } = require('http');
const { join } = require('node:path');
// const join = require('path').join;

const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3001;

app.get('/', (req, res) => {
  res.sendFile(join(__dirname + '/index.html'));
});

io.on('connection', (socket) => {
  console.log(`Connection is established with socket id: ${socket.id}`);

  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Connection is disconnected with socket id: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});