const initialState = {
  posts: [],
  error: null,
  loading: false
}

export default function PostReducer(state = initialState, action){
  switch(action.type){
  case 'GET_POSTS_REQUEST':
    return state = { posts: state.posts, error: null, loading: true }
  case 'GET_POSTS_SUCCESS':
    return state = { posts: action.payload, error: null, loading: false }
  case 'ADD_POST_REQUEST':
    return state = { posts: state.posts, error: null, loading: true }
  case 'ADD_POST_SUCCESS':
    return state = { posts: [...state.posts, action.payload], error: null, loading: false }
  case 'ADD_POST_FAILURE':
    return state = { posts: state.posts, error: action.payload, loading: false }
  default:
    return state
  }
}
