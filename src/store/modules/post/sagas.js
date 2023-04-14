import { all, call, takeLatest, put } from 'redux-saga/effects'
import {toast} from 'react-toastify'
import api from '../../../services/api'
import { addPostSuccess,
  addPostFailure,
  getPostsSuccess,
  deletePostSuccess,
  editPostSuccess,
  editPostFailure
} from './postActions'

function* getPosts(){
  try{
    const response = yield call(api.get, '/posts')

    yield put(getPostsSuccess(response.data))
  }catch(e){
    toast.error('Não foi possível pegar os posts')
  }
}

function* addPost(data){
  try{
    const response = yield call(api.post, '/posts', data.payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })


    yield put(addPostSuccess(response.data))
  }catch(e){
    console.log(e)
    e.response.data.errors.map(err => toast.error(err))
    yield put(addPostFailure(e.response.data.errors))
  }
}

function* deletePost({ payload }){
  try{
    const response = yield call(api.delete, `/posts/${payload}`)

    toast.success(response.data.msg)
    yield put(deletePostSuccess(response.data.msg))
  }catch(e){
    yield toast.error('Não foi possível apagar o post.')
  }
}

function* editPost({ payload }){
  try{
    yield call(api.put, `/posts/${payload.id}`, payload.post, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    toast.success('Post editado.')
    yield put(editPostSuccess())
  }catch(e){
    yield put(editPostFailure(e.response.data.errors))
  }
}

export default all([
  takeLatest('ADD_POST_REQUEST', addPost),
  takeLatest('GET_POSTS_REQUEST', getPosts),
  takeLatest('DELETE_POST_REQUEST', deletePost),
  takeLatest('EDIT_POST_REQUEST', editPost)
])
