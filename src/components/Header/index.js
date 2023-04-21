import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/modules/user/userAction'

const Header = (props) =>{
  const [showLinks, setShowLinks] = useState(false)
  const { user } = useSelector(state => state.UserReducer)
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logout)
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if(props.isReader){
    return (
      <header className='header' style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.4)'}}>
        <div className='container'>
          <h2>MyBlog</h2>

          <Link to='/' style={{ fontWeight: 'bold' }}>Home</Link>
        </div>
      </header>
    )
  }

  return(
    <header className='header'>
      <div className='container'>
        <h2>MyBlog</h2>
        <nav className='nav-desktop'>
          { !user ?
            <div className='menu'>
              <button onClick={() => setShowLinks(!showLinks)}>Cadastre-se</button>
            </div> :
            <div className='menu'>
              <span>Olá, {user.name}</span>
              <hr></hr>
              { user.is_admin ? <Link to='/panel'>Ir para o painel</Link> : ''}
              <button onClick={handleLogout}>Logout</button>
            </div>
          }
          { showLinks ? <div className={showLinks ? 'links links-show menu' : 'links menu'}>
            <Link to='/register/reader'>Cadastre-se como leitor</Link>
            <hr></hr>
            <Link to='/register/author'>Cadastre-se como autor</Link>
            <hr></hr>
            <Link to='/login'>Login</Link>
          </div> : <></>}
        </nav>
        <nav className='nav-mobile'>
          <AiOutlineMenu className='menu-mobile-btn' size='30' onClick={() => setShowMenuMobile(!showMenuMobile)}/>
          { !user ?
            <div className={ showMenuMobile ? 'menu menuOn menu-no-user-mobile' : 'none' }>
              <Link to='/register/reader'>Cadastre-se como leitor</Link>
              <hr></hr>
              <Link to='/register/author'>Cadastre-se como autor</Link>
              <hr></hr>
              <Link to='/login'>Login</Link>
            </div> :
            <div className={ showMenuMobile ? 'menu menuOn' : 'none' }>
              <span>Olá, {user.name}</span>
              <hr></hr>
              { user.is_admin ? <Link to='/panel'>Ir para o painel</Link> : ''}
              <button onClick={handleLogout}>Logout</button>
            </div>
          }

        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  isReader: PropTypes.bool
}

export default Header
