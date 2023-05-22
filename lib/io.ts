import { Server } from 'socket.io';

// initialize socket.io
export const io = (res?: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    return res.socket.server.io;
  }

  console.log('Socket is initializing');
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('New client connected: ' + socket.id);
  });

  return io;
};
