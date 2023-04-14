import React from 'react'
import './style.css'
import Header from '../../components/Header'
import ContentRead from '../../components/contentRead'

function ViewPost(){
  return(
    <section id="read-pag">
      <Header isReader={true}/>
      <ContentRead/>
    </section>
  )
}

export default ViewPost
