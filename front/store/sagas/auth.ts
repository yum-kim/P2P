import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import auth from '../../api/auth';
import {
  logInRequest, logInSuccess, logInFailure,
  signUpRequest, signUpSuccess, signUpFailure, signUpInit,
  updateUserRequest, updateUserSuccess, updateUserFailure,
  deleteProfileImgSuccess, deleteProfileImgFailure, deleteProfileImgRequest, removeAccountRequest, removeAccountSuccess, removeAccountFailure
} from '../slices/auth';

function* login(action) {
  const { res, error } = yield call(auth.login, action.payload);

  if (res) {
    yield put(logInSuccess(res));
  } else {
    yield put(logInFailure(error));
  }
}

function* signup(action) {
  const { res, error } = yield call(auth.signup, action.payload);

  if (res) {
    yield put(signUpSuccess(res));
  } else {
    yield put(signUpFailure(error));
  }
  
  // yield put(signUpInit());
}

function* updateUser(action) {
  const { res, error } = yield call(auth.updateUserInfo, action.payload);

  if (res) {
    yield put(updateUserSuccess(res));
  } else {
    yield put(updateUserFailure(error));
  }
}

function* deleteProfileImg(action) {
  const { error } = yield call(auth.deleteProfileImg);

  if (!error) {
    yield put(deleteProfileImgSuccess());
  } else {
    yield put(deleteProfileImgFailure(error));
  }
}

function* removeAccount(action) {
  const { error } = yield call(auth.removeAccount);

  if (!error) {
    yield put(removeAccountSuccess());
  } else {
    yield put(removeAccountFailure(error));
  }
}

function* watchLogin() {
  yield takeLatest(logInRequest.type, login);
}

function* watchSignup() {
  yield takeLatest(signUpRequest.type, signup);
}

function* watchUpdateUser() {
  yield takeLatest(updateUserRequest.type, updateUser);
}

function* watchDeleteProfileImg() {
  yield takeLatest(deleteProfileImgRequest.type, deleteProfileImg);
}

function* watchRemoveAccount() {
  yield takeLatest(removeAccountRequest.type, removeAccount);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchUpdateUser),
    fork(watchDeleteProfileImg),
    fork(watchRemoveAccount),
  ]);
}