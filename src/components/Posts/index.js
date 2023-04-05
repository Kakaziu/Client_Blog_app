import React from 'react'
import './style.css'

const Posts = () =>{
  return(
    <div className="posts">
      <div className='post'>
        <img src='./assets/img/gabigol.jpg'/>
        <div className='post-content'>
          <div>
            <h2>Gabigol revela conversa com Vitor Pereira</h2>
            <span>De 1 dia atrás</span>
          </div>
          <p>Em uma entrevista coletiva antes do jogo do Flamengo contra o Bangu,
            válido pelo Campeonato Carioca, Gabigol falou sobre a sua preferência
            em atuar como um centroavante fixo, posicionado dentro da área adversária.
            O atacante afirmou que se sente mais à vontade nessa posição e que tem conseguido
            ter um bom desempenho jogando assim...</p>
        </div>
      </div>
      <div className='post'>
        <img src='./assets/img/gabigol.jpg'/>
        <div className='post-content'>
          <div>
            <h2>Gabigol revela conversa com Vitor Pereira</h2>
            <span>De 1 dia atrás</span>
          </div>
          <p>Em uma entrevista coletiva antes do jogo do Flamengo contra o Bangu,
            válido pelo Campeonato Carioca, Gabigol falou sobre a sua preferência
            em atuar como um centroavante fixo, posicionado dentro da área adversária.
            O atacante afirmou que se sente mais à vontade nessa posição e que tem conseguido
            ter um bom desempenho jogando assim...</p>
        </div>
      </div>
    </div>
  )
}

export default Posts
