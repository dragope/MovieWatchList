import React from "react";
import { Link } from 'react-router-dom'

function Header(){
    return(
        <>
            <h1>WatchList</h1>
            <Link to='/watchlist'><p>Go to WatchList</p></Link>
            <Link to='/'><p>Search</p></Link>
            <Link to='/watched'><p>Watched</p></Link>
        </>
    )
}

export default Header;