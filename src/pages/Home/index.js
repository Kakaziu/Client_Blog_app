import React from 'react'
import Header from '../../components/Header'
import FeaturedPost from '../../components/FeaturedPost'
import Posts from '../../components/Posts'
import { Link } from 'react-router-dom'

const Home = () =>{
  return(
    <section id="home">
      <Header/>
      <FeaturedPost/>
      <Posts/>
      <Link to='/panel'>oi</Link>
    </section>
  )
}

export default Home
