import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    GET_POSTS_REQUEST, GET_POSTS_FAILURE, GET_POSTS_SUCCESS,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
    CHANGE_POST_STATUS_REQUEST, CHANGE_POST_STATUS_SUCCESS, CHANGE_POST_STATUS_FAILURE, UPDATE_HEART_REQUEST, UPDATE_HEART_SUCCESS, UPDATE_HEART_FAILURE, 
    UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
    UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE
} from "../actions/post";
import produce from 'immer';

export const initialState = {
    getPostsLoading: false,
    getPostsDone: false,
    getPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    updateCommentLoading: false,
    updateCommentDone: false,
    updateCommentError: null,
    deleteCommentLoading: false,
    deleteCommentDone: false,
    deleteCommentError: null,
    changePostStatusLoading: false,
    changePostStatusDone: false,
    changePostStatusError: null,
    updatePostHeartLoading: false,
    updatePostHeartDone: false,
    updatePostHeartError: null,
    allPosts: [],
    allPostsCnt: 0,
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
                const { posts, page } = action.data;

                if (page == 1) {
                    draft.allPosts = posts[0];
                } else {
                    draft.allPosts.push(...posts[0]);
                }
                draft.allPostsCnt = posts[1];
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
                draft.allPosts.unshift(action.data);
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case UPDATE_POST_REQUEST:
                draft.updatePostLoading = true;
                draft.updatePostDone = false;
                draft.updatePostError = null;
                break;
            case UPDATE_POST_SUCCESS:
                const updatedPost = draft.allPosts.find((v) => v.id === action.data.id);
                updatedPost.description = action.data.description;
                draft.updatePostLoading = false;
                draft.updatePostDone = true;
                break;
            case UPDATE_POST_FAILURE:
                draft.updatePostLoading = false;
                draft.updatePostError = action.error;
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
            case UPDATE_HEART_REQUEST:
                draft.updatePostHeartLoading = true;
                draft.updatePostHeartDone = false;
                draft.updatePostHeartError = null;
                break;
            case UPDATE_HEART_SUCCESS:
                const heartedPost = draft.allPosts.find((v) => v.id === action.data.boardId);
                heartedPost.heart = action.data.heart;
                heartedPost.heartCount = action.data.heart ? heartedPost.heartCount + 1 : heartedPost.heartCount - 1;
                draft.updatePostHeartLoading = false;
                draft.updatePostHeartDone = true;
                break;
            case UPDATE_HEART_FAILURE:
                draft.updatePostHeartLoading = false;
                draft.updatePostHeartError = action.error;
                break;
            //댓글
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const addedPost = draft.allPosts.find((post) => post.id == action.data.boardId);
                addedPost.comment.push(action.data);
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
                const updated = draft.allPosts.find((post) => post.id == action.data.boardId);
                const updatedComment = updated.comment.find((comment) => comment.id == action.data.id);
                updatedComment.comment = action.data.comment;
                updatedComment.updatedAt = action.data.updatedAt;
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
                const deletedPost = draft.allPosts.find((post) => post.id === action.data.boardId);
                const deletedComment = deletedPost.comment.filter((comment) => comment.id !== action.data.id);
                deletedPost.comment = deletedComment;
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