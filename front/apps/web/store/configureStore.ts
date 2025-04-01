import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiiddleWare from 'redux-saga';
import authReducer from './slices/auth';
import postReducer from './slices/post';
import chatReducer from './slices/chat';
import socketReducer from './slices/socket';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiiddleWare();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        chat: chatReducer,
        socket: socketReducer,
    },
    middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;