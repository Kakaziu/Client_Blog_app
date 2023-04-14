import React, { useEffect } from 'react'
import Header from '../../components/Header'
import FeaturedPost from '../../components/FeaturedPost'
import Posts from '../../components/Posts'
import { getPostsRequest } from '../../store/modules/post/postActions'
import { useDispatch, useSelector } from 'react-redux'


const Home = () =>{

  const dispatch = useDispatch()
  const postsState = useSelector(state => state.PostReducer)
  const { posts } = postsState

  useEffect(() =>{
    dispatch(getPostsRequest)
  }, [])

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

    return `Postado a ${actualDay - creationDay} dias atrás`
  }

  function formatDescription(description){
    if(description.length > 300){
      const resumeDescription = description.slice(0, 300)

      return resumeDescription + '...'
    }

    return description
  }

  return(
    <section id="home">
      <Header/>
      <FeaturedPost formatDate={formatDate} formatDescription={formatDescription} posts={posts}/>
      <Posts formatDate={formatDate} formatDescription={formatDescription} posts={posts}/>
    </section>
  )
}

export default Home
