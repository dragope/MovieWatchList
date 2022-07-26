import React from 'react'
import './UserMenu.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import UserDefault from '../images/user-default.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UserMenu() {

    const { user, setUser, setMovieSearch, setWatched, setWatchList } = useMovieSearchContext();
    const navigate = useNavigate()

    const logout = async() => {
        setUser(null)
        setMovieSearch([])
        setWatched([])
        setWatchList([])
        await signOut(auth);
        navigate('/login')
    }

    console.log(auth.currentUser)

    useEffect(()=>{}, [user])

  return (
        <>
            { user &&
                <div className='usermenu-container'>
                    <label className='usermenu-user'> {!auth.currentUser.displayName ? user.email : auth.currentUser.displayName}</label>
                    <Link to='/user'><button className='usermenu-editprofile'>view/edit profile</button></Link>
                    <button className='usermenu-logout' onClick={logout}>log out</button>
                    <img className='usermenu-profilepic' alt='User profile' src={auth.currentUser.photoURL ? auth.currentUser.photoURL : UserDefault}/>
                </div>
            }
        </>
  )
}

export default UserMenu