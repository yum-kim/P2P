const initialState = {
    user: {
        inLoggedIn: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    }
};

//action creater
const login = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
};

const rootReducer = ((state = initialState, action) => {
    switch(action.type) {
        case 'LOG_IN': {
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true,
                    }
                }
            }
    }
});

export default rootReducer;