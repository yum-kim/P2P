import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import postSaga from './post';
import chatSaga from './chat';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(chatSaga),
    ])
}