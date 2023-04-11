import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GoKebabVertical } from 'react-icons/go'
import './style.css'
import { logout } from '../../store/modules/user/userAction'


const HeaderAuthor = () =>{

  const { user } = useSelector(user => user)
  const [showNavDiv, setShowNavDiv] = useState(false)
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logout)
    localStorage.removeItem('token')
    window.location.href = '/'
  }


  return(
    <header className="header">
      <div className="container">
        <h2>MyBlogPanel</h2>

        <div className='panel-nav'>
          <span>Olá, {user.name}</span>
          <button onClick={() => setShowNavDiv(!showNavDiv)}><GoKebabVertical size='22'/></button>
        </div>
      </div>

      { showNavDiv
        ?  <div className={ showNavDiv ? 'actions actions-show' : 'actions'}>
          <span>Posts feitos: 0</span>
          <hr></hr>
          <Link to="/post">Criar novo post</Link>
          <hr></hr>
          <button onClick={handleLogout}>Logout</button>
        </div>
        :
        <></>
      }
    </header>
  )
}

export default HeaderAuthor
