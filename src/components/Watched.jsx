import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function Watched(){

    const { watched, removeFromWatched } = useMovieSearchContext()

    return(
        <>
            <h2>Your Watched List</h2>
            {   watched[0] == undefined ?
                <h4>Your Watched List is empty</h4>
                :
                watched.map((movie)=>(
                    <div className="watchlist-movie" key={movie.id}>
                        <h3>{movie.title}</h3>
                        <h5>Release date: {movie.release_date}</h5>
                        <p>{movie.overview}</p>
                        <button onClick={()=>removeFromWatched(movie)}>Remove from Watched</button>
                    </div>
                ))
            }
        </>
    )
}

export default Watched