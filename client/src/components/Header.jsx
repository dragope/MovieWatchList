import React from "react";
import { Link } from 'react-router-dom'
import { useMovieSearchContext } from "../context/MovieSearchContext"; 
import './Header.css'
function Header(){

    const { user } = useMovieSearchContext();

    return(
        <>
        <div className="nav-container">
            <Link style={{textDecoration: 'none'}} to="/"><h1 className="nav-title">watchlist</h1></Link>
            { user &&
            <>
                <div className="nav-navlist-container">
                    <Link style={{textDecoration: 'none'}} to='/'><p className="nav-navlist-link">search</p></Link>
                    <Link style={{textDecoration: 'none'}} to='/watchlist'><p className="nav-navlist-link">watchlist</p></Link>
                    <Link style={{textDecoration: 'none'}} to='/watched'><p className="nav-navlist-link">watched</p></Link>
                </div>
            </>
            }
        </div>
        </>
    )
}

export default Header;