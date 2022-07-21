import React from 'react'
import './UserProfile.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function UserProfile() {

    const { user } = useMovieSearchContext()

  return (
    <div className='user-form'>
        <h1 className='user-form-title'>update your profile</h1>
        <div className='user-form-container'>
            <div className='user-profile-form-container'>
                <div className='user-profile-form-container-field'>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder={user.username ? user.username : 'set your username'} />
                </div>
                <div className='user-profile-form-container-field'>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" placeholder={user.email ? user.email : 'email'} />
                </div>
                <div className='user-profile-form-container-field'>
                    <label htmlFor="profilepic">profile picture</label>
                    <input type="file" id="img" name="img" accept="image/.jpg.gif"/>
                </div>
                <button className='user-profile-form-password-submit'>update profile</button>
            </div>
            <div className='user-password-form-container'>
                <div className='user-password-form-container-field'>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder='password' />
                </div>
                <div className='user-password-form-container-field'>
                    <label htmlFor="confirm-password">confirm password</label>
                    <input type="password" name="confirm-password" placeholder='confirm password' />
                </div>
                <button className='user-form-password-submit'>update password</button>
            </div>
        </div>
    </div>
  )
}

export default UserProfile