import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Auth = ({children}) =>{
  const {user} = useSelector(state => state)

  if(!user){
    return <Navigate to='/'></Navigate>
  }

  if(!user.is_admin){
    return <Navigate to='/'></Navigate>
  }

  return children
}

export default Auth
