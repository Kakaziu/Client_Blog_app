import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Home from './pages/Home'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import { store, persistor } from './store'
import Author from './pages/Author'
import Auth from './components/Auth'
import NewPost from './pages/NewPost'
import ViewPost from './pages/ViewPost'
import api from './services/api'

const App = () =>{

  useEffect(() =>{
    const token = localStorage.getItem('token')

    if(token){
      api.defaults.headers.common['authorization'] = token
    }
  }, [])

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/register/reader' element={<Register admin={false} title='Leitor'/>}/>
              <Route path='/register/author' element={<Register admin={true} title='Autor'/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/read/:id' element={<ViewPost/>}/>
              <Route path='/panel' element={<Auth><Author/></Auth>}/>
              <Route path='/post' element={<Auth><NewPost isEdit={false}/></Auth>}/>
              <Route path='/post/:id' element={<Auth><NewPost isEdit={true}/></Auth>}/>
            </Routes>
            <ToastContainer autoClose={3000}/>
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

export default App
