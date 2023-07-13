import { createSlice } from '@reduxjs/toolkit'
import { io, Socket } from 'socket.io-client';

const initialState = {
    socket: null,
    isConnected: false,
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
    reducers: {
        connetSocketRequest: (state) => {
            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
                transports: ['websocket'],
                reconnectionAttempts: 5,
                reconnectionDelayMax: 2000,
            });
            state.socket = newSocket;
            state.isConnected = newSocket.connected;
            console.log('socket connected', newSocket);
        },
        disconnetSocketRequest: (state) => {
            if (!state.socket) return;
            state.socket.disconnect();
            state.socket = null;
            console.log('socket disconnected');
        },
    }
})

export const {
  connetSocketRequest,
  disconnetSocketRequest,
} = socketSlice.actions;
export default socketSlice.reducer;