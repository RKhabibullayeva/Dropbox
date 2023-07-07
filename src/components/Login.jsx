import React, {useRef, useState} from 'react'
import  '../styles/Login.css'
import { useDispatch  } from 'react-redux';
import { logInRequest } from '../reduxToolkit/extraReducer';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Api/firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';
import Round from '../styles/Round';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
	const dispatch = useDispatch();
  var navigate = useNavigate()
  const getEmailCHange = (e)=>{
    setEmail(e.target.value)
  }
  const getPasswordChange = (e)=>{
    setPassword(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('/home')
    })
    .catch((error) => {
     setError(error)
    });
  }
  return (
<>
<div className="container">
            <h1 className='title'>Login Form</h1>
            <form className='login__form' onSubmit={handleSubmit}>
                <input type='email' placeholder='Enter Email' required onChange={getEmailCHange}/>
                <input type='password' placeholder='Enter Password' required onChange={getPasswordChange}/>
                {/* <span style={{color:"red"}}>{error &&(error)}</span> */}
                <button >Login</button>
            </form>
            <p>Don’t have an account? <a href='/Register'>Register</a></p>
        </div>
</>

  )
}

export default Login