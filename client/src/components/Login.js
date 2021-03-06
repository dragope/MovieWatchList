import React, { useState } from 'react'
import './Login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useMovieSearchContext } from '../context/MovieSearchContext'


function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { setUser } = useMovieSearchContext();
  const navigate = useNavigate()

  function login(){
    
    signInWithEmailAndPassword(auth, email, password)
      .then(()=> navigate("/"))
      .then(()=> setUser(auth.currentUser))
      .then(()=> console.log(auth.currentUser))
      .catch((error)=> console.error(error))
  }

  return (
    <div className='login-container'>
              <div className='login'>
                <input type="email" name="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" name="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={login}>Login</button>
            </div>
            <h2>If you do not have an account, please <Link className='login-register-link' to='/register'>REGISTER HERE</Link></h2>
    </div>
  )
}

export default Login