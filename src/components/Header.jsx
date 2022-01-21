import React from "react";
import { Link } from 'react-router-dom'
import './Header.css'

function Header(){
    return(
        <div className="nav-container">
            <h1 className="nav-title">WatchList</h1>
            <div className="nav-navlist-container">
                <Link to='/watchlist'><p className="nav-navlist-link">Your WatchList</p></Link>
                <Link to='/'><p className="nav-navlist-link">Search</p></Link>
                <Link to='/watched'><p className="nav-navlist-link">Watched</p></Link>
            </div>
        </div>
    )
}

export default Header;