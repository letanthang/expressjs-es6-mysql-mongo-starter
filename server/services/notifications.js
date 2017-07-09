export const notifications = (io) => {
  io.on('connection', (socket) => {
    console.log('ClientID :', socket.id, ' is Connected');// eslint-disable-line no-console
    socket.on('ding', () => {
      console.log('ding dong');// eslint-disable-line no-console
      socket.emit('dong');
    });
    socket.on('disconnect', () => {
      console.log('ClientID :', socket.id, ' is Disconnected');// eslint-disable-line no-console
    });
  });
};
