import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.css'

const FeaturedPost = (props) =>{

  const [randomPost, setRandomPost] = useState({})
  const [postsLoader, setPostsLoader] = useState(false)
  const { posts } = props

  console.log(posts)

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
        <Link to={`/read/${randomPost.id}`} className='link-featured-post'>
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
        </Link>
      )}
      <hr className="line-post" />
    </>
  )
}


FeaturedPost.propTypes = {
  formatDate: PropTypes.func,
  formatDescription: PropTypes.func,
  posts: PropTypes.array
}

export default FeaturedPost
