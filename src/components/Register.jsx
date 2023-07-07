import React, { useState } from 'react'
import '../styles/register.css'
import { useDispatch } from 'react-redux'
import { createUserAndProfileAsync } from '../reduxToolkit/extraReducer'
const Register = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] =  useState('')
  const [userName, setUserName] = useState('')
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(createUserAndProfileAsync({ email, password, userName }));
  }
  return (
    <div className='register__container'>
       <div className='d-flex'>
         <h2 className='register__title'>Registration form</h2>
        <span>Have an account <a href='/'>Login</a></span>
        </div>
        <form className='register__form' onSubmit={handleSubmit}>
                
            <div className="register__block">
            <div className=''>
            <label >First Name</label>
                <input  type="text" required onChange={(e)=>setUserName(e.target.value)}/>
                <label >Email</label>
                <input  type="email" required onChange={(e)=>setEmail(e.target.value)}/>
                <label >Password</label>
                <input type="password" required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </div>
        <button className='register-btn'>Register</button>
        </form>
    </div>
  )
}

export default Register