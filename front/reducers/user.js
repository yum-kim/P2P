export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
}

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN': {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        default:
            return state;
    }
}

export default reducer;