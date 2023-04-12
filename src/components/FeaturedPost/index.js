import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'

const FeaturedPost = (props) =>{

  const [randomPost, setRandomPost] = useState({})
  const [postsLoader, setPostsLoader] = useState(false)
  const { posts } = props

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
              <span>{props.formatDate(randomPost.created_at)}</span>
            </div>

            <p>{props.formatDescription(randomPost.description)}</p>
          </div>
        </div>
      )}
      <hr className="line-post" />
    </>
  )
}


FeaturedPost.PropTypes = {
  formatDate: PropTypes.string,
  formatDescription: PropTypes.string,
  posts: PropTypes.object
}

export default FeaturedPost
