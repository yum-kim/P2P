import { TOKEN_COOKIE_NAME } from './../../utils/cookie';
import { IUser } from './../../components/component/PostCard/PostCard';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import auth from '../../api/auth';
import { setCookie } from '../../utils/cookie';
import { resetDoneState } from './reset';

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
  updateUserError: any;
  deleteProfileImgLoading: boolean;
  deleteProfileImgDone: boolean;
  deleteProfileImgError: any;
  removeAccountLoading: boolean;
  removeAccountDone: boolean;
  removeAccountError: any;
  issueAccessTokenLoading: boolean;
  issueAccessTokenDone: boolean;
  issueAccessTokenError: null;
  expireRefreshTokenError: null;
  modalMessage: string | null;
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
  deleteProfileImgLoading: false,
  deleteProfileImgDone: false,
  deleteProfileImgError: null,
  removeAccountLoading: false,
  removeAccountDone: false,
  removeAccountError: null,
  issueAccessTokenLoading: false,
  issueAccessTokenDone: false,
  issueAccessTokenError: null,
  expireRefreshTokenError: null,
  modalMessage: null,
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
        const { id, username, usercode, accessToken, refreshToken, profileImagePath } = action.payload;
        state.logInLoading = false;
        state.logInDone = true;
        state.user = { id, username, usercode, accessToken, profileImagePath };
        auth.setToken(accessToken);
        setCookie(TOKEN_COOKIE_NAME, refreshToken, 1);
        state.expireRefreshTokenError = null;
    },
    logInFailure: (state, action: PayloadAction<any>) => {
        state.logInLoading = false;
        state.logInError = action.payload;
    },
    logOutRequest: (state, action?: null | PayloadAction<any>) => {
        state.logInDone = false;
        state.logOutDone = true;
        state.user = null;
        auth.setToken(null);

        if (action?.payload) { //토큰만료로 로그아웃 시켰을 때
          state.expireRefreshTokenError = action.payload;
        }
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
        if (action.payload.usercode) state.user.usercode = action.payload.usercode;
        else if (action.payload.profileImagePath) state.user.profileImagePath = action.payload.profileImagePath;
        state.modalMessage = "프로필 정보 수정";
    },
    updateUserFailure: (state, action: PayloadAction<any>) => {
        state.updateUserLoading = false;
        state.updateUserError = action.payload;
    },
    deleteProfileImgRequest: (state) => {
        state.deleteProfileImgLoading = true;
        state.deleteProfileImgDone = false;
        state.deleteProfileImgError = null;
    },
    deleteProfileImgSuccess: (state) => {
        state.deleteProfileImgLoading = false;
        state.deleteProfileImgDone = true;
        state.user.profileImagePath = null;
        state.modalMessage = "프로필 이미지 삭제";
    },
    deleteProfileImgFailure: (state, action: PayloadAction<any>) => {
        state.deleteProfileImgLoading = false;
        state.deleteProfileImgError = action.payload;
    },
    removeAccountRequest: (state) => {
        state.removeAccountLoading = true;
        state.removeAccountDone = false;
        state.removeAccountError = null;
    },
    removeAccountSuccess: (state) => {
        state.removeAccountLoading = false;
        state.removeAccountDone = true;
        state.user = null;
        state.modalMessage = "회원탈퇴";
    },
    removeAccountFailure: (state, action: PayloadAction<any>) => {
        state.removeAccountLoading = false;
        state.removeAccountError = action.payload;
    },
    issueAccessTokenRequest: (state) => {
        state.issueAccessTokenLoading = true;
        state.issueAccessTokenDone = false;
        state.issueAccessTokenError = null;
    },
    issueAccessTokenSuccess: (state, action: PayloadAction<IUser>) => {
        state.issueAccessTokenLoading = false;
        state.issueAccessTokenDone = true;
        const { id, username, usercode, accessToken, profileImagePath } = action.payload;
        state.user = { id, username, usercode, accessToken, profileImagePath };
        auth.setToken(accessToken);
    },
    issueAccessTokenFailure: (state, action: PayloadAction<any>) => {
        state.issueAccessTokenLoading = false;
        state.issueAccessTokenError = action.payload;
    },
    //모달 확인 처리 후 상태값 리셋
    resetSpecificAuth: (state, action: PayloadAction<string>) => {
        const key = action.payload;
        if (state.hasOwnProperty(key)) {
            state[key] = false;
        }
    },
    resetAllAuthDone: (state) => {
        Object.keys(state).forEach((key) => {
            if (key.endsWith("Done")) {
                state[key] = false;
            }
        });
        state.modalMessage = null;
    },
    resetAllAuthError: (state) => {
        Object.keys(state).forEach((key) => {
            if (key.endsWith("Error")) {
                state[key] = false;
            }
        });
    },
    resetAllAuth: (state) => {
        Object.assign(state, initialState)
    }
  },
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
  updateUserFailure,
  deleteProfileImgRequest,
  deleteProfileImgSuccess,
  deleteProfileImgFailure,
  removeAccountRequest,
  removeAccountSuccess,
  removeAccountFailure,
  issueAccessTokenRequest,
  issueAccessTokenSuccess,
  issueAccessTokenFailure,
  resetSpecificAuth,
  resetAllAuthDone,
  resetAllAuthError,
  resetAllAuth,
} = authSlice.actions;
export default authSlice.reducer;