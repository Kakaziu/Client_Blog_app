import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsRequest, deletePostRequest } from '../../store/modules/post/postActions'
import { useNavigate } from 'react-router-dom'

const PostsAuthor = () =>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { posts } = useSelector(state => state.PostReducer)
  const { user } = useSelector(state => state.UserReducer)
  const [postsLoader, setPostsLoader] = useState(false)
  const [postsUser, setPostsUser] = useState([])

  useEffect(() =>{
    dispatch(getPostsRequest)
  }, [posts])

  useEffect(() =>{
    if(posts.length > 0){
      setPostsLoader(true)

      const filteredPosts = posts.filter(post => post.create_by === user.id)
      setPostsUser(filteredPosts)
    }
  }, [posts])

  function formatTitle(title){

    if(title.length > 15){
      let arrayTitle = title.split(' ')

      return arrayTitle[0] + ' ' + arrayTitle[1] + '...'
    }

    return title
  }

  return(
    <>
      <h1 className='title-author'>Seus posts</h1>
      <div className='posts-author'>
        { postsLoader && postsUser.map(post =>{
          return(
            <div className='post-author' key={post.id}>
              <img src={post.photo_post_url}/>
              <h3>{formatTitle(post.title)}</h3>
              <div className='icon-actions'>
                <AiFillEdit size='22' className='icon-post icon-edit' onClick={() => navigate(`/post/${post.id}`)}/>
                <AiFillDelete size='22' className='icon-post icon-delete' cursor='pointer' onClick={() => dispatch(deletePostRequest(post.id))}/>
              </div>
            </div>
          )
        })}
      </div></>
  )
}

export default PostsAuthor
