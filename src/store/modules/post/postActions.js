export const getPostsRequest = { type: 'GET_POSTS_REQUEST' }
export const getPostsSuccess = (posts) => { return { type: 'GET_POSTS_SUCCESS', payload: posts} }

export const addPostRequest = (data) => { return { type: 'ADD_POST_REQUEST', payload: data}}
export const addPostSuccess = (post) => { return { type: 'ADD_POST_SUCCESS', payload: post}}
export const addPostFailure = (error) => { return { type: 'ADD_POST_FAILURE', payload: error}}

export const deletePostRequest = (id) => { return { type: 'DELETE_POST_REQUEST', payload: id } }
export const deletePostSuccess = (id) => { return { type: 'DELETE_POST', payload: id }}

export const editPostRequest = (post, id) => { return { type: 'EDIT_POST_REQUEST', payload: { post: post, id: id } } }
export const editPostSuccess = (post) => { return { type: 'EDIT_POST_SUCCESS', payload: post }}
export const editPostFailure = (error) => { return { type: 'EDIT_POST_FAILURE', payload: error } }
