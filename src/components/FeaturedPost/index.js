import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsRequest } from '../../store/modules/post/postActions'

const FeaturedPost = () =>{

  const dispatch = useDispatch()
  const postsState = useSelector(state => state.PostReducer)
  const { posts } = postsState
  const [randomPost, setRandomPost] = useState({})
  const [postsLoader, setPostsLoader] = useState(false)

  useEffect(() =>{
    dispatch(getPostsRequest)
  }, [])

  useEffect(() =>{
    if(posts.length > 0){
      setPostsLoader(true)
      setRandomPost(getRandomPost(posts))
    }
  }, [posts])

  function getRandomPost(posts){
    const random = Math.floor(Math.random() * posts.length)

    return posts[random]
  }

  return(
    <>
      {postsLoader && (
        <div className="featured-post">
          <img src={randomPost.photo_post_url} />
          <div className="content-featured-post">
            <div>
              <h1>{randomPost.title}</h1>
              <span>De 2 dias atrás</span>
            </div>

            <p>{randomPost.description}</p>
          </div>
        </div>
      )}
      <hr className="line-post" />
    </>
  )
}

export default FeaturedPost
