import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import store from './store'
import Author from './pages/Author'
import Auth from './components/Auth'

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
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
