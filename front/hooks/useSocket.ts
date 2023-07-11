import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from "socket.io-client";
import React from 'react';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (socket?.connected) return;

    const newSocket = io("http://ec2-43-202-42-66.ap-northeast-2.compute.amazonaws.com:3001", {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelayMax: 2000,
    });

    setSocket(newSocket);
    console.log('new socket connect', newSocket);
  }, [socket]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);
  
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