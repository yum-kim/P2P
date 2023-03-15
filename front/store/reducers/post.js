import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    GET_POSTS_REQUEST, GET_POSTS_FAILURE, GET_POSTS_SUCCESS,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
    CHANGE_POST_STATUS_REQUEST, CHANGE_POST_STATUS_SUCCESS, CHANGE_POST_STATUS_FAILURE,
} from "../actions/post";
import produce from 'immer';

export const initialState = {
    getPostsLoading: false,
    getPostsDone: false,
    getPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
    changePostStatusLoading: false,
    changePostStatusDone: false,
    changePostStatusError: null,
    allPosts: [
        {
        id: 1,
        createAt: '2022.11.11 00:12:12',
        user: {
            id: 1,
            username: 'yumi',
            profileImagePath: '/images/profile.png'
        },
        description: 'next로 프로젝트를 하는 중인데 쉽지않아요 . .',
        imagePath: 'https://images.velog.io/images/jay/post/3a497590-d1b6-414c-9f3f-7b6c7eb18f6d/img.png',
        comments: [
            {
                username: 'jemin',
                commentMemo: '댓글이당당',
                createAt: '2022.11.11 00:12:12'
            },
            {
                username: 'jemin',
                commentMemo: '댓글이당당1111',
                createAt: '2022.11.11 00:12:15'
            }
        ]
        }
    ],
}

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_POSTS_REQUEST:
                draft.getPostsLoading = true;
                draft.getPostsDone = false;
                draft.getPostsError = null;
                break;
            case GET_POSTS_SUCCESS:
                const { data, page } = action.data;
                if (page == 1) {
                    // draft.allPosts = data;
                } else {
                }
                draft.allPosts.push(...data);
                draft.getPostsLoading = false;
                draft.getPostsDone = true;
                break;
            case GET_POSTS_FAILURE:
                draft.getPostsLoading = false;
                draft.getPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                // const addedPost = draft.allPosts.find((post) => post.postId == action.data.postId);
                // addedPost.comments.push(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case DELETE_POST_REQUEST:
                draft.deletePostLoading = true;
                draft.deletePostDone = false;
                draft.deletePostError = null;
                break;
            case DELETE_POST_SUCCESS:
                draft.allPosts = draft.allPosts.filter((v) => v.id !== action.data.id);
                draft.deletePostLoading = false;
                draft.deletePostDone = true;
                break;
            case DELETE_POST_FAILURE:
                draft.deletePostLoading = false;
                draft.deletePostError = action.error;
                break;
            case CHANGE_POST_STATUS_REQUEST:
                draft.changePostStatusLoading = true;
                draft.changePostStatusDone = false;
                draft.changePostStatusError = null;
                break;
            case CHANGE_POST_STATUS_SUCCESS:
                const changedPost = draft.allPosts.find((v) => v.id === action.data.id);
                changedPost.status = action.data.status;
                draft.changePostStatusLoading = false;
                draft.changePostStatusDone = true;
                break;
            case CHANGE_POST_STATUS_FAILURE:
                draft.changePostStatusLoading = false;
                draft.changePostStatusError = action.error;
                break;
            
            default:
                return state;
        }
    })
};

export default reducer;