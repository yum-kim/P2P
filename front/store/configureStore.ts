import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiiddleWare from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas/index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiiddleWare();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV == 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development'
});

export default wrapper;