import { all, call, takeLatest, put } from 'redux-saga/effects'
import api from '../../../services/api'
import { loginSuccess, loginFailure } from './userAction'

function* login(data){
  try{
    const response = yield call(api.post, '/tokens', data.payload)
    localStorage.setItem('token', response.data.token)
    api.defaults.headers.common['authorization'] = response.data.token

    yield put(loginSuccess(response.data.user))
  }catch(e){
    yield put(loginFailure(e.response.data.errors))
  }
}

export default all([
  takeLatest('LOGIN_REQUEST', login)
])
