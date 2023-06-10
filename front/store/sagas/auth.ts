import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import auth from '../../api/auth';
import { LOG_IN_REQUEST, loginFailureAction, loginSuccessAction, SIGN_UP_REQUEST, signupSuccessAction, signupFailureAction, signupInitAction } from '../actions/auth';

function* login(action) {
  const { res, error } = yield call(auth.login, action.data);

  if (res) {
    yield put(loginSuccessAction(res));
  } else {
    yield put(loginFailureAction(error));
  }
}


function* signup(action) {
  const { res, error } = yield call(auth.signup, action.data);

  if (res) {
    yield put(signupSuccessAction(res));
  } else {
    yield put(signupFailureAction(error));
  }
  
  yield put(signupInitAction());
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
  ]);
}