import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiiddleWare from 'redux-saga';
import authReducer from './slices/auth';
import postReducer from './slices/post';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiiddleWare();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;