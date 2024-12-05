const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST, PORT } = process.env;
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', ({ chatId }) => {
    socket.join(chatId);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.chatId).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    server.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
