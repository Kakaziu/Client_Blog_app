import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import store from './store'
import Author from './pages/Author'
import Auth from './components/Auth'
import NewPost from './pages/NewPost'

const App = () =>{
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register/reader' element={<Register admin={false} title='Leitor'/>}/>
            <Route path='/register/author' element={<Register admin={true} title='Autor'/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/panel' element={<Auth><Author/></Auth>}/>
            <Route path='/post' element={<Auth><NewPost isEdit={false}/></Auth>}/>
            <Route path='/post/:id' element={<Auth><NewPost isEdit={true}/></Auth>}/>
          </Routes>
          <ToastContainer autoClose={3000}/>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
