import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Register from './pages/Register'

const App = () =>{
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register/reader' element={<Register admin={false} title='Leitor'/>}/>
          <Route path='/register/author' element={<Register admin={true} title='Autor'/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
