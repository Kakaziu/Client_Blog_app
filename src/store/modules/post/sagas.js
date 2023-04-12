import { all, call, takeLatest, put } from 'redux-saga/effects'
import {toast} from 'react-toastify'
import api from '../../../services/api'
import { addPostSuccess, addPostFailure } from './postActions'

function* addPost(data){
  try{
    const response = yield call(api.post, '/posts', data.payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log(response.data)
    yield put(addPostSuccess(response.data))
  }catch(e){
    console.log(e)
    e.response.data.errors.map(err => toast.error(err))
    yield put(addPostFailure(e.response.data.errors))
  }
}

export default all([
  takeLatest('ADD_POST_REQUEST', addPost)
])
