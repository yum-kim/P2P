import { IUser } from './../../components/component/PostCard/PostCard';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import auth from '../../api/auth';

interface IAuthState {
    logInLoading: boolean;
    logInDone: boolean;
    logInError: any;
    logOutDone: boolean;
    signUpLoading: boolean;
    signUpDone: boolean;
    signUpError: any;
    user: IUser | null;
}

const initialState: IAuthState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutDone: false,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInRequest: (state, action: PayloadAction<any>) => {
            state.logInLoading = true;
            state.logInDone = false;
            state.logInError = null;
            state.logOutDone = false;
        },
        logInSuccess: (state, action: PayloadAction<IUser>) => {
            const { id, username, usercode, accessToken, profileImagePath } = action.payload;
            state.logInLoading = false;
            state.logInDone = true;
            state.user = { id, username, usercode, accessToken, profileImagePath };
            auth.setToken(accessToken);
        },
        logInFailure: (state, action: PayloadAction<any>) => {
            state.logInLoading = false;
            state.logInError = action.payload;
        },
        logOutRequest: (state) => {
            state.logInDone = false;
            state.logOutDone = true;
            state.user = null;
            auth.setToken(null);
        },
        signUpRequest: (state, action: PayloadAction<any>) => {
            state.signUpLoading = true;
            state.signUpDone = false;
            state.signUpError = null;
        },
        signUpSuccess: (state, action: PayloadAction<any>) => {
            state.signUpLoading = false;
            state.signUpDone = true;
        },
        signUpFailure: (state, action: PayloadAction<any>) => {
            state.signUpLoading = false;
            state.signUpError = action.payload;
        },
        signUpInit: (state) => {
            state.logInError = null;
            state.signUpDone = false;
            state.signUpError = null;
        },
    }
})

export const {
  logInRequest,
  logInSuccess,
  logInFailure,
  logOutRequest,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signUpInit,
} = authSlice.actions;
export default authSlice.reducer;