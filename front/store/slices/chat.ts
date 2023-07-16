import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IChat } from '../../components/component/MessageList/MessageList';

const initialState = {
    getChatListLoading: false,
    getChatListDone: false,
    getChatListError: null,
    getChatDetailLoading: false,
    getChatDetailDone: false,
    getChatDetailError: null,
    createChatLoading: false,
    createChatDone: false,
    createChatError: null,
    chatList: [],
    fetchedChatDetails: [],
    chatDetails: [],
    cursor: null,
    currentChatUser: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getChatListRequest: (state) => {
        state.getChatListLoading = true;
        state.getChatListDone = false;
        state.getChatListError = null;
    },
    getChatListSuccess: (state, action: PayloadAction<any>) => {
        state.getChatListLoading = false;
        state.getChatListDone = true;
        state.chatList = action.payload;
    },
    getChatListFailure: (state, action: PayloadAction<any>) => {
        state.getChatListLoading = false;
        state.getChatListError = action.payload;
      },
    getChatDetailRequest: (state, action: PayloadAction<any>) => {
        state.getChatDetailLoading = true;
        state.getChatDetailDone = false;
        state.getChatDetailError = null;
    },
    getChatDetailSuccess: (state, action: PayloadAction<any>) => {
        const { chats, cursor } = action.payload;
        state.fetchedChatDetails = chats[0];
        state.cursor = chats[1];
        
        if (!cursor) {
            state.chatDetails = state.fetchedChatDetails;
        } else {
            state.chatDetails.push(...state.fetchedChatDetails);
        }
        
        state.getChatDetailLoading = false;
        state.getChatDetailDone = true;
    },
    getChatDetailFailure: (state, action: PayloadAction<any>) => {
        state.getChatDetailLoading = false;
        state.getChatDetailError = action.payload;
    },
    resetChatDetailRequset: (state) => {
        state.cursor = null;
        // state.fetchedChatDetails = [];
        // state.chatDetails = [];
    },
    createChatRequest: (state, action: PayloadAction<any>) => {
        state.createChatLoading = true;
        state.createChatDone = false;
        state.createChatError = null;
    },
    createChatSuccess: (state, action: PayloadAction<IChat>) => {
        state.createChatLoading = false;
        state.createChatDone = true;
    },
    createChatFailure: (state, action: PayloadAction<any>) => {
        state.createChatLoading = false;
        state.createChatError = action.payload;
      },
    updateCurrentChatUserRequest: (state, action: PayloadAction<any>) => {
        state.currentChatUser = action.payload;
    },
    resetAllChatDone: (state) => {
        Object.keys(state).forEach((key) => {
            if (key.endsWith("Done")) {
                state[key] = false;
            }
        });
    },
    resetAllChatError: (state) => {
        Object.keys(state).forEach((key) => {
            if (key.endsWith("Error")) {
                state[key] = null;
            }
        });
    },
    resetAllChat: (state) => {
        Object.assign(state, initialState)
    }
  }
})

export const {
    getChatListRequest,
    getChatListSuccess,
    getChatListFailure,
    getChatDetailRequest,
    getChatDetailSuccess,
    getChatDetailFailure,
    resetChatDetailRequset,
    createChatRequest,
    createChatSuccess,
    createChatFailure,
    updateCurrentChatUserRequest,
    resetAllChatDone,
    resetAllChatError,
    resetAllChat,
} = chatSlice.actions;
export default chatSlice.reducer;