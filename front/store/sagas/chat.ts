import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import chat from '../../api/chat';
import {
  getChatListRequest, getChatListSuccess, getChatListFailure,
  getChatDetailRequest, getChatDetailSuccess, getChatDetailFailure,
  createChatRequest, createChatSuccess, createChatFailure,
} from '../slices/chat';

function* getChatList() {
  const { res, error } = yield call(chat.getChatList);

  if (res) {
    yield put(getChatListSuccess(res));
  } else {
    yield put(getChatListFailure(error));
  }
}

function* getChatDetail(action) {
  const { res, error } = yield call(chat.getChatDetail, action.payload);

  if (res) {
    yield put(getChatDetailSuccess({ chats: res, cursor: action.payload.cursor }));
  } else {
    yield put(getChatDetailFailure(error));
  }
}

function* createChat(action) {
  const { res, error } = yield call(chat.createChat, action.payload);

  if (res) {
    yield put(createChatSuccess(res));
  } else {
    yield put(createChatFailure(error));
  }
}

function* watchGetChatList() {
  yield takeLatest(getChatListRequest.type, getChatList);
}

function* watchGetChatDetail() {
  yield takeLatest(getChatDetailRequest.type, getChatDetail);
}

function* watchCreateChat() {
  yield takeLatest(createChatRequest.type, createChat);
}

export default function* chatSaga() {
  yield all([
    fork(watchGetChatList),
    fork(watchGetChatDetail),
    fork(watchCreateChat),
  ]);
}