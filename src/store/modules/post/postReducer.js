const initialState = {
  post: null,
  error: null,
  loading: false
}

export default function postReducer(state = initialState, action){
  switch(action.type){
  case 'ADD_POST_REQUEST':
    return state = { post: null, error: null, loading: true }
  case 'ADD_POST_SUCCESS':
    return state = { post: action.payload, error: null, loading: false }
  case 'ADD_POST_FAILURE':
    return state = { post: null, error: action.payload, loading: false }
  default:
    return state
  }
}
