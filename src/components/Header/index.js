import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Header = () =>{
  const [showLinks, setShowLinks] = useState(true)

  return(
    <header className='header'>
      <div className='container'>
        <h2>MyBlog</h2>

        <button onClick={() => setShowLinks(!showLinks)}>Login</button>
        { showLinks ? <div className={showLinks ? 'links links-show' : 'links'}>
          <Link to='/login/autor'>Login como autor</Link>
          <hr></hr>
          <Link to='/login/reader'>Login como leitor</Link>
        </div> : <></>}
      </div>
    </header>
  )
}

export default Header
