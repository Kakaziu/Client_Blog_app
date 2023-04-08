import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { MdMail, } from 'react-icons/md'
import { AiFillLock } from 'react-icons/ai'
import './style.css'
import api from '../../services/api'

const Register = (props) =>{

  const navigate = useNavigate()

  const [inputName, setInputName] = useState({ value: '', error: ''})
  const [inputEmail, setInputEmail] = useState({ value: '', error: ''})
  const [inputPassword, setInputPassword] = useState({ value: '', error: ''})
  const [serverError, setServerError] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()

    validate(inputName.value, setInputName, '* O campo "Nome" está vazio')
    validate(inputEmail.value, setInputEmail, '* O campo "E-mail" está vazio')
    validate(inputPassword.value, setInputPassword, '* O campo "Senha" está vazio')

    const data = {
      name: inputName.value.trim(),
      email: inputEmail.value.trim(),
      password: inputPassword.value.trim(),
      is_admin: props.admin
    }

    if(inputName.value && inputEmail.value && inputPassword.value){
      try{
        setLoading(true)
        const response = await api.post('/users', data)

        if(response.status === 200){
          setLoading(false)
          navigate('/')
        }
      }catch(e){
        setServerError(e.response.data.errors)
      }
    }
  }

  function validate(value, setFunc, message){
    if(!value){
      setFunc({ value: '', error: message })
    }
  }

  return(
    <section id='register'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Cadastre-se como {props.title}</h2>
        { serverError.length > 0 ?
          serverError.map(( err => <p key={err} className='errors-server'>{err}</p> ))
          : <></>}
        <div className='camp'>
          <label><FaUserAlt/></label>
          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setInputName({ value: e.target.value, error: '' })}
            value={inputName.value}/>
        </div>
        { inputName.error ? <span className='error-message'>{inputName.error}</span> : <></> }
        <div className='camp'>
          <label><MdMail/></label>
          <input
            type='email'
            placeholder='E-mail'
            onChange={(e) => setInputEmail({ value: e.target.value, error: '' })}
            value={inputEmail.value}></input>
        </div>
        { inputEmail.error ? <span className='error-message'>{inputEmail.error}</span> : <></> }
        <div className='camp'>
          <label><AiFillLock/></label>
          <input
            type='password'
            placeholder='Senha'
            onChange={(e) => setInputPassword({ value: e.target.value, error: '' })}
            value={inputPassword.value}></input>
        </div>
        { inputPassword.error ? <span className='error-message'>{inputPassword.error}</span> : <></> }
        <button>Cadastrar { loading ? <span><ReactLoading type='spin' width='15px' height='15px'/></span> : <></>}</button>
        <span className='message-login'>Já tem uma conta? Faça <Link to='/login'>Login</Link></span>
      </form>
    </section>
  )
}

Register.propTypes = {
  admin: PropTypes.bool,
  title: PropTypes.string
}

export default Register
