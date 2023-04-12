import React, { useEffect, useState } from 'react'  // eslint-disable-line
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'// eslint-disable-line
import './style.css'
import { addPostRequest } from '../../store/modules/post/postActions' // eslint-disable-line

const NewPost  = () =>{

  const dispatch = useDispatch() // eslint-disable-line

  const [paragraphs, setParagraphs] = useState([])
  const [ title, setTitle ] = useState('') // eslint-disable-line
  const [description, setDescription] = useState('') // eslint-disable-line
  const [photoFile, setPhotoFile] = useState('')
  const [isFinish, setIsFinish] = useState(false)

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
        setPhotoFile(file)
      })

      reader.readAsDataURL(file)
    }else{
      pictureImg.innerHTML = 'Escolha a imagem do post'
      setPhotoFile(false)
    }
  }

  function addParagraph(e){
    e.preventDefault()

    setParagraphs([...paragraphs, { content: '', saved: false }])
  }

  function saveParagraph(e, index){

    if(isFinish){
      toast.warn('Os parágrafos foram finalizados.')
      return
    }

    e.preventDefault()
    const btn = e.target
    const textarea = btn.previousSibling

    const paragraphRef = [...paragraphs]

    paragraphRef.splice(index, 1, { content: textarea.value.trim(), saved: true })

    setParagraphs(paragraphRef)
  }

  function editParagraph(e, index){

    if(isFinish){
      toast.warn('Os parágrafos foram finalizados.')
      return
    }

    e.preventDefault()

    const paragraphRef = [...paragraphs]

    const paragraph = paragraphRef.filter((paragraph, id) => id === index)
    const content = paragraph.content

    paragraphRef.splice(index, 1, { content: content, saved: false })

    setParagraphs(paragraphRef)
  }

  function deleteParagraph(e, index){
    if(isFinish){
      toast.warn('Os parágrafos foram finalizados.')
      return
    }

    e.preventDefault()

    const paragraphRef = [...paragraphs]

    paragraphRef.splice(index, 1)

    setParagraphs(paragraphRef)
  }

  function endPara(e){
    e.preventDefault()

    if(paragraphs.length === 0){
      toast.warn('Sua postagem não tem parágrafos.')
      return
    }

    let paragraphsContent = paragraphs.map(paragraph =>{
      return paragraph.content
    })
    const joinedParagraphs = paragraphsContent.join('///')

    setDescription(joinedParagraphs)
    setIsFinish(!isFinish)
  }

  async function handleSubmit(e){
    e.preventDefault()

    if(!photoFile){
      toast.warn('O seu post não possui imagem')
    }

    if(!title){
      toast.warn('O campo "Título" está vazio.')
    }

    if(!description){
      toast.warn('Seu post não tem parágrafos.')
    }


    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('photo_post_url', photoFile)

    if(photoFile && title && description){
      dispatch(addPostRequest(formData))
    }
  }

  return(
    <section id='new-post'>
      <h1>Novo post</h1>
      <form
        encType='multipart/form-data'
        className='form-post'
        onSubmit={handleSubmit}>

        <label className='picture' htmlFor='picture_input'>
          <span className='picture_image'>
            Escolha a imagem do post
          </span>
        </label>
        <input
          type='file'
          accept='image/*'
          id='picture_input'
          onChange={handleChange}
          name='photo_post_url'/>

        <label className='field'>
          <input
            type='text'
            placeholder='Título'
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <div className='paragraphs-area'>
          { paragraphs.map((paragraph, index) =>{
            return (
              <label className='field textarea-field' key={index}>
                <textarea
                  placeholder={`Parágrafo ${index + 1}`}
                  disabled={ paragraph.saved ? true : false}
                  className={ paragraph.saved ? 'textarea textarea-saved' : 'textarea'}
                ></textarea>
                <button
                  className={ paragraph.saved ? 'btn-action btn-saved' : 'btn-action btn-not-saved'}
                  onClick={!paragraph.saved ? (e) => saveParagraph(e, index) : (e) => editParagraph(e, index)}>{ paragraph.saved ? 'Salvo' : 'Salvar'}
                </button>
                <button
                  className={ paragraph.saved ? 'btn-action btn-remove-para' : 'none'}
                  onClick={(e) => deleteParagraph(e, index)}
                >Apagar</button>
              </label>
            )
          })}
          <div>
            <button className={isFinish ? 'btn-para-finish' : 'btn-para'} onClick={addParagraph}>Adicionar parágrafo</button>
            <button className='btn-para' onClick={endPara}>{ isFinish ? 'Voltar' : 'Finalizar'}</button>
          </div>
          <input
            type='hidden'
            value={description}
            name='description'
          />
        </div>

        <button className='submit-btn'>Postar</button>
      </form>
    </section>
  )
}

export default NewPost
