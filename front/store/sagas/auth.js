import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import auth from '../../api/auth';
import { LOG_IN_REQUEST, loginFailureAction, loginSuccessAction } from '../actions/auth';

function* login(action) {
  const { res, error } = yield call(auth.login, action.data);

  if (res) {
    yield put(loginSuccessAction(res));
  } else {
    yield put(loginFailureAction(error));
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin)
  ]);
}