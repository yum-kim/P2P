import { UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE } from './../actions/post';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    GET_POSTS_REQUEST, GET_POSTS_FAILURE, GET_POSTS_SUCCESS,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
    CHANGE_POST_STATUS_REQUEST, CHANGE_POST_STATUS_SUCCESS, CHANGE_POST_STATUS_FAILURE, CHANGE_POST_HIT_REQUEST, CHANGE_POST_HIT_SUCCESS, CHANGE_POST_HIT_FAILURE,
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
    updateCommentLoading: false,
    updateCommentDone: false,
    updateCommentError: null,
    deleteCommentLoading: false,
    deleteCommentDone: false,
    deleteCommentError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
    changePostStatusLoading: false,
    changePostStatusDone: false,
    changePostStatusError: null,
    changePostHitLoading: false,
    changePostHitDone: false,
    changePostHitError: null,
    allPosts: [],
}

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            //게시글
            case GET_POSTS_REQUEST:
                draft.getPostsLoading = true;
                draft.getPostsDone = false;
                draft.getPostsError = null;
                break;
            case GET_POSTS_SUCCESS:
                const { data, page } = action.data;

                if (page == 1) {
                    draft.allPosts = data;
                } else {
                }
                // draft.allPosts.push(...data);
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
            //게시물 공개여부
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
            // 게시글 좋아요
            case CHANGE_POST_HIT_REQUEST:
                draft.changePostHitLoading = true;
                draft.changePostHitDone = false;
                draft.changePostHitError = null;
                break;
            case CHANGE_POST_HIT_SUCCESS:
                const hitedPost = draft.allPosts.find((v) => v.id === action.data.id);
                hitedPost.hit = action.data.hit;
                draft.changePostHitLoading = false;
                draft.changePostHitDone = true;
                break;
            case CHANGE_POST_HIT_FAILURE:
                draft.changePostHitLoading = false;
                draft.changePostHitError = action.error;
                break;
            //댓글
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const commentPost = draft.allPosts.find((post) => post.id == action.data.id);
                commentPost.comment.push(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case UPDATE_COMMENT_REQUEST:
                draft.updateCommentLoading = true;
                draft.updateCommentDone = false;
                draft.updateCommentError = null;
                break;
            case UPDATE_COMMENT_SUCCESS:
                const post = draft.allPosts.find((post) => post.id == action.data.boardId);
                const comment = post.comment.find((comment) => comment.id == action.data.id);
                comment.comment = action.comment;
                comment.updatedAt = action.updatedAt;
                draft.updateCommentLoading = false;
                draft.updateCommentDone = true;
                break;
            case UPDATE_COMMENT_FAILURE:
                draft.updateCommentLoading = false;
                draft.updateCommentError = action.error;
                break;
            case DELETE_COMMENT_REQUEST:
                draft.deleteCommentLoading = true;
                draft.deleteCommentDone = false;
                draft.deleteCommentError = null;
                break;
            case DELETE_COMMENT_SUCCESS:
                draft.allPosts = draft.allPosts.filter((v) => v.id !== action.data.id);
                draft.deleteCommentLoading = false;
                draft.deleteCommentDone = true;
                break;
            case DELETE_COMMENT_FAILURE:
                draft.deleteCommentLoading = false;
                draft.deleteCommentError = action.error;
                break;
            default:
                return state;
        }
    })
};

export default reducer;