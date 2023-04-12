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

  function formatDescription(description){
    if(description.length > 200){
      description.slice(200)

      return description + '...'
    }
  }

  function formatDate(date){
    const data = new Date() //eslint-disable-line
    const actualYear = data.getFullYear()
    const actualMonth = data.getMonth() + 1
    const actualDay = data.getDate()

    const creationYear = Number(date.slice(0, 4))
    const creationMonth = Number(date.slice(5, 7))
    const creationDay = Number(date.slice(8, 10))

    if(actualYear !== creationYear){
      return `a ${actualYear - creationYear} anos atrás`
    }

    if(actualMonth !== creationMonth){
      return `a ${actualMonth - creationMonth} meses atrás`
    }



    return `a ${actualDay - creationDay} dias atrás`
  }

  console.log(formatDate('2023-04-12T02:00:59.000Z'))

  return(
    <>
      {postsLoader && (
        <div className="featured-post">
          <img src={randomPost.photo_post_url} />
          <div className="content-featured-post">
            <div>
              <h1>{randomPost.title}</h1>
              <span>{formatDate(randomPost.created_at)}</span>
            </div>

            <p>{formatDescription(randomPost.description)}</p>
          </div>
        </div>
      )}
      <hr className="line-post" />
    </>
  )
}

export default FeaturedPost
