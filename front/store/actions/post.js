
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

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