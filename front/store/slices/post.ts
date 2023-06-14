import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPostParams } from '../../pages/feed';

const initialState = {
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
    modalMessage: null,
    allPosts: [],
    allPostsCnt: 0,
}

export interface IPostParams {
    description?: string,
    sortColumn?: "createAt",
    orderby?: "ASC" | "DESC",
    page: number,
    size: number
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // 게시글 가져오기
        getPostsRequest: (state, action: PayloadAction<IPostParams>) => {
            state.getPostsLoading = true;
            state.getPostsDone = false;
            state.getPostsError = null;
        },
        getPostsSuccess: (state, action: PayloadAction<any>) => {
            const { posts, page } = action.payload;

            if (page === 1) {
                state.allPosts = posts[0];
            } else {
                state.allPosts.push(...posts[0]);
            }
            state.allPostsCnt = posts[1];
            state.getPostsLoading = false;
            state.getPostsDone = true;
        },
        getPostsFailure: (state, action: PayloadAction<any>) => {
            state.getPostsLoading = false;
            state.getPostsError = action.payload;
        },
        // 게시글 추가
        addPostRequest: (state, action: PayloadAction<any>) => {
            state.addPostLoading = true;
            state.addPostDone = false;
            state.addPostError = null;
        },
        addPostSuccess: (state, action: PayloadAction<any>) => {
            state.allPosts.unshift(action.payload);
            state.allPostsCnt++;
            state.addPostLoading = false;
            state.addPostDone = true;
            state.modalMessage = '게시물 업로드';
        },
        addPostFailure: (state, action: PayloadAction<any>) => {
            state.addPostLoading = false;
            state.addPostError = action.payload;
        },
        // 게시글 수정
        updatePostRequest: (state, action: PayloadAction<any>) => {
            state.updatePostLoading = true;
            state.updatePostDone = false;
            state.updatePostError = null;
        },
        updatePostSuccess: (state, action: PayloadAction<any>) => {
            const updatedPost = state.allPosts.find((v) => v.id === action.payload.id);
            updatedPost.description = action.payload.description;
            state.updatePostLoading = false;
            state.updatePostDone = true;
            state.modalMessage = '게시물 수정';
        },
        updatePostFailure: (state, action: PayloadAction<any>) => {
            state.updatePostLoading = false;
            state.updatePostError = action.payload;
        },
        // 게시글 삭제
        deletePostRequest: (state, action: PayloadAction<any>) => {
            state.deletePostLoading = true;
            state.deletePostDone = false;
            state.deletePostError = null;
        },
        deletePostSuccess: (state, action: PayloadAction<any>) => {
            state.allPosts = state.allPosts.filter((v) => v.id !== action.payload.id);
            state.allPostsCnt--;
            state.deletePostLoading = false;
            state.deletePostDone = true;
            state.modalMessage = '게시물 삭제';
        },
        deletePostFailure: (state, action: PayloadAction<any>) => {
            state.deletePostLoading = false;
            state.deletePostError = action.payload;
        },
        // 게시물 공개여부 변경
        changePostStatusRequest: (state, action: PayloadAction<any>) => {
            state.changePostStatusLoading = true;
            state.changePostStatusDone = false;
            state.changePostStatusError = null;
        },
        changePostStatusSuccess: (state, action: PayloadAction<any>) => {
            const changedPost = state.allPosts.find((v) => v.id === action.payload.id);
            changedPost.status = action.payload.status;
            state.changePostStatusLoading = false;
            state.changePostStatusDone = true;
            state.modalMessage = '게시물 공개 범위 수정';
        },
        changePostStatusFailure: (state, action: PayloadAction<any>) => {
            state.changePostStatusLoading = false;
            state.changePostStatusError = action.payload;
        },
        // 게시글 좋아요 업데이트
        updatePostHeartRequest: (state, action: PayloadAction<any>) => {
            state.updatePostHeartLoading = true;
            state.updatePostHeartDone = false;
            state.updatePostHeartError = null;
        },
        updatePostHeartSuccess: (state, action: PayloadAction<any>) => {
            const heartedPost = state.allPosts.find((v) => v.id === action.payload.boardId);
            heartedPost.heart = action.payload.heart;
            heartedPost.heartCount = action.payload.heart
                ? heartedPost.heartCount + 1
                : heartedPost.heartCount - 1;
            state.updatePostHeartLoading = false;
            state.updatePostHeartDone = true;
        },
        updatePostHeartFailure: (state, action: PayloadAction<any>) => {
            state.updatePostHeartLoading = false;
            state.updatePostHeartError = action.payload;
        },
        // 댓글 추가
        addCommentRequest: (state, action: PayloadAction<any>) => {
            state.addCommentLoading = true;
            state.addCommentDone = false;
            state.addCommentError = null;
        },
        addCommentSuccess: (state, action: PayloadAction<any>) => {
            const addedPost = state.allPosts.find((post) => post.id === action.payload.boardId);
            addedPost.comment.push(action.payload);
            state.addCommentLoading = false;
            state.addCommentDone = true;
        },
        addCommentFailure: (state, action: PayloadAction<any>) => {
            state.addCommentLoading = false;
            state.addCommentError = action.payload;
        },
        // 댓글 수정
        updateCommentRequest: (state, action: PayloadAction<any>) => {
            state.updateCommentLoading = true;
            state.updateCommentDone = false;
            state.updateCommentError = null;
        },
        updateCommentSuccess: (state, action: PayloadAction<any>) => {
            const updated = state.allPosts.find((post) => post.id === action.payload.boardId);
            const updatedComment = updated.comment.find((comment) => comment.id === action.payload.id);
            updatedComment.comment = action.payload.comment;
            updatedComment.updatedAt = action.payload.updatedAt;
            state.updateCommentLoading = false;
            state.updateCommentDone = true;
        },
        updateCommentFailure: (state, action: PayloadAction<any>) => {
            state.updateCommentLoading = false;
            state.updateCommentError = action.payload;
        },
        // 댓글 삭제
        deleteCommentRequest: (state, action: PayloadAction<any>) => {
            state.deleteCommentLoading = true;
            state.deleteCommentDone = false;
            state.deleteCommentError = null;
        },
        deleteCommentSuccess: (state, action: PayloadAction<any>) => {
            const deletedPost = state.allPosts.find((post) => post.id === action.payload.boardId);
            const deletedComment = deletedPost.comment.filter((comment) => comment.id !== action.payload.id);
            deletedPost.comment = deletedComment;
            state.deleteCommentLoading = false;
            state.deleteCommentDone = true;
        },
        deleteCommentFailure: (state, action: PayloadAction<any>) => {
            state.deleteCommentLoading = false;
            state.deleteCommentError = action.payload;
        },
    },
});

export const {
  getPostsRequest,
  getPostsSuccess,
  getPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  changePostStatusRequest,
  changePostStatusSuccess,
  changePostStatusFailure,
  updatePostHeartRequest,
  updatePostHeartSuccess,
  updatePostHeartFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  updateCommentRequest,
  updateCommentSuccess,
  updateCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
} = postSlice.actions;

export default postSlice.reducer;
