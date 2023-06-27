import { IUser } from './../../components/component/PostCard/PostCard';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import auth from '../../api/auth';
import { BaseOptions } from 'vm';

interface IAuthState {
  logInLoading: boolean;
  logInDone: boolean;
  logInError: any;
  logOutDone: boolean;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: any;
  updateUserLoading: boolean;
  updateUserDone: boolean;
  updateUserError: boolean;
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
  updateUserLoading: false,
  updateUserDone: false,
  updateUserError: null,
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
    updateUserRequest: (state, action: PayloadAction<any>) => {
        state.updateUserLoading = true;
        state.updateUserDone = false;
        state.updateUserError = null;
    },
    updateUserSuccess: (state, action: PayloadAction<any>) => {
        state.updateUserLoading = false;
        state.updateUserDone = true;
        state.user.usercode = action.payload.usercode;
    },
    updateUserFailure: (state, action: PayloadAction<any>) => {
        state.updateUserLoading = false;
        state.updateUserError = action.payload;
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
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure
} = authSlice.actions;
export default authSlice.reducer;