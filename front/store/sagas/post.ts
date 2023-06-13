import { updateCommentSuccessAction, updateCommentFailureAction, deleteCommentSuccessAction, deleteCommentFailureAction } from './../actions/post';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_POSTS_REQUEST, getPostsSuccessAction, getPostsFailureAction,
  ADD_POST_REQUEST, addPostSuccessAction, addPostFailureAction,
  ADD_COMMENT_REQUEST, addCommentSuccessAction, addCommentFailureAction,
  UPDATE_COMMENT_REQUEST, DELETE_COMMENT_REQUEST,
  DELETE_POST_REQUEST, deletePostSuccessAction, deletePostFailureAction,
  CHANGE_POST_STATUS_REQUEST, changePostStatusSuccessAction, changePostStatusFailureAction, 
  UPDATE_HEART_REQUEST, updatePostHeartSuccessAction, updatePostHeartFailureAction
} from '../actions/post';
import boards from '../../api/boards';

function* getPosts(action) {
  const { res, error } = yield call(boards.getBoards, action.data);

  if (res) {
    yield put(getPostsSuccessAction({ posts: res, page: action.data.page }));
  } else {
    yield put(getPostsFailureAction(error));
  }
}

function* addPost(action) {
  const { res, error } = yield call(boards.createBoard, action.data);

  if (res) {
    yield put(addPostSuccessAction(res));
  } else {
    yield put(addPostFailureAction(error));
  }
}

function* addComment(action) {
  const { res, error } = yield call(boards.addComment, action.data);

  if (res) {
    yield put(addCommentSuccessAction({ ...res, user: action.data.user }));
  } else {
    yield put(addCommentFailureAction(error));
  }
}

function* updateComment(action) {
  const { res, error } = yield call(boards.updateComment, action.data.data);

  if (res) {
    yield put(updateCommentSuccessAction({ ...res, boardId: action.data.boardId } ));
  } else {
    yield put(updateCommentFailureAction(error));
  }
}

function* deleteComment(action) {
  const { res, error } = yield call(boards.deleteCommentById, action.data.id);

  if (res) {
    yield put(deleteCommentSuccessAction(action.data));
  } else {
    yield put(deleteCommentFailureAction(error));
  }
}

function* deletePost(action) {
  const { res, error } = yield call(boards.deleteBoardById, action.data);
  
  if (!error) {
    yield put(deletePostSuccessAction({ id: action.data }));
  } else {
    yield put(deletePostFailureAction(error));
  }
}

function* changePostStatus(action) {
  const { res, error } = yield call(boards.changeBoardStatus, action.data);

  if (res) {
    yield put(changePostStatusSuccessAction(res));
  } else {
    yield put(changePostStatusFailureAction(error));
  }
}

function* updatePostHeart(action) {
  const { res, error } = yield call(boards.updatePostHeart, action.data);

  if (!error) {
    yield put(updatePostHeartSuccessAction(action.data));
  } else {
    yield put(updatePostHeartFailureAction(error));
  }
}

function* watchGetPosts() {
  yield takeLatest(GET_POSTS_REQUEST, getPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}

function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchChangePostStatus() {
  yield takeLatest(CHANGE_POST_STATUS_REQUEST, changePostStatus);
}

function* watchupdatePostHeart() {
  yield takeLatest(UPDATE_HEART_REQUEST, updatePostHeart);
}

export default function* postSaga() {
  yield all([
    fork(watchGetPosts),
    fork(watchAddPost),
    fork(watchDeletePost),
    fork(watchChangePostStatus),
    fork(watchupdatePostHeart),
    fork(watchAddComment),
    fork(watchUpdateComment),
    fork(watchDeleteComment),
  ]);
}