// config should be imported before importing any other file
import 'babel-polyfill';
import SocketIO from 'socket.io';
import config from './initial/config';
import app from './initial/express';
import { notifications } from './server/services/notifications';

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
// listen on port config.port
  const server = app.listen(config.port, () => {
    console.info(`API Server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
  const io = new SocketIO(server, { origins: '*:*' });
  notifications(io);
}

export default app;
