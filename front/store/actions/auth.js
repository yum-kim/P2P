export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
};
export const loginSuccessAction = (data) => {
    return {
        type: LOG_IN_SUCCESS,
        data,
    }
};
export const loginFailureAction = (error) => {
    return {
        type: LOG_IN_FAILURE,
        error,
    }
};

export const logoutRequestAction = (data) => {
    return {
        type: LOG_OUT_REQUEST,
        data
    }
};

export const logoutSuccessAction = (data) => {
    return {
        type: LOG_OUT_SUCCESS,
        data
    }
};

export const logoutFailureAction = (error) => {
    return {
        type: LOG_OUT_FAILURE,
        error
    }
};