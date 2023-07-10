import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from "socket.io-client";
import React from 'react';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (socket) return;
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    setSocket(newSocket);
    console.log('socket connect', socket);
  }, []);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, []);

  socket.on('message', (message) => {
    socket.emit(`received! : ${message}`);
  });

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
      console.log('socket disconnect');
    }
  }, []);
  
  return { socket, connectSocket, disconnectSocket };
};

export default useSocket;