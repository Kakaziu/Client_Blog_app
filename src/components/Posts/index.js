import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.css'

const Posts = (props) =>{

  const { posts } = props
  const [postsLoader, setPostsLoader] = useState(false)

  useEffect(() =>{
    if(posts.length > 0){
      setPostsLoader(true)
    }
  }, [posts])

  return(
    <div className="posts">
      { postsLoader ? posts.map((post) =>{
        return (
          <Link key={post.id} to={`/read/${post.id}`}>
            <div className='post' key={post.id}>
              <img src={post.photo_post_url}/>
              <div className='post-content'>
                <div>
                  <h2>{post.title}</h2>
                  <span>{props.formatDate(post.created_at)}</span>
                </div>
                <p>{props.formatDescription(post.description)}</p>
              </div>
            </div>
          </Link>
        )
      }) : ''}
    </div>
  )
}

Posts.propTypes = {
  formatDate: PropTypes.func,
  formatDescription: PropTypes.func,
  posts: PropTypes.array
}

export default Posts
