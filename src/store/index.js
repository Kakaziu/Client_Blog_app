import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './modules/rootSaga'

import UserReducer from './modules/user/userReducer'
import PostReducer from './modules/post/postReducer'

const sagaMiddleware = createSagaMiddleware()

const allReducers = combineReducers({
  UserReducer,
  PostReducer
})
const store = createStore(allReducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
