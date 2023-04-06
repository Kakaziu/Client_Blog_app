import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/modules/user/userAction'

const Header = () =>{
  const [showLinks, setShowLinks] = useState(false)
  const user = useSelector(state => state)
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logout)
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return(
    <header className='header'>
      <div className='container'>
        <h2>MyBlog</h2>

        { !user.user ?
          <button onClick={() => setShowLinks(!showLinks)}>Cadastre-se</button> :
          <button onClick={handleLogout}>Logout</button>
        }
        { showLinks ? <div className={showLinks ? 'links links-show' : 'links'}>
          <Link to='/register/reader'>Cadastre-se como leitor</Link>
          <hr></hr>
          <Link to='/register/author'>Cadastre-se como autor</Link>
        </div> : <></>}
      </div>
    </header>
  )
}

export default Header
