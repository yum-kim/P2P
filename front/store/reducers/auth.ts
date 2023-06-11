import {
    LOG_IN_REQUEST, LOG_OUT_REQUEST, LOG_IN_SUCCESS,
    LOG_IN_FAILURE, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_INIT
} from "../actions/auth";
import produce from 'immer';
import auth from "../../api/auth";

export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    // logOutLoading: false,
    // logOutDone: false,
    // logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    user: null,
    // signUpData: {},
    // loginData: {},
}

interface IActionProps {
    type: string,
    data: any,
    error: any
}

const reducer = (state = initialState, action: IActionProps) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                const { userid, username, accessToken, profileImagePath } = action.data;
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.user = { userid, username, profileImagePath };
                auth.setToken(accessToken);
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                // draft.logOutLoading = true;
                // draft.logOutDone = false;
                // draft.logOutError = null;
                draft.logInDone = false;
                draft.user = null;
                auth.setToken(null);
                break;
            // case LOG_OUT_SUCCESS:
            //     draft.logOutLoading = false;
            //     draft.logOutDone = true;
            //     draft.user = null;
            //     auth.setToken(null);
            //     break;
            // case LOG_OUT_FAILURE:
            //     draft.logOutLoading = false;
            //     draft.logOutError = action.error;
            //     break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            case SIGN_UP_INIT:
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            default:
                return state;
        }
    })
};

export default reducer;