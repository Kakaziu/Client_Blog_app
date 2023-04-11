import React, { useState } from 'react'  // eslint-disable-line
import './style.css'

const NewPost  = () =>{

  const [paragraphNumbers, setParagraphNumbers] = useState(0)
  const [paragraphs, setParagraphs] = useState([])

  function handleChange(e){
    const pictureImg = document.querySelector('.picture_image')
    const inputTarget = e.target
    const file = inputTarget.files[0]

    if(file){
      const reader = new FileReader()

      reader.addEventListener('load', (e) =>{
        const readerTarget = e.target

        const img = document.createElement('img')
        img.src = readerTarget.result
        img.classList.add('picture_img')
        pictureImg.innerHTML = ''
        pictureImg.appendChild(img)
      })

      reader.readAsDataURL(file)
    }else{
      pictureImg.innerHTML = 'Escolha a imagem do post'
    }
  }

  function addParagraph(e){
    e.preventDefault()

    setParagraphNumbers((state) => state + 1)
    setParagraphs([...paragraphs, ''])
  }

  function saveParagraph(e, index){
    e.preventDefault()
    const btn = e.target
    const textarea = btn.previousSibling

    const paragraphRef = paragraphs

    paragraphRef.splice(index, 1, textarea.value)

    btn.style.backgroundColor = 'rgb(93, 252, 93)'
    btn.innerText = 'Salvo'
    setParagraphs(paragraphRef)
  }

  console.log(paragraphs)

  return(
    <section id='new-post'>
      <h1>Novo post</h1>
      <form encType='multipart/form-data' className='form-post'>

        <label className='picture' htmlFor='picture_input'>
          <span className='picture_image'>
            Escolha a imagem do post
          </span>
        </label>
        <input type='file' accept='image/*' id='picture_input' onChange={handleChange}/>

        <label className='field'>
          <input type='text' placeholder='Título'/>
        </label>

        <div className='paragraphs-area'>
          { paragraphs.map((paragraph, index) =>{
            return (
              <label className='field textarea-field' key={index}>
                <textarea placeholder={`Parágrafo ${paragraphNumbers}`} data={index}></textarea>
                <button className='btn-save-para' onClick={(e) => saveParagraph(e, index)}>Salvar</button>
              </label>
            )
          })}
          <div>Adicionar parágrafo <button className='btn-add-para' onClick={addParagraph}>+</button></div>
        </div>

        <button>Postars</button>
      </form>
    </section>
  )
}

export default NewPost
