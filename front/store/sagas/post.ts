import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_POSTS_REQUEST, getPostsSuccessAction, getPostsFailureAction,
  ADD_POST_REQUEST, addPostSuccessAction, addPostFailureAction,
  ADD_COMMENT_REQUEST, addCommentSuccessAction, addCommentFailureAction,
  DELETE_POST_REQUEST, deletePostSuccessAction, deletePostFailureAction,
  CHANGE_POST_STATUS_REQUEST, changePostStatusSuccessAction, changePostStatusFailureAction, 
  CHANGE_POST_HIT_REQUEST, changePostHitSuccessAction, changePostHitFailureAction
} from '../actions/post';
import boards from '../../api/boards';

function* getPosts(action) {
  // const { res, error } = yield call(boards.getBoards, action.data);
  
  //FIXME: API params 수정 시 원복
  const { res, error } = yield call(boards.getBoards, { offset: 1, limit: 10 });

  if (res) {
    yield put(getPostsSuccessAction({ data: res, ...action.data }));
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
    yield put(addCommentSuccessAction(res));
  } else {
    yield put(addCommentFailureAction(error));
  }
}

function* deletePost(action) {
  const { res, error } = yield call(boards.deleteBoardById, action.data);

  console.log('delete: ', res);

  if (res) {
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

function* changePostHit(action) {
  const { res, error } = yield call(boards.changeBoardHit, action.data);

  if (res) {
    yield put(changePostHitSuccessAction(res));
  } else {
    yield put(changePostHitFailureAction(error));
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

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchChangePostStatus() {
  yield takeLatest(CHANGE_POST_STATUS_REQUEST, changePostStatus);
}

function* watchChangePostHit() {
  yield takeLatest(CHANGE_POST_HIT_REQUEST, changePostHit);
}

export default function* postSaga() {
  yield all([
    fork(watchGetPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchDeletePost),
    fork(watchChangePostStatus),
    fork(watchChangePostHit)
  ]);
}