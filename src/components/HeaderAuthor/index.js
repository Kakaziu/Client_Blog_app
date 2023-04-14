import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GoKebabVertical } from 'react-icons/go'
import './style.css'
import { logout } from '../../store/modules/user/userAction'


const HeaderAuthor = () =>{

  const { user } = useSelector(state => state.UserReducer)
  const { posts } = useSelector(state => state.PostReducer)
  const [postsLoader, setPostsLoader] = useState(false)
  const [postsUser, setPostsUser] = useState([])
  const [showNavDiv, setShowNavDiv] = useState(false)
  const dispatch = useDispatch()

  useEffect(() =>{
    if(posts.length > 0){
      setPostsLoader(true)

      const filteredPosts = posts.filter(post => post.create_by === user.id)
      setPostsUser(filteredPosts)
    }
  }, [posts])

  function handleLogout(){
    dispatch(logout)
    localStorage.removeItem('token')
    window.location.href = '/'
  }


  return(
    <header className="header-author">
      <div className="container">
        <h2>MyBlogPanel</h2>

        <div className='panel-nav'>
          <span>Olá, {user.name}</span>
          <button onClick={() => setShowNavDiv(!showNavDiv)}><GoKebabVertical size='25'/></button>
        </div>
      </div>

      { showNavDiv
        ?  <div className={ showNavDiv ? 'actions actions-show' : 'actions'}>
          <span>{ postsLoader && `Posts Feitos: ${postsUser.length}` }</span>
          <hr></hr>
          <Link to="/post">Criar novo post</Link>
          <hr></hr>
          <Link to='/'>Voltar para Home</Link>
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
