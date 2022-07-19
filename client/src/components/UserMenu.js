import React from 'react'
import './UserMenu.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { getAuth, signOut } from 'firebase/auth';
import UserDefault from '../images/user-default.png'
import ActualUser from '../images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg'
import { Link } from 'react-router-dom';

function UserMenu() {

    const { user, setUser } = useMovieSearchContext()
    const auth = getAuth()
    const logout = () => {
        setUser(null)
        signOut(auth);
    }

  return (
        <>
            { user &&
                <div className='usermenu-container'>
                    <button className='usermenu-user'>{!user.displayName ? user.email : user.displayName}</button>
                    <Link to='/user'><button className='usermenu-editprofile'>view/edit profile</button></Link>
                    <button className='usermenu-logout' onClick={logout}>log out</button>
                    <img className='usermenu-profilepic' alt='User profile image' src={ActualUser}/>
                </div>
            }
        </>
  )
}

export default UserMenu