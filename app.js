const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');

dotenv.config();
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let chats = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ chatId }) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on('sendMessage', (message) => {
    const { chatId, ...rest } = message;

    io.to(chatId).emit('message', rest);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.post('/api/chats/:chatId/message', (req, res) => {
  const { chatId } = req.params;
  const message = req.body;

  if (!chats[chatId]) {
    chats[chatId] = [];
  }
  chats[chatId].push(message);

  io.to(chatId).emit('message', message);

  res.status(200).json({ message: 'Message sent', data: chats[chatId] });
});

app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
