import React from 'react'
import './style.css'
import HeaderAuthor from '../../components/HeaderAuthor'
import PostsAuthor from '../../components/PostsAuthor'

const Author = () =>{
  return(
    <section id="author">
      <HeaderAuthor/>
      <PostsAuthor/>
    </section>
  )
}

export default Author
