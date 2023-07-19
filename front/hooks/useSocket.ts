// 전역 소켓 관리를 위한 파일 useSocket.ts => redux socket.ts로 변경되어 주석 처리

// import { useState, useEffect, useCallback } from 'react';
// import { io, Socket } from "socket.io-client";
// import React from 'react';

// const useSocket = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const connectSocket = useCallback(() => {
//     console.log('app: socket:', socket);

//     if (socket) return;

//     const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
//       transports: ['websocket'],
//       reconnectionAttempts: 5,
//       reconnectionDelayMax: 2000,
//     });

//     setSocket(newSocket);
//     console.log('new socket connect', newSocket);
//   }, [socket]);

//   const disconnectSocket = useCallback(() => {
//     socket?.disconnect();
//     setSocket(null);
//   }, [socket]);

//   useEffect(() => {
//     connectSocket();

//     return () => {
//       disconnectSocket();
//       console.log('socket disconnect');
//     }
//   }, []);
  
//   return { socket, connectSocket, disconnectSocket };
// };

// export default useSocket;