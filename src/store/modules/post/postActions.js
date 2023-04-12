export const addPostRequest = (data) => { return { type: 'ADD_POST_REQUEST', payload: data}}
export const addPostSuccess = (post) => { return { type: 'ADD_POST_SUCCESS', payload: post}}
export const addPostFailure = (error) => { return { type: 'ADD_POST_FAILURE', payload: error}}
