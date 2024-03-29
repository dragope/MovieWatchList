import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useMovieSearchContext } from '../context/MovieSearchContext'

console.log(process.env.REACT_APP_API_KEY)

function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('')
  const { setUser } = useMovieSearchContext();
  const navigate = useNavigate()

  function login(){
    
    signInWithEmailAndPassword(auth, email, password)
      .then(()=> navigate("/"))
      .then(()=> setUser(auth.currentUser))
      .then(()=> console.log(auth.currentUser))
      .catch((error)=> error.message === 'Firebase: Error (auth/wrong-password).' ?  setError('Wrong password') : setError('There was an error, please try again'))
  }

  return (
    <div className='login-container'>
              <div className='login'>
                <input className='login-input' type="email" name="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className='login-input' type="password" name="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='login-button' onClick={login}>Login</button>
                {
                  error &&
                    <p className='login-error-response'>{error}</p>
                }
            </div>
            <h2>If you do not have an account, please <Link className='login-register-link' to='/register'>REGISTER HERE</Link></h2>
    </div>
  )
}

export default Login