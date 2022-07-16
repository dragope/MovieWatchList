import React from 'react'
import { useState } from 'react'
import './Register.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config'


function Register() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordRepeat, setPasswordRepeat] = useState('')
    const { user } = useMovieSearchContext();

    async function signup(e){
      e.preventDefault();
      try{
        createUserWithEmailAndPassword(auth, email, password)
      }
      catch(error){
        console.error(error)
      }
    }

  return (
      <div className='login-container'>
        { user ?
          <h1>You are already signed in {user.email}</h1>
          :
          <>
            <div className='login'>
              <input type="email" name="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" name="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
              <input type="password" name="passwordrepeat" placeholder='Repeat password' onChange={(e)=> setPasswordRepeat(e.target.value)}/>
              {
                  email && password === passwordRepeat && password.length >= 6 
                  ?
                  <button onClick={signup}>Create an account</button>
                  :
                  <label>Please fill all the required fields</label>
              }
              { password !== passwordRepeat && <p>Passwords must match</p> }
            </div>
            <h2>If you already have an account, please <Link to='/login'>LOGIN HERE</Link></h2>
          </>
        }
    </div>
  )
}

export default Register