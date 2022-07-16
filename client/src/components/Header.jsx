import React from "react";
import { Link } from 'react-router-dom'
import { useMovieSearchContext } from "../context/MovieSearchContext"; 
import { getAuth, signOut } from 'firebase/auth';
import './Header.css'
function Header(){

    const { user, setUser } = useMovieSearchContext();

    const auth = getAuth()
    const logout = () => {
        setUser(null)
        signOut(auth);
    }

    return(
        <div className="nav-container">
            <Link to="/"><h1 className="nav-title">WatchList</h1></Link>
            { user &&
            <>
                <div>
                    <p>Logged in as: {!user.displayName ? user.email : user.displayName}</p>
                    <button onClick={logout}>Log Out</button>
                </div>
                <div className="nav-navlist-container">
                <Link to='/watchlist'><p className="nav-navlist-link">Your WatchList</p></Link>
                <Link to='/'><p className="nav-navlist-link">Search</p></Link>
                <Link to='/watched'><p className="nav-navlist-link">Watched</p></Link>
            </div>
            </>
            }
        </div>
    )
}

export default Header;