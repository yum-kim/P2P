import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { GET_POSTS_REQUEST, getPostsSuccessAction, getPostsFailureAction, ADD_POST_REQUEST, ADD_COMMENT_REQUEST, addPostSuccessAction, addPostFailureAction, addCommentSuccessAction, addCommentFailureAction } from '../actions/post';
import boards from '../../api/boards';

function* getPosts(action) {
  const { res, error } = yield call(boards.getBoards, action.data);

  if (res) {
    yield put(getPostsSuccessAction(res));
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

function* watchGetPosts() {
  yield takeLatest(GET_POSTS_REQUEST, getPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchGetPosts),
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}