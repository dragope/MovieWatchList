import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useMovieSearchContext } from '../context/MovieSearchContext'


function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { setUser } = useMovieSearchContext();
  const navigate = useNavigate()

  async function login(e){
    e.preventDefault()
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        displayName: user.user.displayName,
        email: user.user.email,
        id: user.user.uid
      })
      navigate('/')
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
    <div className='login-container'>
              <form action="submit" className='login'>
                <input type="email" name="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" name="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={login}>Login</button>
            </form>
            <h2>If you do not have an account, please <Link to='/register'>REGISTER HERE</Link></h2>
    </div>
  )
}

export default Login