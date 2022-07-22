import React from 'react'
import './UserMenu.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import UserDefault from '../images/user-default.png'
import ActualUser from '../images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UserMenu() {

    const { user, setUser } = useMovieSearchContext();
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        signOut(auth);
        navigate('/login')
    }

    useEffect(()=>{}, [user])

  return (
        <>
            { user &&
                <div className='usermenu-container'>
                    <label className='usermenu-user'> {!auth.currentUser.displayName ? user.email : auth.currentUser.displayName}</label>
                    <Link to='/user'><button className='usermenu-editprofile'>view/edit profile</button></Link>
                    <button className='usermenu-logout' onClick={logout}>log out</button>
                    <img className='usermenu-profilepic' alt='User profile image' src={auth.currentUser.photoURL ? auth.currentUser.photoURL : UserDefault}/>
                </div>
            }
        </>
  )
}

export default UserMenu