import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './modules/rootSaga'

import UserReducer from './modules/user/userReducer'
import PostReducer from './modules/post/postReducer'

const persistConfig = {
  key: 'root',
  storage
}

const sagaMiddleware = createSagaMiddleware()

const allReducers = combineReducers({
  UserReducer,
  PostReducer
})

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
