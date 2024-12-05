// module.exports = (io) => {
//   io.on('connection', (socket) => {
//     console.log('New connection:', socket.id);

//     socket.on('joinRoom', ({ chatId, userId, userName }) => {
//       console.log(`${userName} has joined the room${chatId}`);
//       console.log('User ID:', userId);

//       socket.join(chatId);

//       io.to(chatId).emit('message', {
//         user: 'Admin',
//         text: `${userName} has joined the room`,
//         timestamp: new Date().toLocaleTimeString(),
//       });
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });
// };
