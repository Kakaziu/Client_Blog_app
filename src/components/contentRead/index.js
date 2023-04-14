import React from 'react'
import './style.css'

function ContentRead(){
  return(
    <div className="content-read">
      <h1>Gabigol</h1>
      <span><p>Autor: Kauã Borba</p>  <p>02/02/2023</p></span>
      <img src='http://localhost:3333/images/1681431249542.jpg'/>
      <div className='paragraphs-read'>
        <p>
          Gabriel Barbosa Almeida, mais conhecido como Gabigol, é um jogador de futebol brasileiro nascido
          em São Bernardo do Campo, São Paulo, em 30 de agosto de 1996. Ele é atualmente um dos principais
          jogadores do Flamengo e da seleção brasileira.
        </p>
        <p>
          Gabigol iniciou sua carreira no Santos, clube em que foi revelado e onde jogou de 2013 a 2016.
          Durante sua passagem pelo clube paulista, ele conquistou o Campeonato Paulista de 2015 e foi o
          artilheiro do Brasileirão de 2018.
        </p>
        <p>
        Em 2016, Gabigol foi vendido para a Inter de Milão, da Itália, mas não teve uma boa passagem pelo
        clube europeu, sendo emprestado para o Benfica, de Portugal, e para o Santos novamente. Em 2019,
        ele foi emprestado ao Flamengo e teve um desempenho excepcional, conquistando a torcida rubro-negra
        e se tornando um dos maiores ídolos da história recente do clube.
        </p>
      </div>
    </div>
  )
}

export default ContentRead
