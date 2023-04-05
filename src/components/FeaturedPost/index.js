import React from 'react'
import './style.css'

const FeaturedPost = () =>{
  return(
    <>
      <div className="featured-post">
        <img src='./assets/img/23118_0.jpg'/>
        <div className='content-featured-post'>
          <div>
            <h1>Javascript e suas atualizações</h1>
            <span>De 2 dias atrás</span>
          </div>

          <p>O JavaScript é uma das linguagens de programação mais populares do mundo,
          utilizada por desenvolvedores em todo o mundo para criar aplicativos web
          interativos e dinâmicos. Com o tempo, o JavaScript evoluiu bastante, e suas
          atualizações mais recentes trazem novas funcionalidades e melhorias para a
          linguagem... <br></br><br></br></p>
        </div>
      </div>
      <hr className='line-post'></hr>
    </>
  )
}

export default FeaturedPost
