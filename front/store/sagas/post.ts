import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import boards from '../../api/boards';
import { getPostsSuccess, getPostsFailure, addPostSuccess, addPostFailure, updatePostSuccess, updatePostFailure, deletePostSuccess, deletePostFailure, addCommentSuccess, addCommentFailure, updateCommentSuccess, updateCommentFailure, deleteCommentSuccess, deleteCommentFailure, changePostStatusSuccess, changePostStatusFailure, updatePostHeartSuccess, getPostsRequest, addPostRequest, updatePostRequest, addCommentRequest, updateCommentRequest, deleteCommentRequest, deletePostRequest, changePostStatusRequest, updatePostHeartRequest, updatePostHeartFailure } from '../slices/post';

function* getPosts(action) {
  const { res, error } = yield call(boards.getBoards, action.payload);

  if (res) {
    yield put(getPostsSuccess({ posts: res, cursor: action.payload.cursor }));
  } else {
    yield put(getPostsFailure(error));
  }
}

function* addPost(action) {
  const { res, error } = yield call(boards.createBoard, action.payload.formData);

  if (res) {
    //TODO: image 결과값도 추가하기
    yield put(addPostSuccess({ ...res, user: action.payload.user, comment: [] }));
  } else {
    yield put(addPostFailure(error));
  }
}

function* updatePost(action) {
  const { res, error } = yield call(boards.updateBoard, action.payload);

  if (res) {
    yield put(updatePostSuccess(res));
  } else {
    yield put(updatePostFailure(error));
  }
}

function* deletePost(action) {
  const { res, error } = yield call(boards.deleteBoardById, action.payload);
  
  if (!error) {
    yield put(deletePostSuccess({ id: action.payload }));
  } else {
    yield put(deletePostFailure(error));
  }
}

function* addComment(action) {
  const { res, error } = yield call(boards.addComment, action.payload);

  if (res) {
    yield put(addCommentSuccess({ ...res, user: action.payload.user }));
  } else {
    yield put(addCommentFailure(error));
  }
}

function* updateComment(action) {
  const { res, error } = yield call(boards.updateComment, action.payload.data);

  if (res) {
    yield put(updateCommentSuccess({ ...res, boardId: action.payload.boardId } ));
  } else {
    yield put(updateCommentFailure(error));
  }
}

function* deleteComment(action) {
  const { res, error } = yield call(boards.deleteCommentById, action.payload.id);

  if (res) {
    yield put(deleteCommentSuccess(action.payload));
  } else {
    yield put(deleteCommentFailure(error));
  }
}

function* changePostStatus(action) {
  const { res, error } = yield call(boards.changeBoardStatus, action.payload);

  if (res) {
    yield put(changePostStatusSuccess(res));
  } else {
    yield put(changePostStatusFailure(error));
  }
}

function* updatePostHeart(action) {
  const { res, error } = yield call(boards.updatePostHeart, action.payload);

  if (!error) {
    yield put(updatePostHeartSuccess(action.payload));
  } else {
    yield put(updatePostHeartFailure(error));
  }
}

function* watchGetPosts() {
  yield takeLatest(getPostsRequest.type, getPosts);
}

function* watchAddPost() {
  yield takeLatest(addPostRequest.type, addPost);
}

function* watchUpdatePost() {
  yield takeLatest(updatePostRequest.type, updatePost);
}

function* watchAddComment() {
  yield takeLatest(addCommentRequest.type, addComment);
}

function* watchUpdateComment() {
  yield takeLatest(updateCommentRequest.type, updateComment);
}

function* watchDeleteComment() {
  yield takeLatest(deleteCommentRequest.type, deleteComment);
}

function* watchDeletePost() {
  yield takeLatest(deletePostRequest.type, deletePost);
}

function* watchChangePostStatus() {
  yield takeLatest(changePostStatusRequest.type, changePostStatus);
}

function* watchupdatePostHeart() {
  yield takeLatest(updatePostHeartRequest.type, updatePostHeart);
}

export default function* postSaga() {
  yield all([
    fork(watchGetPosts),
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchDeletePost),
    fork(watchChangePostStatus),
    fork(watchupdatePostHeart),
    fork(watchAddComment),
    fork(watchUpdateComment),
    fork(watchDeleteComment),
  ]);
}