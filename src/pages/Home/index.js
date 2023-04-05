import React from 'react'
import Header from '../../components/Header'
import FeaturedPost from '../../components/FeaturedPost'
import Posts from '../../components/Posts'

const Home = () =>{
  return(
    <section id="home">
      <Header/>
      <FeaturedPost/>
      <Posts/>
    </section>
  )
}

export default Home
