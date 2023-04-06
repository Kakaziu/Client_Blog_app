import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './modules/rootSaga'

import UserReducer from './modules/user/userReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(UserReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
