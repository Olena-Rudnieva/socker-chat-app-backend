module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // socket.on('joinRoom', ({ room, firstName, lastName }) => {
    //   console.log(`${firstName} ${lastName} приєднався до кімнати: ${room}`);
    //   socket.join(room);

    //   io.to(room).emit('message', {
    //     user: 'Admin',
    //     text: `${firstName} ${lastName} приєднався до кімнати.`,
    //     timestamp: new Date().toLocaleTimeString(),
    //   });
    // });

    // socket.on('disconnect', () => {
    //   console.log('User disconnected:', socket.id);
    // });
  });
};
