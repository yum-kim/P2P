
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const CHANGE_POST_STATUS_REQUEST = 'CHANGE_POST_STATUS_REQUEST';
export const CHANGE_POST_STATUS_SUCCESS = 'CHANGE_POST_STATUS_SUCCESS';
export const CHANGE_POST_STATUS_FAILURE = 'CHANGE_POST_STATUS_FAILURE';

export const UPDATE_HEART_REQUEST = 'UPDATE_HEART_REQUEST';
export const UPDATE_HEART_SUCCESS = 'UPDATE_HEART_SUCCESS';
export const UPDATE_HEART_FAILURE = 'UPDATE_HEART_FAILURE';

export const getPostsRequestAction = (data) => {
    return {
        type: GET_POSTS_REQUEST,
        data
    }
}

export const getPostsSuccessAction = (data) => {
    return {
        type: GET_POSTS_SUCCESS,
        data
    }
}

export const getPostsFailureAction = (error) => {
    return {
        type: GET_POSTS_FAILURE,
        error
    }
}

export const addPostRequestAction = (data) => {
    return {
        type: ADD_POST_REQUEST,
        data
    }
}

export const addPostSuccessAction = (data) => {
    return {
        type: ADD_POST_SUCCESS,
        data: data
    }
}

export const addPostFailureAction = (error) => {
    return {
        type: ADD_POST_FAILURE,
        error
    }
}

export const updatePostRequestAction = (data) => {
    return {
        type: UPDATE_POST_REQUEST,
        data
    }
}

export const updatePostSuccessAction = (data) => {
    return {
        type: UPDATE_POST_SUCCESS,
        data: data
    }
}

export const updatePostFailureAction = (error) => {
    return {
        type: UPDATE_POST_FAILURE,
        error
    }
}

export const deletePostRequestAction = (data) => {
    return {
        type: DELETE_POST_REQUEST,
        data
    }
}

export const deletePostSuccessAction = (data) => {
    return {
        type: DELETE_POST_SUCCESS,
        data: data
    }
}

export const deletePostFailureAction = (error) => {
    return {
        type: DELETE_POST_FAILURE,
        error
    }
}

export const addCommentRequestAction = (data) => {
    return {
        type: ADD_COMMENT_REQUEST,
        data: data
    }
}

export const addCommentSuccessAction = (data) => {
    return {
        type: ADD_COMMENT_SUCCESS,
        data
    }
}

export const addCommentFailureAction = (error) => {
    return {
        type: ADD_COMMENT_FAILURE,
        error
    }
}

export const updateCommentRequestAction = (data) => {
    return {
        type: UPDATE_COMMENT_REQUEST,
        data: data
    }
}

export const updateCommentSuccessAction = (data) => {
    return {
        type: UPDATE_COMMENT_SUCCESS,
        data
    }
}

export const updateCommentFailureAction = (error) => {
    return {
        type: UPDATE_COMMENT_FAILURE,
        error
    }
}

export const deleteCommentRequestAction = (data) => {
    return {
        type: DELETE_COMMENT_REQUEST,
        data: data
    }
}

export const deleteCommentSuccessAction = (data) => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        data
    }
}

export const deleteCommentFailureAction = (error) => {
    return {
        type: DELETE_COMMENT_FAILURE,
        error
    }
}

export const changePostStatusRequestAction = (data) => {
    return {
        type: CHANGE_POST_STATUS_REQUEST,
        data
    }
}

export const changePostStatusSuccessAction = (data) => {
    return {
        type: CHANGE_POST_STATUS_SUCCESS,
        data: data
    }
}

export const changePostStatusFailureAction = (error) => {
    return {
        type: CHANGE_POST_STATUS_FAILURE,
        error
    }
}

export const updatePostHeartRequestAction = (data) => {
    return {
        type: UPDATE_HEART_REQUEST,
        data
    }
}

export const updatePostHeartSuccessAction = (data) => {
    return {
        type: UPDATE_HEART_SUCCESS,
        data: data
    }
}

export const updatePostHeartFailureAction = (error) => {
    return {
        type: UPDATE_HEART_FAILURE,
        error
    }
}
